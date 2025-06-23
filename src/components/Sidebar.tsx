import Link from 'next/link';
import { Home, Search, Library, PlusSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-white text-gray-800 p-6 flex-col justify-between h-screen fixed shadow-lg">
      <div>
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800">My Book</h2>
            <h2 className="text-2xl font-bold text-gray-800">Shelf</h2>
        </div>
        <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center p-2 space-x-3 bg-gray-100 rounded-lg text-purple-600 font-semibold">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 hover:bg-gray-100 rounded-lg">
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 hover:bg-gray-100 rounded-lg">
              <Library size={20} />
              <span>My Shelf</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 hover:bg-gray-100 rounded-lg">
              <PlusSquare size={20} />
              <span>Contribute</span>
            </Link>
        </nav>
      </div>
      <div className="space-y-2 text-gray-500 text-sm">
        <p className="cursor-pointer hover:text-purple-600">About</p>
        <p className="cursor-pointer hover:text-purple-600">Support</p>
        <p className="cursor-pointer hover:text-purple-600">Terms & Condition</p>
      </div>
    </aside>
  );
};

export default Sidebar;