// import React, { useState } from 'react';
// import { Input, Space, Spin, List } from 'antd';
// import axios from 'axios';
// import { SearchProps } from 'antd/es/input/Search';

// const { Search } = Input;

// interface SearchResult {
//   id: number;
//   name: string;
//   type: string;
//   // Add more fields as needed
// }

// const SearchComponent: React.FC = () => {
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

//   const onSearch: SearchProps['onSearch'] = async (value) => {
//     if (!value.trim()) return; // Do not search if the query is empty

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get<SearchResult[]>(`${import.meta.env.VITE_APP_BASE_URL}/films?q=${value}`);
//       setSearchResults(response.data.filter(result => result.name.toLowerCase() === value.toLowerCase()));
//       setSearchPerformed(true); // Set searchPerformed to true when a search is performed
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Space direction="vertical">
//       <Search placeholder="Enter a name to search" onSearch={onSearch} style={{ width: 400 }} />
//       {loading && <Spin />}
//       {error && <div>{error}</div>}
//       {searchPerformed && searchResults.length === 0 && !loading && (
//         <div>No matching results found for the search query.</div>
//       )}
//       {searchResults.length > 0 && (
//         <List
//           dataSource={searchResults}
//           renderItem={(item) => (
//             <List.Item style={{display:"flow"}}>
//               <div>
//               {item.name}
//               </div>
//                <div>
//                {item.type}
//                </div>
               
//             </List.Item>
//           )}
//         />
//       )}
//     </Space>
//   );
// };

// export default SearchComponent;



import React, { useState } from 'react';
import { Space, AutoComplete } from 'antd';
import axios from 'axios';
import { SearchProps } from 'antd/es/input/Search';


interface SearchResult {
  id: number;
  name: string;
  type: string;
  // Add more fields as needed
}

const SearchComponent: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearch: SearchProps['onSearch'] = async (value) => {
    if (!value.trim()) return; // Do not search if the query is empty

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<SearchResult[]>(`${import.meta.env.VITE_APP_BASE_URL}/films?q=${value}`);
      setSearchResults(response.data);
      setSearchPerformed(true); // Set searchPerformed to true when a search is performed
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
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

  const options = searchResults
    .filter(result => result.name.toLowerCase().includes(searchValue.toLowerCase())) // Filter options based on entered text
    .map((result) => ({
      value: result.name,
      label: (
        <div>
          <strong>{result.name}</strong> - {result.type}
        </div>
      ),
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
