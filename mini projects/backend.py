// server.js - Complete backend in a single file

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect('mongodb://localhost:27017/service_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ===== Models =====

// Service Model
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model('Service', serviceSchema);

// User Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ===== Routes =====

// SERVICE ROUTES

// Get all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single service
app.get('/api/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search services
app.get('/api/search', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const services = await Service.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new service (admin functionality)
app.post('/api/services', async (req, res) => {
    const { title, description, price, imageUrl, category, featured } = req.body;
    
    try {
        const newService = new Service({
            title,
            description,
            price,
            imageUrl,
            category,
            featured: featured || false
        });
        
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a service (admin functionality)
app.put('/api/services/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a service (admin functionality)
app.delete('/api/services/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// USER ROUTES

// User registration
app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // In a real app, you would hash the password here
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser = new User({
            name,
            email,
            password // In production, use hashed password
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User login
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // In a real app, you would compare hashed passwords
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // In production, generate and return a JWT token here
        res.json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user profile
app.get('/api/users/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CONTACT ROUTES

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide name, email and message' });
    }
    
    // In a real app, you would:
    // 1. Store this in a database
    // 2. Send an email notification
    // 3. Maybe set up a webhook to a CRM
    
    console.log('Contact form submission:', { name, email, message });
    
    // For now we'll just respond with success
    res.json({ message: 'Message received successfully' });
});

// FEATURED CONTENT ROUTES

// Get featured services
app.get('/api/featured', async (req, res) => {
    try {
        const featuredServices = await Service.find({ featured: true }).limit(6);
        res.json(featuredServices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API route to get services by category
app.get('/api/category/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params;
        const services = await Service.find({ category: categoryName });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Catch-all route to serve the main HTML file (for SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});