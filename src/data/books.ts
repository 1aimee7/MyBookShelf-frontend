export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  rating: number;
  coverImage: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    year: 2000,
    rating: 4.8,
    coverImage: "/books/dont-make-me-think.jpg",
  },
  {
    id: 2,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: 1988,
    rating: 4.5,
    coverImage: "/books/design-of-everyday-things.jpg",
  },
  {
    id: 3,
    title: "Sprint: How to Solve...",
    author: "Jake Knapp",
    year: 2016,
    rating: 4.6,
    coverImage: "/books/sprint.jpg",
  },
  {
    id: 4,
    title: "Lean UX: Designing Great...",
    author: "Jeff Gothelf",
    year: 2016,
    rating: 4.5,
    coverImage: "/books/lean-ux.jpg",
  },
  {
    id: 5,
    title: "The Road to React",
    author: "Robin Wieruch",
    year: 2020,
    rating: 4.7,
    coverImage: "/books/react.jpg",
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    year: 1997,
    rating: 4.6,
    coverImage: "/books/rich-dad-poor-dad.jpg",
  },
  {
    id: 7,
    title: "Harry Potter and the...",
    author: "J.K. Rowling",
    year: 2002,
    rating: 4.9,
    coverImage: "/books/harry-potter.jpg",
  },
    {
    id: 8,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2014,
    rating: 4.9,
    coverImage: "/books/scope-closure.jpg",
  },
];