import express from 'express';
import stor from '../database/stor.js';
import Liblary from '../models/liblary.js';

const router = express.Router();

// const prom = new Promise((resolve, reject) => {
//   const { books } = stor;
//   books.forEach(async (item) => {
//     try {
//       const response = await fetch(
//         `${process.env.URL_COUNTER}counter/${item.id}`
//       ).then((data) => data.json());
//       item.views = response.cnt;
//     } catch (e) {
//       console.log(e);
//     }
//   });
//   resolve(books);
// });

router.get('/', async (req, res) => {
  try {
    const books = await Liblary.find().select('-__v');
    if (books.length > 0) {
      books.forEach(async (item) => {
        try {
          const response = await fetch(
            `${process.env.URL_COUNTER}counter/${item.id}`
          ).then((data) => data.json());
          if (response.cnt) {
            item.views = response.cnt;
          }
        } catch (e) {
          console.log(e);
        } finally {
          res.render('todo/index', {
            title: 'Главная',
            todos: books,
          });
        }
      });
    } else {
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
      }).then(
        res.render('todo/view', {
          todo: book,
        })
        // .status(201)
        // .json({ book })
      );
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
