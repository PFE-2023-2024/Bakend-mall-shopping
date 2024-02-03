const upload = require('../middleware/photos');
const pool=require('../db');
const BoutiqueController = {};

BoutiqueController.create= (req, res) => {
 
    upload.upload2image(req, res, async (err) => {
     
      if (err) {
        
        return res.status(404).json({ success: false, error: err.message });
        
      }
    
      try {
        const imagePath = req.files[0] ? req.files[0].path : 'image.png';
        const coverImagePath = req.files[1] ? req.files[1].path : 'image2.png';
  
        const result = await pool.query(
          'INSERT INTO boutiques (titre, datePublication, categorie, admin, Nombre_Etoile, imageMagazine, localisation, imageCouverture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [req.body.titre, req.body.datePublication, req.body.categorie, req.body.admin, 0 , imagePath, "", coverImagePath]
        );
        
        const nouvelleBoutique = result.rows[0];
        res.json({ success: true, boutique: nouvelleBoutique });
        console.log(nouvelleBoutique);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la boutique :', error);
        res.status(500).json({ success: false, error: 'Erreur serveur' });
      }
    });
  }

  BoutiqueController.get=async (req, res) => {
    const id = req.params.id; // Récupérer l'ID envoyé via les paramètres de l'URL
    try {
      const result = await pool.query('SELECT boutiques.*, utilisateurs.nom AS nom_admin ,utilisateurs.prenom AS prenom_admin  FROM boutiques INNER JOIN utilisateurs ON boutiques.admin = utilisateurs.idUtilisateur WHERE admin = $1', [parseInt(id)]);
    
      res.json(result.rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
  module.exports = BoutiqueController;