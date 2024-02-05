const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../../db')

const UserController = {};


// const { validatePostUser, validateGetUser, validateDeleteUser, validatePutUser } = require('../validators/users')

UserController.create = async (req, res) => {
    const { firstName, lastName, email, password, googleId, facebookId } = req.body;
    if (password && googleId || password && facebookId || googleId && facebookId) {
        return res.status(400).json({ success: false, error: 'You cannot have a password and a googleId or a facebookId at the same time' });
    }
    let hashedPassword = null;
    if (password) { hashedPassword = await bcrypt.hash(password, 10); }
    try {
        const results = await pool.query('INSERT INTO users (firstName, lastName, email, password, googleId, facebookId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, lastName, email, hashedPassword, googleId || null, facebookId || null]);
        res.status(201).json(results.rows);
    } catch(error) {
        console.log('error in userController.create while trying to insert user into the database', error.message);
        res.status(400).json({ success: false, error: error.message });
    }
}

UserController.get = async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await pool.query('SELECT * FROM users WHERE email = $1', [ email ]);
        if (results.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, results.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }
        const { userId, firstName, lastName, email, image } = results.rows[0];
        const payload = {
            user: { userId, firstName, lastName, email, image }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(200).json({ success: true, token: `Bearer ${token}` });
    } catch(error) {
        console.log('error in userController.get while trying to get user from the database', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })
//     if (!user) { return res.status(400).json({ errors: 'Invalid email or password' }) }
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) { return res.status(400).json({ errors: 'Invalid email or password' }) }
//     res.json({ success: 'You have successfully logged in' })
// })

// router.post('/', validatePostUser, async (req, res) => {
//     const { firstName, lastName, email, password, phoneNumber, googleId, facebookId } = req.body

//     const user = await User.findOne({ email })
//     if (user) { // if user exists, redirect to login page
//         return res.status(400).json({ erroes: 'You already have an account' })
//     }

//     // if the googleId or the facebookId is already present in the database, probably this is due to the user changing his email address associated with his google or facebook account
//     if (googleId) { // if user does not exist, but his google id is present in the database
//         const user = await User.findOne({ googleId })
//         if (user) { return res.status(400).json({ error: 'this googleId is already present in the database' }) }
//     }
//     if (facebookId) { // if user does not exist, but his facebook id is present
//         const user = await User.findOne({ facebookId })
//         if (user) { return res.status(400).json( {errors: 'this facebookId is already present in the database' }) }
//     }

//     const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         role: 'user',
//         googleId, // if googleId is undefined, it will not be added to the newUser object
//         facebookId, // if facebookId is undefined, it will not be added to the newUser object
//     })

//     if (password) {
//         const saltRounds = Number(process.env.SALT_ROUNDS)
//         const hashedPassword = await bcrypt.hash(password, saltRounds)
//         newUser.password = hashedPassword
//     }
//     await newUser.save()
//     res.json({ success: 'You have successfully registered' })
// })

// // this should be changed because get requests should not have a request body
// router.get('/', validateGetUser, async (req, res) => {
//     const { id, email } = req.body
//     if (id) {
//         return res.json(await User.findById(id))
//     }
//     res.json(await User.findOne({ email }))
// })

// router.put('/', validatePutUser, async (req, res) => {
//     const { id, firstName, lastName, password, phoneNumber } = req.body
//     const user = await User.findById(id)
//     if (!user) { return res.status(404).json({ errors: 'User not found' }) }
//     // only update the fields that were passed into the request body
//     if (firstName) { user.firstName = firstName }
//     if (lastName) { user.lastName = lastName }
//     if (phoneNumber) { user.phoneNumber = phoneNumber }
//     if (password) {
//         const saltRounds = Number(process.env.SALT_ROUNDS)
//         const hashedPassword = await bcrypt.hash(password, saltRounds)
//         user.password = hashedPassword
//     }
//     await user.save()
//     res.json({ success: 'User updated' })
// })

// router.delete('/', validateDeleteUser, async (req, res) => {
//     const { id } = req.body
//     const user = await User.findByIdAndDelete(id)
//     if (!user) { return res.status(404).json( {errors: 'User not found' }) }
//     res.json( {success: 'User deleted' })
// })

module.exports = UserController