
import React, { useState } from 'react';
import { Space, AutoComplete } from 'antd';
import axios from 'axios';
import { SearchProps } from 'antd/es/input/Search';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: number;
  name: string;
  type: string;
  // Add more fields as needed
}

const SearchComponent: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearch: SearchProps['onSearch'] = async (value) => {
    if (!value.trim()) return; // Do not search if the query is empty

    try {
      const response = await axios.get<SearchResult[]>(`${import.meta.env.VITE_APP_BASE_URL}/films?q=${value}`);
      setSearchResults(response.data);
      setSearchPerformed(true); // Set searchPerformed to true when a search is performed
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Perform search only if there is text entered in the search bar
    if (value.trim()) {
      onSearch(value);
    } else {
      setSearchPerformed(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    return (
      <Link
        to={{
          pathname: `/search/${result.id}`,
          search: `?id=${result.id}&title=${encodeURIComponent(result.name)}&type=${encodeURIComponent(result.type)}`,
        }}
        key={`link${result.id}`}
      >
        <div>
          <strong>{result.name}</strong> - {result.type}
        </div>
      </Link>
    );
  };

  const options = searchResults
    .filter((result) => {
      // Filter options based on letter order
      const searchLetters = searchValue.toLowerCase().split('');
      const filmNameLetters = result.name.toLowerCase().split('');
      let j = 0;
      for (let i = 0; i < filmNameLetters.length; i++) {
        if (filmNameLetters[i] === searchLetters[j]) {
          j++;
          if (j === searchLetters.length) {
            return true;
          }
        }
      }
      return false;
    })
    .map((result) => ({
      value: result.name,
      label: handleResultClick(result),
    }));

  // Add error message to options only if search is performed and no results are found
  if (searchPerformed && options.length === 0) {
    options.push({
      value: 'error',
      label: <div style={{ color: 'red' }}>Item not found</div>,
    });
  }

  return (
    <Space direction="vertical">
      <AutoComplete
        value={searchValue}
        options={options.map((option) => ({ value: option.value, label: option.label }))}
        onChange={handleSearchChange} // Trigger search on input change
        placeholder="Enter a name to search"
        style={{ width: 400 }}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ backgroundColor: 'white' }} // Set background color of dropdown
      />
    </Space>
  );
};

export default SearchComponent;
