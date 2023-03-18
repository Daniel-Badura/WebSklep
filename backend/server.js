import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound, } from './middleware/errorMiddleware.js';


const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API');
    });
}

dotenv.config();

// @desc Start DataBase Connection //
connectDB();

// @desc Start Express Application //






app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow));
