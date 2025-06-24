import Link from 'next/link';
import { Home, Search, Library, PlusSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    // The sidebar is a flex column with a right border, taking its white background from the parent panel.
    <aside className="hidden lg:flex w-64 flex-col justify-between p-6 border-r border-gray-200">
      <div>
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800">My Book</h2>
            <h2 className="text-2xl font-bold text-gray-800">Shelf</h2>
        </div>
        <nav className="space-y-4">
            {/* Active link style from Figma */}
            <Link href="/dashboard" className="flex items-center p-2 space-x-3 bg-gray-100 rounded-lg text-purple-600 font-semibold">
              <Home size={20} className="text-purple-600"/>
              <span>Home</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Library size={20} />
              <span>My Shelf</span>
            </Link>
            <Link href="#" className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-100 rounded-lg">
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