const pool = require('../db');
const CategorieController = {};

CategorieController.search = async (req, res) => {
  try {
  
   
    const result = await pool.query('SELECT name FROM category ');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
CategorieController.search_categorie_produit = async (req, res) => {
  const txt = req.params.txt;
  try {
    const result = await pool.query('SELECT name_categorie as categorie FROM categorie_produit WHERE name_categorie_pere LIKE $1', ['%' + txt + '%']);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = CategorieController;
