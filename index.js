const app = require('./src/app');
const createTable=require('./src/BD_Table');
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is ready for connections on port ${PORT}`);
});
