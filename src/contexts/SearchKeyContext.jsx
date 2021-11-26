import { createContext, useContext, useState } from 'react';

const SearchKeyContext = createContext();

export const useSearchKey = () => {
  const context = useContext(SearchKeyContext);

  if (context === undefined)
    throw new Error(
      'useSearchKeyContext must be used within the SearchKeyContextProvider!'
    );

  return context;
};

export const SearchKeyProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('');

  return (
    <SearchKeyContext.Provider
      value={{
        searchKey,
        setSearchTerm,
      }}
    >
      {children}
    </SearchKeyContext.Provider>
  );
};
