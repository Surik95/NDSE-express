import express, { json } from 'express';
import stor from '../database/stor.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { books } = stor;

  if (books.length > 0) {
    books.forEach(async (item) => {
      try {
        const response = await fetch(
          `${process.env.URL_COUNTER}counter/${item.id}`
        ).then((data) => data.json());
        console.log(response);
        item.views = response.cnt;
      } catch (e) {
        console.log(e);
      }
    });
  }

  res.render('todo/index', {
    title: 'Главная',
    todos: books,
  });
});

router.get('/create', (req, res) => {
  res.render('todo/create', {
    title: 'Добавить книгу',
    todo: {},
  });
});

router.get('/:id', async (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect('/404');
  }

  if (id) {
    try {
      await fetch(`${process.env.URL_COUNTER}counter/${id}/incr`, {
        method: 'POST',
      }).then(
        res.render('todo/view', {
          todo: books[idx],
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
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
