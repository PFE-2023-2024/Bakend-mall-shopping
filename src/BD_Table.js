const pool = require("./db");

async function createTable() {
    try {
      // Connexion à la base de données
      console.log("Connected to the PostgreSQL database");

      // Création de la table utilisateurs
      const createTableutilisateursQuery = `
        CREATE TABLE IF NOT EXISTS users (
          userId SERIAL PRIMARY KEY,
          firstName VARCHAR(50) NOT NULL,
          lastName VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL,
          password VARCHAR(100),
          role VARCHAR(50) NOT NULL DEFAULT 'customer',
          image VARCHAR(100) DEFAULT NULL,
          googleId VARCHAR(100) DEFAULT NULL,
          facebookId VARCHAR(100) DEFAULT NULL,
          CONSTRAINT email_unique UNIQUE (email),
          CONSTRAINT unique_googleId UNIQUE (googleId),
          CONSTRAINT unique_facebookId UNIQUE (facebookId)
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
      console.log('Table "boutiques" created successfully');
      
      const createTablecategoryQuery = `
      CREATE TABLE IF NOT EXISTS category (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
    `;
      await pool.query(createTablecategoryQuery);
      console.log('Table "category" created successfully');

       const defaultCategories = [
         'Alimentation', 'Vetements et Mode', 'Electronique et Informatiques', 'meubles', 'Parfumerie', 'Librairie',
         'Sport et Loisirs', 'Automobile', 'Animaux et compagnie', 'Autre'
       ];
      
       for (const categoryName of defaultCategories) {
         const insertCategoryQuery = `
         INSERT INTO category (name) VALUES ($1)
         `;
         await pool.query(insertCategoryQuery, [categoryName]);
       }
      
      const createTableCategorieProduitQuery = `
  CREATE TABLE IF NOT EXISTS categorie_produit (
    idCategorieProduit SERIAL PRIMARY KEY,
    name_categorie VARCHAR(250),
    name_categorie_pere VARCHAR(250)
   
  )
`;
await pool.query(createTableCategorieProduitQuery);
console.log('Table "categorie_produit" created successfully');


// const defaultCategories = [
//   { name: 'Fruits et legumes', parent: 'Alimentation' },
//   { name: 'Produit slaitiers', parent: 'Alimentation' },
//   { name: 'Boulangerie', parent: 'Alimentation' },
//   { name: 'Viandes et poissons', parent: 'Alimentation' },
//   { name: 'Produits surgelés', parent: 'Alimentation' },
//   { name: 'Épicerie sèche', parent: 'Alimentation' },


//   { name: 'Femmes', parent: 'Vetements et Mode' },
//   { name: 'Hommes', parent: 'Vetements et Mode' },
//   { name: 'Enfants', parent: 'Vetements et Mode' },
//   { name: 'Chaussures', parent: 'Vetements et Mode' },
//   { name: 'Accessoires', parent: 'Vetements et Mode' },
//   { name: 'Sport', parent: 'Vetements et Mode' },
//   { name: 'Maternite', parent: 'Vetements et Mode' },
//   { name: 'Grandes tailles', parent: 'Vetements et Mode' },
//   { name: 'Mariage', parent: 'Vetements et Mode' },
//   { name: 'Ethique', parent: 'Vetements et Mode' },
//   { name: 'Soiree', parent: 'Vetements et Mode' },
//   { name: ' Sport et fitness', parent: 'Vetements et Mode' },
//   { name: 'Decontracte ', parent: 'Vetements et Mode' },
//   { name: ' Protection solaire', parent: 'Vetements et Mode' },

//   { name: 'Ordinateurs', parent: 'Electronique et Informatiques' },
//   { name: 'Composants informatiques', parent: 'Electronique et Informatiques' },
//   { name: 'Peripheriques', parent: 'Electronique et Informatiques' },
//   { name: 'Accessoires', parent: 'Electronique et Informatiques' },
//   { name: 'Logiciels', parent: 'Electronique et Informatiques' },
//   { name: 'Reseaux et connectivite', parent: 'Electronique et Informatiques' },
//   { name: 'Stockage', parent: 'Electronique et Informatiques' },
//   { name: 'Equipement de gaming', parent: 'Electronique et Informatiques' },
//   { name: 'Produits électroniques grand public', parent: 'Electronique et Informatiques' },
//   { name: 'Formation et conseils', parent: 'Electronique et Informatiques' },
//   { name: 'Equipement audio et video', parent: 'Electronique et Informatiques' },
//   { name: 'Services de reparation et maintenance', parent: 'Electronique et Informatiques' },
//   { name: 'Sécurité informatique', parent: 'Electronique et Informatiques' },  
 
//   { name: 'Chambres', parent: 'Magasin de meubles' },
//   { name: 'Salons', parent: 'Magasin de meubles' },
//   { name: 'Salle à manger', parent: 'Magasin de meubles' },
//   { name: 'Bureau', parent: 'Magasin de meubles' },
//   { name: 'Enfants', parent: 'Magasin de meubles' },
//   { name: 'Extérieur', parent: 'Magasin de meubles' },
//   { name: 'Rangement', parent: 'Magasin de meubles' },
//   { name: 'Décoration', parent: 'Magasin de meubles' },
//   { name: 'Literie', parent: 'Magasin de meubles' },
//   { name: 'Modulaire', parent: 'Magasin de meubles' },
//   { name: 'Restreint', parent: 'Magasin de meubles' },
//   { name: 'Jardin', parent: 'Magasin de meubles' },
//   { name: 'Salle de bains', parent: 'Magasin de meubles' },
//   { name: 'Personnalisé', parent: 'Magasin de meubles' },
//   { name: 'Occasion', parent: 'Magasin de meubles' },

//   { name: 'Parfums femmes', parent: 'Parfumerie' },
//   { name: 'Parfums hommes', parent: 'Parfumerie' },
//   { name: 'Soins de la peau', parent: 'Parfumerie' },
//   { name: 'Maquillage', parent: 'Parfumerie' },
//   { name: 'Soins capillaires', parent: 'Parfumerie' },
//   { name: 'Bain et douche', parent: 'Parfumerie' },
//   { name: 'Rasage et après-rasage', parent: 'Parfumerie' },
//   { name: 'Coffrets cadeaux', parent: 'Parfumerie' },
//   { name: 'Accessoires beauté', parent: 'Parfumerie' },
//   { name: 'Bien-être', parent: 'Parfumerie' },
//   { name: 'Parfums enfants', parent: 'Parfumerie' },
//   { name: 'Unisexes', parent: 'Parfumerie' },
//   { name: 'Soins spécifiques', parent: 'Parfumerie' },
//   { name: 'Créateurs', parent: 'Parfumerie' },
//   { name: 'Naturels/biologiques', parent: 'Parfumerie' },

//   { name: 'Romans', parent: 'Librairie' },
//   { name: 'Jeunesse', parent: 'Librairie' },
//   { name: 'Non-fiction', parent: 'Librairie' },
//   { name: 'Bandes dessinées', parent: 'Librairie' },
//   { name: 'Sciences', parent: 'Librairie' },
//   { name: 'Histoire', parent: 'Librairie' },
//   { name: 'Outils scolaires (carnets, cahiers, stylos, matériel de dessin)', parent: 'Librairie' },

//   { name: 'Vêtements de sport', parent: 'Sport et Loisirs' },
//   { name: 'Chaussures de sport', parent: 'Sport et Loisirs' },
//   { name: 'Équipement de fitness', parent: 'Sport et Loisirs' },
//   { name: 'Équipement de plein air', parent: 'Sport et Loisirs' },
//   { name: 'Accessoires sportifs', parent: 'Sport et Loisirs' },
//   { name: 'Équipement pour sports spécifiques (par exemple, raquettes, clubs de golf)', parent: 'Sport et Loisirs' },
//   { name: 'Chaussures de course', parent: 'Sport et Loisirs' },
//   { name: 'Vêtements de compression et accessoires de récupération', parent: 'Sport et Loisirs' },
//   { name: 'Montres et trackers d activité ', parent: 'Sport et Loisirs' },
//   { name: 'Équipement de protection (casques, genouillères, etc.)', parent: 'Sport et Loisirs' },
//   { name: 'Sacs de sport et sacs à dos', parent: 'Sport et Loisirs' },
//   { name: 'Nutrition sportive', parent: 'Sport et Loisirs' },
//   { name: 'Articles de camping', parent: 'Sport et Loisirs' },
//   { name: 'Équipement pour sports nautiques', parent: 'Sport et Loisirs' },
//   { name: 'Vélos et accessoires', parent: 'Sport et Loisirs' },
//   { name: 'Équipement de yoga et de pilates', parent: 'Sport et Loisirs' },
//   { name: 'Equipement de basketball, football, tennis, etc.', parent: 'Sport et Loisirs' },
//   { name: 'Equipement de ski et snowboard', parent: 'Sport et Loisirs' },
//   { name: 'Vêtements de sport écologiques ou durables', parent: 'Sport et Loisirs' },
//   { name: 'Accessoires de récupération (rouleaux de massage, balles de récupération, etc.)', parent: 'Sport et Loisirs' },

//   { name: 'Véhicules neufs', parent: 'Automobile' },
//   { name: 'Véhicules d\'occasion', parent: 'Automobile' },
//   { name: 'Pièces détachées', parent: 'Automobile' },
//   { name: 'Accessoires automobiles', parent: 'Automobile' },
//   { name: 'Équipement pour l\'entretien automobile', parent: 'Automobile' },
//   { name: 'Produits de nettoyage et d\'entretien', parent: 'Automobile' },
//   { name: 'Lubrifiants et liquides', parent: 'Automobile' },
//   { name: 'Pneumatiques', parent: 'Automobile' },
//   { name: 'Électronique automobile (autoradios, GPS, etc.)', parent: 'Automobile' },
//   { name: 'Accessoires pour la sécurité routière (sièges auto, triangles de signalisation, etc.)', parent: 'Automobile' },
//   { name: 'Outillage automobile', parent: 'Automobile' },
//   { name: 'Produits de personnalisation et tuning', parent: 'Automobile' },
//   { name: 'Équipement de remorquage', parent: 'Automobile' },
//   { name: 'Produits pour l\'intérieur du véhicule (tapis, housses, etc.)', parent: 'Automobile' },
//   { name: 'Produits pour l\'extérieur du véhicule (housse de voiture, bâches, etc.)', parent: 'Automobile' },

//   { name: 'Toilettage pour animaux', parent: 'Animaux de compagnie' },
//   { name: 'Aliments pour animaux', parent: 'Animaux de compagnie' },
//   { name: 'Animalerie', parent: 'Animaux de compagnie' }




// ];

// for (const category of defaultCategories) {
//   const insertCategoryQuery = `
//     INSERT INTO categorie_produit (name_categorie, name_categorie_pere)
//     VALUES ($1, $2)
//   `;
//   await pool.query(insertCategoryQuery, [category.name, category.parent]);
// }

      const createTableproduitQuery = `
      CREATE TABLE IF NOT EXISTS produit (
        idProduit SERIAL PRIMARY KEY,
        nom VARCHAR(100),
        description TEXT,
        prix DECIMAL(10,2),
        quantiteEnStock INT,
        idBoutique INT,
        categorie VARCHAR(100),
        nombreEtoile INT DEFAULT 0,
        deliveryCost DECIMAL(10,2),
        variants TEXT,
        FOREIGN KEY (idBoutique) REFERENCES boutiques(idBoutique)
    )
    `;
      await pool.query(createTableproduitQuery);
      console.log('Table "produit" created successfully');
      const createTableMediaQuery = `
      CREATE TABLE  IF NOT EXISTS Media (
        idMedia SERIAL PRIMARY KEY,
        idProduit INT,
        Media_number INT,
        cheminAcces VARCHAR(255),
        FOREIGN KEY (idProduit) REFERENCES produit(idProduit)
    )
    `;
      await pool.query(createTableMediaQuery);






      console.log('Table "Media" created successfully');
    } catch (err) {
      console.error('Error creating tables :', err);
    }
  }
  module.exports = createTable;