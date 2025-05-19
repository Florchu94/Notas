require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./config/db'); // Conexión
const { sequelize } = require('./config/db'); // Sequelize
const Note = require('./models/Note'); // Modelo Note

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const noteRoutes = require('./routes/noteRoutes');
app.use('/notes', noteRoutes);

// Conectar a la base de datos
connectToDatabase();

// Sincronizar modelos
sequelize
  .sync({ force: false }) // Cambiar a true solo si querés forzar recreación
  .then(() => console.log('🗂️ Modelos sincronizados con la base de datos'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de notas funcionando 🔖');
});

// Arrancar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

// Exportar app y sequelize
module.exports = { app, sequelize };
