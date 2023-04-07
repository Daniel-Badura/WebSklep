import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from 'path';
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound, } from './middleware/errorMiddleware.js';

const app = express();

// Use json
app.use(express.json());
// @desc initialize .env
dotenv.config();

// @desc Start DataBase Connection //
connectDB();

// @desc Start Express Application //
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API Server');
    });
}





app.use(notFound);
app.use(errorHandler);

let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow));
