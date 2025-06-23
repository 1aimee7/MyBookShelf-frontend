import { Book } from '../data/books';
import BookCard from './BookCard';

interface NewArrivalsProps {
  books: Book[];
}

export default function NewArrivals({ books }: NewArrivalsProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">New Arrivals</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}