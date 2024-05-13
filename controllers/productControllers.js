const { v4: uuidv4 } = require("uuid");

const Product = [];

const getAllProducts = (req, res) => {
  res.json(Product);
};

const getProductById = (req, res) => {
  const product = Product.find((p) => p.id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const createProduct = (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body,
  };

  Product.push(newProduct);

  res.json(newProduct);
};

const updateProduct = (req, res) => {
  const product = Product.find((p) => p.id === req.params.id);

  if (product) {
    const { name, description, price } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    res.json({ message: "Product updated", product });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const deleteProduct = (req, res) => {
  const index = Product.findIndex((p) => p.id === req.params.id);

  if (index !== -1) {
    Product.splice(index, 1);

    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
