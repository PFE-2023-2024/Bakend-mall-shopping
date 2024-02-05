const express = require('express');
const router = express.Router();
const BoutiqueController = require('../Model/Boutiqes');
const CategorieController =require('../Model/Category');
const ProduitController =require('../Model/Produit');
const userController = require('../Model/User/User');


router.post('/insert/boutiques', BoutiqueController.create);
router.post('/insert/produit',ProduitController.create);
router.post('/users/create', userController.create);
router.get('/users', userController.get);

router.get('/boutiques/:id',BoutiqueController.get);
router.get('/Categorie/boutiques/',CategorieController.search);
router.get('/categorie_produit/boutiques/:txt',CategorieController.search_categorie_produit);
router.get('/produit/boutiques/:id',ProduitController.get)
module.exports = router;