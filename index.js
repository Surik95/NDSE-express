import express from 'express';
import session from 'express-session';
import login from './routes/users.js';
import passport from './middlewere/passport.js';
import index from './routes/index.js';
import todo from './routes/todo.js';
import errorMiddleware from './middlewere/error.js';
import mongoose from 'mongoose';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user/', login);
app.use('/api/books/', todo);
app.use('/api/books/', index);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const urlDb = process.env.UrlDb;
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
