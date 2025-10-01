const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./')); // serve index.html

// Pegar comentários
app.get('/comments', (req, res) => {
  const data = fs.readFileSync('comments.json', 'utf8');
  res.json(JSON.parse(data));
});

// Adicionar comentário
app.post('/comments', (req, res) => {
  const comment = req.body;
  const data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  data.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(data, null, 2));
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
