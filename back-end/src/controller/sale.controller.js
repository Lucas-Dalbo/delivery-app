const saleService = require('../services/sale.service');
const jwt = require('../auth/JWT');

const create = async (req, res) => {
  const {
    name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
  } = req.body;

  const token = req.headers.authorization;

  jwt.validate(token);

  const newOrderId = await saleService.create(
    { name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
  );

  return res.status(201).json({ newOrderId });
};

module.exports = { create };
