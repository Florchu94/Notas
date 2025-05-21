#!/bin/bash

echo "🚀 Iniciando script de setup..."

# Verifica si .env existe
if [ ! -f .env ]; then
  echo "⚠️  El archivo .env no existe. Por favor, creá uno a partir de .env.example antes de continuar."
  exit 1
fi

# Instalación de dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

# Configurar base de datos (crear tablas)
echo "🛠️ Ejecutando sincronización de modelos con Sequelize..."
node index.js &

# Esperar a que el servidor se inicie
sleep 5

# Volver al directorio raíz
cd ..

echo "✅ Setup completo. El backend está corriendo en http://localhost:3001"
