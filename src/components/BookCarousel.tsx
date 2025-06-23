import { Book } from '@/data/books';
import BookCard from './BookCard'; // Make sure this import is correct

interface BookCarouselProps {
  title: string;
  books: Book[];
}

const BookCarousel = ({ title, books }: BookCarouselProps) => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="#" className="text-sm text-purple-600 font-semibold hover:underline">Show All</a>
      </div>
      <div className="flex overflow-x-auto pb-4 -mx-2">
        <div className="flex flex-nowrap">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCarousel; // <-- Ensure this is 'export default'