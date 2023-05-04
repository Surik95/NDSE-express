import express from 'express';
import stor from '../database/stor.js';
import Liblary from '../models/liblary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Liblary.find().select('-__v');
    if (books.length > 0) {
      res.render('todo/index', {
        title: 'Главная',
        todos: books,
      });
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
  let book;

  try {
    book = await Liblary.findById(id).select('-__v');
    console.log(book);
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
          console.log(data.cnt);
          book.views = data.cnt;
          res.render('todo/view', {
            todo: book,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
});

router.get('/:id/update', async (req, res) => {
  const { id } = req.params;
  let book;

  try {
    book = await Liblary.findById(id).select('-__v');
    res.render('todo/update', {
      title: 'Редактирование книги',
      todo: book,
    });
  } catch (e) {
    res.status(404).json(e);
  }

  if (!book) {
    res.redirect('/404');
  }
});

export default router;
