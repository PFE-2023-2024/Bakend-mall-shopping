const upload = require('../middleware/photos');
const pool=require('../db');
const ProduitController = {};

ProduitController.create= async (req, res) => {
  
    upload.uploadMultipleImages(req, res, async (err) => {
        let id = null; // Utilisez let au lieu de const pour permettre la réaffectation

        try {
          const repanse0 = await pool.query(`
            INSERT INTO produit (nom, description, prix, quantiteEnStock, idBoutique, categorie, deliveryCost, variants)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING idProduit`,
            [req.body.nom, req.body.description, req.body.prix, req.body.quantiteEnStock, parseInt(req.body.idBoutique), req.body.categorie, req.body.deliveryCost, req.body.variants]
          );
          id=parseInt(repanse0.rows[0].idproduit);
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la boutique :', error);
          res.status(500).json({ success: false, error: 'Erreur serveur' });}

    if (req.files && req.files.length > 0) {
     
      req.files.forEach(async (file, index) => {
            try {
                
                const reponse = await pool.query(`INSERT INTO Media (idProduit, Media_number, cheminAcces) VALUES ($1, $2, $3)`,[parseInt(id),index,file.path]);
        
       
            } catch (error) {
              console.error('Erreur lors de l\'ajout de la boutique :', error);
              res.status(500).json({ success: false, error: 'Erreur serveur' });
                
            }
      });
      res.send('Enregistrement réussi.');
    } else {
      res.status(400).send('Aucune image téléchargée ou erreur lors du téléchargement.');
    }});
  }


  ProduitController.get=async (req, res) => {
    const id = req.params.id; // Récupérer l'ID envoyé via les paramètres de l'URL
    try {
      const result = await pool.query(` SELECT 
      p.idProduit, p.nom AS nom_produit, p.description, p.prix, p.quantiteEnStock, p.categorie, p.nombreEtoile, p.deliveryCost, p.variants,
      JSON_AGG(m.cheminAcces) AS images
  FROM 
      produit p
  LEFT JOIN 
      Media m ON p.idProduit = m.idProduit
  WHERE
      p.idBoutique = $1
  GROUP BY
      p.idProduit;`, [parseInt(id)]);
    
      res.json(result.rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }





  module.exports = ProduitController;