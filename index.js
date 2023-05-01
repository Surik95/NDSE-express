import express from 'express';
import login from './routes/login.js';
import index from './routes/index.js';
import todo from './routes/todo.js';
import errorMiddleware from './middlewere/error.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/api/user/login', login);
app.use('/api/books/', todo);
app.use('/api/books/', index);

app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
const urlDb = process.env.UrlDb;
console.log(urlDb);
startServer(PORT, urlDb);

async function startServer(PORT, UrlDb) {
  try {
    await mongoose.connect(UrlDb);
    app.listen(PORT, () => {
      console.log(`Сервер запущен, порт: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
