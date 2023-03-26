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
    res.json('404 | страница не найдена');
  }
});

app.post('/api/books/', (req, res) => {
  console.log(req.body);
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
  //   const { title, description, authors, favorite, fileCover, fileName } =
  //     req.body;
  for (const key in req.body) {
    if (req.body[key]) {
      changes[key] = req.body[key];
    }
    console.log(key);
  }
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  console.log(books[idx]);
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      ...changes,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  console.log(id);
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
