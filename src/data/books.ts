export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  rating: number;
  coverImage: string;
  category: string[];  // categories of the book
  status: "In-Shelf" | "Borrowed" | "Reserved"; // status of the book
  availability: string; // e.g. "Available", "Not Available"
  location: string;  // physical location or section in library
  borrowedBy?: string; // optional field for who borrowed the book
}

export const books: Book[] = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    year: 2000,
    rating: 4.8,
    coverImage: "/books/dont-make-me-think.jpg",
    category: ["UX", "Design"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf A3",
  },
  {
    id: 2,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: 1988,
    rating: 4.5,
    coverImage: "/books/design-of-everyday-things.jpg",
    category: ["Design", "Engineering"],
    status: "Borrowed",
    availability: "Not Available",
    location: "Shelf B1",
    borrowedBy: "John Doe",
  },
  {
    id: 3,
    title: "Sprint: How to Solve...",
    author: "Jake Knapp",
    year: 2016,
    rating: 4.6,
    coverImage: "/books/sprint.jpg",
    category: ["Management", "Innovation"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf C2",
  },
  {
    id: 4,
    title: "Lean UX: Designing Great...",
    author: "Jeff Gothelf",
    year: 2016,
    rating: 4.5,
    coverImage: "/books/lean-ux.jpg",
    category: ["UX", "Design"],
    status: "Reserved",
    availability: "Not Available",
    location: "Shelf A4",
    borrowedBy: "Jane Smith",
  },
  {
    id: 5,
    title: "The Road to React",
    author: "Robin Wieruch",
    year: 2020,
    rating: 4.7,
    coverImage: "/books/react.jpg",
    category: ["Programming", "JavaScript"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf D1",
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    year: 1997,
    rating: 4.6,
    coverImage: "/books/rich-dad-poor-dad.jpg",
    category: ["Finance", "Self-help"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf E3",
  },
  {
    id: 7,
    title: "Harry Potter and the...",
    author: "J.K. Rowling",
    year: 2002,
    rating: 4.9,
    coverImage: "/books/harry-potter.jpg",
    category: ["Fiction", "Fantasy"],
    status: "Borrowed",
    availability: "Not Available",
    location: "Shelf F5",
    borrowedBy: "Alice Cooper",
  },
  {
    id: 8,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2014,
    rating: 4.9,
    coverImage: "/books/scope-closure.jpg",
    category: ["Programming", "JavaScript"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf D2",
  },
];
