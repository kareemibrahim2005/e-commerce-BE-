const express = require("express");
const router = express.Router();
const controller = require("../controller/productsControllers");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

router.get("/products", controller.getProducts);

/**
 * @swagger
 * /product/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               category_id:
 *                 type: integer
 *                 description: ID of the category the product belongs to
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created product
 *                 name:
 *                   type: string
 *                   description: Name of the created product
 *                 price:
 *                   type: number
 *                   description: Price of the created product
 *                 category_id:
 *                   type: integer
 *                   description: Category ID of the added product
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: server error
 */
router.post("/add", controller.addProduct);

/**
 * @swagger
 * /product/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category_id:
 *                     type: integer
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Server error
 */
router.get("/category/:category_id", controller.getProductsByCategory);

/**
 * @swagger
 * product/update/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *               category_id:
 *                 type: integer
 *                 description: The ID of the category the product belongs to
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the updated product
 *                 name:
 *                   type: string
 *                   description: Name of the updated product
 *                 price:
 *                   type: number
 *                   description: Price of the updated product
 *                 category_id:
 *                   type: integer
 *                   description: Category ID of the updated product
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: server error
 */
router.put("/update/:id", controller.updateProduct);

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description:  the product was deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description:  Server error
 */
router.delete("delete/:id", controller.deleteProduct);

module.exports = router;
