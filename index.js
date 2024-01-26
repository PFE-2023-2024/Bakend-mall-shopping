const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./src/db");
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const createTable = require('./src/BD_Table');
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  res.status(200).json({ message: "Welcome To Server mall-shopping" });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = './uploads/'+req.body.path || './uploads'; // Le chemin est soit fourni dans la requête, sinon utiliser un dossier par défaut
   
    // Vérifier si le répertoire existe, sinon le créer
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
app.use(express.json());
const upload = multer({ storage: storage }).array('files',2);
 app.use(express.static('./')); 
app.post('/insert/boutiques', (req, res) => {
 
  upload(req, res, async (err) => {
   
    if (err) {
      
      return res.status(500).json({ success: false, error: err.message });
      
    }
    console.log(req.body.path);
    try {
      const result = await pool.query(
        'INSERT INTO boutiques (titre, datePublication, categorie, admin, Nombre_Etoile, imageMagazine, localisation, imageCouverture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [req.body.titre, req.body.datePublication, req.body.categorie, req.body.admin, 0 , req.files[0].path, "", req.files[1].path]
      );
      
      const nouvelleBoutique = result.rows[0];
      res.json({ success: true, boutique: nouvelleBoutique });
      console.log(nouvelleBoutique);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la boutique :', error);
      res.status(500).json({ success: false, error: 'Erreur serveur' });
    }
  });
});



app.get('/boutiques/:id', async (req, res) => {
  const id = req.params.id; // Récupérer l'ID envoyé via les paramètres de l'URL
  try {
    const result = await pool.query('SELECT boutiques.*, utilisateurs.nom AS nom_admin FROM boutiques INNER JOIN utilisateurs ON boutiques.admin = utilisateurs.idUtilisateur WHERE admin = $1', [parseInt(id)]);
  
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(4000, () => console.log("Server on localhost:4000"));
