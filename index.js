import express from 'express';
import login from './routes/login.js';
import book from './routes/book.js';
import index from './routes/index.js';
import downloadImg from './routes/downloadImg.js';

const app = express();
app.use(express.json());

app.use('/api/user/login', login);
app.use('/api/books/', index);
// app.use('/api/books/:id/download', downloadImg);
// app.use('/api/books/:id', book);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
