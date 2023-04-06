import { nanoid } from 'nanoid';

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = false,
    fileCover = '',
    fileName = '',
    id = nanoid()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = typeof favorite === 'string' ? true : favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

export default Book;
