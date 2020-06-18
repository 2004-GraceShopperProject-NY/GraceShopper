const router = require('express').Router();
const {Order} = require('../db/models');

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.addOrCreateOrder(req.user.id);
      if (order) {
        order.addItemToOrder(req.body.id, order.id);
      }
      res.json(order);

    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
