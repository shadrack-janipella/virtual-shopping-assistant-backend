const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
});

router.post("/add", roleMiddleware("admin"), async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product", details: err.message });
  }
});

router.put("/update/:id", roleMiddleware("admin"), async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
});

router.delete("/delete/:id", roleMiddleware("admin"), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product", details: err.message });
  }
});

module.exports = router;
