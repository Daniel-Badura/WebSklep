import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';


dotenv.config();

// @desc Start DataBase Connection //
connectDB();

// @desc Start Express Application //
const app = express();


app.get('/', (req, res) => {
    res.send('API');
});

app.use('/api/products', productRoutes);


let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow));
