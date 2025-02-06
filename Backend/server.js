require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb+srv://luismariojaraba:oN5aIepQcaY13d7G@cluster0.ovhmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a MongoDB");
}).catch((error) => {
  console.error("Error al conectar a MongoDB:", error.message);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos

app.use('/api/recipes', recipeRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);

// Endpoint de login
const User = require('./models/User'); // Asegúrate de importar el modelo de usuario

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el usuario existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    // Generar token
    const token = jwt.sign({ id: usuario._id, email }, process.env.JWT_SECRET || "secreto", { expiresIn: "1h" });

    res.json({ token, mensaje: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión: " + error.message });
  }
});

app.post('/api/registro', async (req, res) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "El email no es válido" });
  }

  // Validar longitud de la contraseña
  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new User({ email, password: hashedPassword });
    await nuevoUsuario.save();

    console.log('Usuario registrado exitosamente:', email);
    res.json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).json({ error: "Error al registrar usuario: " + error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});