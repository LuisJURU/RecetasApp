require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Configurar CORS
app.use(cors({
  origin: '*', // Permitir todas las solicitudes de cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});