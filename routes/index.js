import express from 'express';
import Book from '../database/book.js';
import stor from '../database/stor.js';
import fileMulter from '../middlewere/file.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/create', fileMulter.single('fileBook'), (req, res) => {
  const { books } = stor;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );

  if (req.file) {
    newBook.fileBook = req.file.destination + '/' + req.file.filename;
  }

  books.push(newBook);

  res.redirect('http://localhost:3000/api/books/');

  res.status(201);
});

router.get('/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json({ errcode: 404, errmsg: '“not found”' });
  }
});

router.post('/:id/update', fileMulter.single('fileBook'), (req, res) => {
  const { books } = stor;
  const changes = {};
  for (const key in req.body) {
    if (req.body[key]) {
      changes[key] = req.body[key];
    }
  }
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      ...changes,
    };
    if (req.file) {
      books[idx].fileBook = req.file.path;
    }
    res.redirect('http://localhost:3000/api/books/');
    res.status(201);
  } else {
    res.status(404);
    res.json({ errcode: 404, errmsg: '“not found”' });
  }
});

router.delete('/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json({ errcode: 404, errmsg: '“not found”' });
  }
});

router.get('/:id/download', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.download(
      __dirname + `/../${books[idx].fileBook}`,
      books[idx].fileBook.slice(11),
      (err) => {
        if (err) {
          res.status(404).json(err);
        }
      }
    );
  } else {
    res.status(404);
    res.json({ errcode: 404, errmsg: '“not found”' });
  }
});

export default router;
