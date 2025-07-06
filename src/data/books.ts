export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  rating: number;
  coverImage: string;
  category?: string[];
  availability?: string;
  status?: string;
  edition?: string;
  ratingsCount?: number;
  currentlyReading?: number;
  haveRead?: number;
  formats?: {
    hardCopy: boolean;
    ebook: boolean;
    audiobook: boolean;
  };
  location?: string;
  publisher?: string;
  language?: string;
  pages?: number;
  description?: string;
  authorBio?: string;
  authorImage?: string;
  borrowedBy?: string; // optional, added to support borrowedBy field
}

export const books: Book[] = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    year: 2000,
    rating: 4.8,
    coverImage: "/books/dont-make-me-think.jpg",
    category: ["Computer Science", "UX Design"],
    availability: "10 Copies",
    status: "In-Shelf",
    edition: "Second Edition",
    ratingsCount: 50,
    currentlyReading: 25,
    haveRead: 119,
    formats: { hardCopy: true, ebook: true, audiobook: true },
    location: "CS A-15",
    publisher: "New Riders Press",
    language: "English",
    pages: 216,
    authorBio: "Steve Krug is a usability consultant...",
    authorImage: "/authors/steve-krug.jpg",
    description: "Since Don't Make Me Think was first published..."
  },
  {
    id: 2,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: 1988,
    rating: 4.5,
    coverImage: "/books/design-of-everyday-things.jpg",
    category: ["Computer Science", "UX Design"],
    status: "Borrowed",
    publisher: "Basic Books",
    language: "English",
    pages: 368,
    description: "A classic book on user-centered design.",
    authorBio: "Don Norman is a cognitive scientist and usability engineer.",
    authorImage: "/authors/don-norman.jpg"
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
    publisher: "Simon & Schuster",
    pages: 288,
    description: "A five-day process for solving problems and testing new ideas.",
    language: "English",
    currentlyReading: 8,
    haveRead: 41,
    edition: "1st Edition"
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
    publisher: "O'Reilly Media",
    pages: 240,
    description: "Focuses on the experience under design, not deliverables.",
    language: "English",
    currentlyReading: 11,
    haveRead: 53,
    edition: "2nd Edition"
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
    publisher: "Leanpub",
    pages: 350,
    description: "Hands-on guide to learning React from fundamentals to advanced concepts.",
    language: "English",
    currentlyReading: 20,
    haveRead: 85,
    edition: "First Edition"
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
    publisher: "Warner Books",
    pages: 336,
    description: "Advocates financial literacy, investing, and entrepreneurship.",
    language: "English",
    currentlyReading: 9,
    haveRead: 72,
    edition: "Revised Edition"
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
    publisher: "Bloomsbury",
    pages: 448,
    description: "Magical adventures continue in the second installment of the Harry Potter series.",
    language: "English",
    currentlyReading: 25,
    haveRead: 100,
    edition: "Second Edition"
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
    publisher: "O'Reilly Media",
    pages: 278,
    description: "Deep dive into core JavaScript mechanisms for experienced developers.",
    language: "English",
    currentlyReading: 17,
    haveRead: 66,
    edition: "First Edition"
  },
  {
    id: 9,
    title: "Holy Bible",
    author: "Benigne",
    year: 2015,
    rating: 4.9,
    coverImage: "/books/Holybible.png",
    category: ["Religion", "Spirituality"],
    status: "In-Shelf",
    availability: "Available",
    location: "Shelf G1",
    publisher: "Various",
    pages: 1200,
    description: "Sacred scriptures of Christianity, containing the Old and New Testaments.",
    language: "Multiple",
    currentlyReading: 30,
    haveRead: 300,
    edition: "Multiple Editions"
  }
];
