const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Funciona!'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor de prueba en puerto ${PORT}`));