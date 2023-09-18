import { Container } from 'inversify';
import BooksRepository from './models/BooksRepository.ts';

const myContainer = new Container();

myContainer.bind(BooksRepository).toSelf();

export { myContainer };
