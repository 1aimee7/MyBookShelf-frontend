export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mt-10">
        <span className="text-orange-500">My Book</span>{' '}
        <span className="text-gray-500">Shelf</span>
      </h1>
      <p className="mt-4 text-gray-600 text-center max-w-md">
        Welcome to your virtual bookshelf! Discover, organize, and enjoy your favorite books.
      </p>
    </div>
  );
}