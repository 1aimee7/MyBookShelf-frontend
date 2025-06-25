"use client";

import { createContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Create the context with a default value
export const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
});

// Create a provider component that will wrap our app
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};