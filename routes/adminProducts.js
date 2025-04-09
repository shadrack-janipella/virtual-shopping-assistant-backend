const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.post('/', async (req, res) => {  
  try {
    const { name, description, price, image } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {  
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {  
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
