const pool = require("./db");

async function createTable() {
    try {
      // Connexion à la base de données
      console.log("Connected to the PostgreSQL database");
  
      // Création de la table utilisateurs
      const createTableutilisateursQuery = `
        CREATE TABLE IF NOT EXISTS utilisateurs (
          idUtilisateur SERIAL PRIMARY KEY,
          nom VARCHAR(50) NOT NULL,
          prenom VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL,
          motDePasse VARCHAR(50) NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'customer'
        )
      `;
  
      await pool.query(createTableutilisateursQuery);
      console.log('Table "utilisateurs" created successfully');
  
      // Création de la table boutiques
      const createTableboutiquesQuery = `
        CREATE TABLE IF NOT EXISTS boutiques (
          idBoutique SERIAL PRIMARY KEY,
          titre VARCHAR(100) NOT NULL,
          datePublication VARCHAR(100),
          categorie VARCHAR(50) NOT NULL,
          admin INT,
          Nombre_Etoile INT DEFAULT 0, 
          imageMagazine VARCHAR(100) DEFAULT 'image.png',
          localisation VARCHAR(100) DEFAULT NULL,
          imageCouverture VARCHAR(100) DEFAULT 'image.png',
          FOREIGN KEY (admin) REFERENCES utilisateurs(idUtilisateur)
        )
      `;
  
      await pool.query(createTableboutiquesQuery);
      console.log('Table "Boutiques" created successfully');
    } catch (err) {
      console.error('Error creating tables:', err);
    }
  }
  module.exports = createTable;