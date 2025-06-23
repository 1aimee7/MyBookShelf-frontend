import Image from 'next/image';
import { Star } from 'lucide-react';
import { Book } from '@/data/books';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="text-left">
      <div className="relative h-56 w-full mb-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
        <Image
          src={book.coverImage}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          className="bg-gray-200"
        />
      </div>
      <h3 className="font-semibold text-sm truncate">{book.title}</h3>
      <p className="text-xs text-gray-500 truncate">{book.author}, {book.year}</p>
      <div className="flex items-center mt-1">
        <Star size={14} className="text-yellow-400 fill-current" />
        <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
      </div>
    </div>
  );
};

export default BookCard;