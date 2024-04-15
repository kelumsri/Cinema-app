// import React from 'react';
// import { Table } from 'antd';
// import type { TableColumnsType } from 'antd';

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Film name',
//     dataIndex: 'film_name',
//     width: 150,
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     width: 150,
//   },
//   {
//     title: 'Seat Numbers',
//     dataIndex: 'seat_numbers',
//     width: 150,
//   },
//   {
//     title: 'Payment',
//     dataIndex: 'payment',
//     width: 150,
//   },
// ];

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// const App: React.FC = () => (
//   <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
// );

// export default App;

// import React, { useEffect, useState } from 'react';
// import { Table } from 'antd';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import type { TableColumnsType } from 'antd';

// interface DataType {
//   key: React.Key;
//   film_name: string;
//   date: string;
//   seat_numbers: string;
//   payment: number;
//   userId: string; // Add userId property to the DataType interface
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Film name',
//     dataIndex: 'film_name',
//     width: 150,
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     width: 150,
//   },
//   {
//     title: 'Seat Numbers',
//     dataIndex: 'seat_numbers',
//     width: 150,
//   },
//   {
//     title: 'Payment',
//     dataIndex: 'payment',
//     width: 150,
//   },
// ];

// const App: React.FC = () => {
//   const [data, setData] = useState<DataType[]>([]);
//   const userId = Cookies.get("userId");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + '/filmBookings/get_bookingData'); 
//         console.log(response.data)
//         console.log(userId)
//         const filteredData = response.data.filter((booking: DataType) => booking.userId === userId);
//         setData(filteredData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error
//       }
//     };

//     if (userId) {
//       fetchData();
//     }
//   }, [userId]);

//   return (
//     <div>
//       {data.length > 0 ? (
//         <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
//       ) : (
//         <p>No film bookings</p>
//       )}
//     </div>
//   );
// };

// export default App;



// import React, { useEffect, useState } from 'react';
// import { Table } from 'antd';
// import axios from 'axios';
// import type { TableColumnsType } from 'antd';

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Film name',
//     dataIndex: 'filmName',
//     width: 150,
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     width: 150,
//   },
//   {
//     title: 'Seat Numbers',
//     dataIndex: 'seatNumber',
//     width: 150,
//   },
//   {
//     title: 'Payment',
//     dataIndex: 'payment',
//     width: 150,
//   },
// ];

// const App: React.FC = () => {
//   const [data, setData] = useState<DataType[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + '/filmBookings/get_bookingData'); // Change the URL to your backend endpoint
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
//   );
// };

// export default App;

                                
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import type { TableColumnsType } from 'antd';
import Item from 'antd/es/list/Item';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  userId: string; // Add userId property to DataType interface
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Film name',
    dataIndex: 'filmName',
    width: 150,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 150,
  },
  {
    title: 'Seat Numbers',
    dataIndex: 'seatNumber',
    width: 150,
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    width: 150,
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + '/filmBookings/get_bookingData');
        console.log('Response data:', response.data); // Log response data
        
        if (response.data && response.data.length > 0 && userId) {
          // Assuming userId is nested within each item of response.data array
          const filteredData = response.data.filter((item: DataType) => item.userId == userId);
          setData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId]);
  

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
  );
};

export default App;
