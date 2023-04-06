import express from 'express';
import stor from '../database/stor.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { books } = stor;
  res.render('todo/index', {
    title: 'Главная',
    todos: books,
  });
});

router.get('/create', (req, res) => {
  const { books } = stor;
  res.render('todo/create', {
    title: 'Добавить книгу',
    todo: {},
  });
});

router.get('/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect('/404');
  }

  res.render('todo/view', {
    todo: books[idx],
  });
});

router.get('/:id/update', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect('/404');
  }

  res.render('todo/update', {
    title: 'Редактирование книги',
    todo: books[idx],
  });
});

export default router;
