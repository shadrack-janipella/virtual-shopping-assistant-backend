const express = require('express');
const Product = require('../models/Product');  // Adjust the path to your Product model
const router = express.Router();

// POST route to add a product
router.post('/', async (req, res) => {
  const { name, price, image } = req.body;

  // Validation for missing fields
  if (!name || !price || !image) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create a new product
    const newProduct = new Product({ name, price, image });
    await newProduct.save();  // Save the new product to the database

    // Respond with success
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product.' });
  }
});

// GET route to fetch all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch products from the database
    res.json(products);  // Send products as JSON response
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// DELETE route to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Respond with success
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

module.exports = router;
