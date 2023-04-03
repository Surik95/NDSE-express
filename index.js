import express from 'express';
import login from './routes/login.js';
import index from './routes/index.js';

const app = express();
app.use(express.json());

app.use('/api/user/login', login);
app.use('/api/books/', index);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
