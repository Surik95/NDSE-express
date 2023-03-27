import express from 'express';
import { nanoid } from 'nanoid';

class Book {
  constructor(
    title = 'string',
    description = 'string',
    authors = 'string',
    favorite = 'string',
    fileCover = 'string',
    fileName = 'string',
    id = nanoid()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.title = title;
    this.id = id;
  }
}

const stor = {
  books: [],
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  const { books } = stor;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
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
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
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

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json({ errcode: 404, errmsg: '“not found”' });
  }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT);
