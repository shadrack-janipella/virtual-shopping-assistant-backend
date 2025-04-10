const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: 'Name, price, and image are required.' });
    }

    const newProduct = new Product({ name, price, image });
    await newProduct.save();

    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const updatedData = { name, price, image };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
