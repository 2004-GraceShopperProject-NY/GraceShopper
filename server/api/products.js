const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productID', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productID);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
