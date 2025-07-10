// Importa el módulo Express, que es un framework para crear servidores web con Node.js
const express = require('express');

// Importa el módulo body-parser, que permite leer datos enviados desde formularios HTML (por POST)
const bodyParser = require('body-parser');

// Importa las rutas definidas para manejar las operaciones del usuario (CRUD)
const userRoutes = require('./routes/userRoutes');

// Importa el módulo path, que permite trabajar con rutas de archivos del sistema de forma segura
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/users', userRoutes);

// Vistas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});