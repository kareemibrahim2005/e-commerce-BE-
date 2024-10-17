const express = require("express");
const controller = require("../controller/adminController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for managing Admin
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a Admin user
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Admin already exists
 *       500:
 *         description: Server error
 */
router.post("/signup", controller.signUpAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login a admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid email and password
 *       500:
 *         description: Server error
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /admin/admins:
 *   get:
 *     summary: Get a list of all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: The list of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The admin ID
 *                   username:
 *                     type: string
 *                     description: The username of the admin
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *       500:
 *         description: server error
 */
router.get("/admins", controller.getAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get a Admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Admin to retrieve
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The Admin ID
 *                 username:
 *                   type: string
 *                   description: The username of the Admin
 *                 email:
 *                   type: string
 *                   description: The admin's email address
 *       404:
 *         description: Admin not found
 *       500:
 *         description: server error
 */
router.get("/admin/:id", controller.getAdminById);

/**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     summary: Delete a Admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Admin to delete
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: user was deleted
 *       404:
 *         description: Admin not found
 *       500:
 *         description: server error
 */
router.delete("/delete/:id", controller.deleteAdmin);

module.exports = router;
