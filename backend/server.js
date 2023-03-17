import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import products from "./data/products.js";
import connectDB from "./config/db.js";


dotenv.config();

// Start DataBase Connection //
connectDB();

// Start Express Application //
const app = express();


app.get('/', (req, res) => {
    res.send('API');
});
app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`));