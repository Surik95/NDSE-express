import express from 'express';
import Liblary from '../models/liblary.js';
import BooksRepository from '../models/BooksRepository.js';

const router = express.Router();
const app = express();

router.get('/', async (req, res) => {
  let user;
  if (req.isAuthenticated()) {
    user = req.user;
    console.log(req.user);
  }
  try {
    const books = await Liblary.find().select('-__v');

    if (books.length > 0) {
      res.render('todo/index', {
        title: 'Главная',
        todos: books,
        user,
        // message: app.get('message'),
      });
      // app.set('message', null);
    }
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get('/create', (req, res) => {
  res.render('todo/create', {
    title: 'Добавить книгу',
    todo: {},
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const repo = container.get(BooksRepository);
  let book;

  try {
    book = await repo.getBook(id);
  } catch (e) {
    res.status(404).json(e);
  }

  if (!book) {
    res.redirect('/404');
  }

  if (book) {
    try {
      await fetch(`${process.env.URL_COUNTER}counter/${id}/incr`, {
        method: 'POST',
        headers: {
          'Content-type': 'aplication/json',
        },
      });
      await fetch(`${process.env.URL_COUNTER}counter/${id}`)
        .then((data) => data.json())
        .then((data) => {
          book.views = data.cnt;
          res.render('todo/view', {
            todo: book,
            user: req.user,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
});

router.get(
  '/:id/update',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect(`${process.env.URL_HOME}api/user/login`);
    }
    next();
  },
  async (req, res) => {
    const { id } = req.params;
    let book;

    try {
      book = await Liblary.findById(id).select('-__v');
      res.render('todo/update', {
        title: 'Редактирование книги',
        todo: book,
        user: req.user,
      });
    } catch (e) {
      res.status(404).json(e);
    }

    if (!book) {
      res.redirect('/404');
    }
  }
);

export default router;
