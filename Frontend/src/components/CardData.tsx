// import React from 'react';
// import CustomCard from '../components/Card';

// const cardData = [
//   { 
//     id: 1,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   { 
//     id: 2,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 2",
//     description: "This is the description for card 2",
//   },
//   {
//     id: 3,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   { 
//     id: 4,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   {
//     id: 5,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   {
//     id: 6,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   { 
//     id: 7,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
//   { 
//     id: 8,
//     imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: "Card title 1",
//     description: "This is the description for card 1",
//   },
  
//   // Add more card data as needed
// ];

// const App: React.FC = () => (
//   <CustomCard cardData={cardData} />
  
// );

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomCard from '../components/Card';

const App: React.FC = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Fetch data from your /film API
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + '/films'); // Assuming your API endpoint is /film
        // Assuming your API response data has a structure similar to cardData
        const newData = response.data.map((film: any) => ({
          id: film.ID,
          imageUrl: film.image,
          title: film.name,
          description: film.type,
        }));
        setCardData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return <CustomCard cardData={cardData} />;
};

export default App;
