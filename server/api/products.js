const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    // console.log('hello');
    const products = await Product.findAll();
    // console.log(products);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// FIND BY ID
// router.get('/:productID', async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.productID)
//       if (!product) {
//         res.sendStatus(404)
//       } else {
//         res.json(product)
//       }
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/:name', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        name: req.params.name
      }
    });
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
