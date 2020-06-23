const router = require('express').Router();
const {User, Product} = require('../db/models');

// checks if admin
function adminOnly(req, res, next) {
  console.log(req.user);
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send('Admin access only');
  }
}

// Admins can see all users
router.get('/', adminOnly, async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', adminOnly, async (req, res, next) => {
  try {
    const {quantity} = req.body;
    const [numOfAffectedRows, affectedRows] = await Product.update(req.body, {
      where: {
        id: req.params.productId
      },
      returning: true,
      plain: true
    });
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.json(affectedRows);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', adminOnly, async (req, res, next) => {
  try {
    const product = req.body;
    const createProduct = await Product.create(product);
    res.json(createProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', adminOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    });
    res.json(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
