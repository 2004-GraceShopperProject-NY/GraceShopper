const router = require('express').Router();
const {Order} = require('../db/models');

router.post('/', async (req, res, next) => {
  try {
    console.log('user');
    res.send('hello world!');
    // if (req.user) {
    //   const order = await Order.addOrCreateOrder(req.user.id)
    //   console.log('order', order)

    //   res.json(order)
    // } else {
    //   res.sendStatus(404)
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
