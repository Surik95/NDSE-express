import { nanoid } from 'nanoid';

class Book {
  constructor(
    title = 'string',
    description = 'string',
    authors = 'string',
    favorite = false,
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

export default Book;
