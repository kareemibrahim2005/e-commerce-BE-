require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const { swaggerDocs, swaggerUi } = require("./swagger");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");

app.use(express.json());
app.use("/user", userRoutes);
app.use("/user/cart", cartRoutes);
app.use("/product", productRoutes);
app.use("/category", categoriesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Sup shawty");
});

app.listen(port, () => {
  console.log(`Shawty running on port ${port}`);
});
