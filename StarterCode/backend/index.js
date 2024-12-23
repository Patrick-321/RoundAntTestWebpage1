const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

// Function to generate a URL for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// Assign random image URLs to products
products = products.map(product => ({
    ...product,
    imageUrl: fetchImageUrl()
}));

// GET /api/products - Fetch all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// DELETE /api/products/:id - Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.status(200).send({ message: 'Product deleted successfully' });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
