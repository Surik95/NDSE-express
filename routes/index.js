import express from 'express';
import Book from '../database/book.js';
import stor from '../database/stor.js';
import fileMulter from '../middlewere/file.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Liblary from '../models/liblary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/create', fileMulter.single('fileBook'), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const newBook = new Liblary(
    new Book(title, description, authors, favorite, fileCover, fileName)
  );

  if (req.file) {
    newBook.fileBook = req.file.destination + '/' + req.file.filename;
  }

  try {
    await newBook.save();
  } catch (e) {
    res.status(500).json(e);
  }

  res.redirect(`${process.env.URL_HOME}api/books`);
  // res.status(201);
});

router.post('/:id/update', fileMulter.single('fileBook'), async (req, res) => {
  const changes = {};
  const { id } = req.params;
  for (const key in req.body) {
    if (req.body[key]) {
      changes[key] = req.body[key];
    }
  }

  if (req.file) {
    changes.fileBook = req.file.path;
  }

  try {
    await Liblary.findByIdAndUpdate(id, changes);
    res.redirect(`${process.env.URL_HOME}api/books/`);
    // .status(201).json(book);
  } catch (e) {
    res.status(404).json({ errcode: 404, errmsg: '“not found”' });
  }
  // console.log(process.env.URL_HOME);
  // res.redirect(`${process.env.URL_HOME}api/books/`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Liblary.findByIdAndDelete(id);
    res.status(201).json('ok');
  } catch (e) {
    res.status(500).json(e);
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
