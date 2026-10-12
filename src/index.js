const express = require('express');
const mongoose = require('mongoose');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

app.use(express.json());

// Conexão MongoDB com tratamento assíncrono robusto
async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err.message);
    setTimeout(connectMongo, 3000); // Tenta novamente após 3 segundos
  }
}
connectMongo();

// Conexão Redis simplificada
const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', err => console.error('Erro no Redis:', err.message));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Conectado ao Redis com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no Redis:', err.message);
    setTimeout(connectRedis, 3000); // Tenta novamente após 3 segundos
  }
}
connectRedis();

app.get('/', (req, res) => {
  res.json({ status: 'API rodando e integrada com MongoDB e Redis!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});