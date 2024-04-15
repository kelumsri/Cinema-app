
// import React, { useState, useEffect } from 'react';
// import { Layout, Form, Button, DatePicker, Space, Radio } from 'antd';
// import { Content } from 'antd/es/layout/layout';
// import { RadioChangeEvent } from 'antd/lib/radio';
// import { useLocation } from 'react-router-dom';
// import HeaderComponent from '../components/Header';
// import Paymentmodal from '../components/Paymentmodal'; // Corrected import statement
// import axios from 'axios'; // Import Axios
// import dayjs, { Dayjs } from 'dayjs';

// const CardDetails: React.FC = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   // Retrieve card details from URL parameters
//   const title = queryParams.get('title');
//   const description = queryParams.get('description');

//   // State for date picker
//   const [selectedDate, setSelectedDate] = useState<any>(null);

//   console.log(selectedDate);

//   const handleDateChange = (date: any) => {
//     if (date) {
//       setSelectedDate(date instanceof Date ? date : new Date(date));
//     } else {
//       setSelectedDate(null);
//     }
//   };

//   // State for radio button
//   const [selectedTime, setSelectedTime] = useState<string>('10.30am - 12.30pm'); // Changed type to string

//   const handleTimeChange = (e: RadioChangeEvent) => {
//     setSelectedTime(e.target.value);
//   };

//   // State for seat system
//   const [clickedSeats, setClickedSeats] = useState<any[]>([]);

//   const handleClick = (seat: any) => {
//     setClickedSeats(prevClickedSeats =>
//       prevClickedSeats.includes(seat)
//         ? prevClickedSeats.filter(clickedSeat => clickedSeat !== seat)
//         : [...prevClickedSeats, seat]
//     );
//   };

//   // State for booked seats with film names
//   const [bookedSeats, setBookedSeats] = useState<any[]>([]);

//   const [ticketPrice, setTicketPrice] = useState<number | null>(null);
  
//   useEffect(() => {
//     axios.get(import.meta.env.VITE_APP_BASE_URL + '/getSeat')
//       .then(response => {
//         const data = response.data;
//         setBookedSeats(data);
//       })
//       .catch(error => {
//         console.error('Error fetching booked seats:', error);
//       });
  
//     // Fetch film details including ticket price
//     axios.get(import.meta.env.VITE_APP_BASE_URL + '/films')
//       .then(response => {
//         const data = response.data;
//         const film = data.find((film: any) => film.name === title);
//         if (film) {
//           setTicketPrice(film.ticketPrice);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching film details:', error);
//       });
//   }, [title]);

//   const isSeatBooked = (filmName: string, time: string, seatNumber: string, ) => {
//     return bookedSeats.some(item => item.film_name === filmName  && item.time === time && item.seat_numbers.includes(seatNumber));
//   };

//   const renderSeats = () => {
//     const rows = ['D', 'C', 'B', 'A'];
//     const seats: JSX.Element[] = [];

//     for (let i = 0; i < rows.length; i++) {
//       for (let j = 1; j <= 10; j++) {
//         const seat = `${rows[i]}${j}`;
//         const isBooked = isSeatBooked(title || '', selectedTime, seat);

//         seats.push(
//           <Button
//             key={seat}
//             style={{
//               width: 110,
//               height: 50,
//               textAlign: 'center',
//               backgroundColor: (clickedSeats.includes(seat) || isBooked) ? '#D3D3D3' : (clickedSeats.includes(seat) ? '#1677ff' : 'inherit'),
//               margin: '2px'
//             }}
//             onClick={() => handleClick(seat)}
//             disabled={isBooked} // Disable the button if the seat is booked
//           >
//             {seat}
//           </Button>
//         );
//         if (j === 4) {
//           seats.push(<div key={`${seat}-spacer`} style={{ width: 50 }} />);
//         }  
//       }
//     }

//     return seats;
//   };

//   // State for modal
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const disabledDate = (current: Dayjs) => { // Use Dayjs instead of Moment
//     // Disable past dates (before today)
//     return current && current < dayjs().startOf('day');
//   };
//   return (
//     <Layout>
//       <HeaderComponent />
//       <Content>
//         <Form
//           name="cardDetailsForm"
//           onFinish={showModal}
//           style={{ padding: '24px 200px 24px 200px', display: 'flex', flexDirection: 'column' }}
//         >
//           <div style={{ display: 'flex', marginBottom: '24px' }}>
//             <div>
//               <h1>Title: {title}</h1>
//               <h4>Description: {description}</h4>
//             </div>

//             <div style={{ padding: '60px 50px 0 100px' }}>
//               <Space direction="vertical" align="end">
//                 <Form.Item
//                   name="date"
//                   rules={[{ required: true, message: 'Please select a date!' }]}
//                 >
//                   {/* <DatePicker onChange={handleDateChange} style={{ width: 200, marginTop: 10 }} /> */}
//                   <DatePicker 
//   onChange={handleDateChange} 
//   style={{ width: 200, marginTop: 10 }} 
//   disabledDate={disabledDate} 
// />
//                 </Form.Item>
//               </Space>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', padding: '60px 50px 0 0px' }}>
//               <p style={{ margin: 0, marginRight: 20 }}>Show time:</p>
//               <Radio.Group onChange={handleTimeChange} value={selectedTime}>
//                 <Radio value="10.30am - 12.30pm">10.30am - 12.30pm</Radio>
//                 <Radio value="01.00pm - 03.00pm">01.00pm - 03.00pm</Radio>
//                 <Radio value="04.30pm - 06.30pm">04.30pm - 06.30pm</Radio>
//                 <Radio value="07.30pm - 09.30pm">07.30pm - 09.30pm</Radio>
//               </Radio.Group>
//             </div>
//           </div>

//           <div style={{ padding: '24px 100px 24px 100px', display: 'flex' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               <Space wrap>{renderSeats()}</Space>
//               <div style={{ backgroundColor: '#D9D9D9FF', height: 50, margin: 48, width: '50rem', justifyContent: 'center', display: 'flex' }}>
//                 <p>SCREEN</p>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <h4>Number of seats selected: {clickedSeats.length}</h4>
//                 <h4 style={{ margin: '30px' }}>Total Ticket Price: {ticketPrice !== null ? `${clickedSeats.length * ticketPrice}` : 'Loading...'}</h4>
//                 <Button style={{ marginLeft: 50 }} type="primary" htmlType="submit">
//                   Book Now
//                 </Button>
//                 <Paymentmodal
//                   visible={isModalVisible}
//                   onCancel={handleCancel}
//                   title={title}
//                   selectedDate={selectedDate}
//                   selectedTime={selectedTime}
//                   clickedSeats={clickedSeats}
//                   token={''}
//                   totalTicketPrice={ticketPrice !== null ? (clickedSeats.length * ticketPrice).toString() : ''}
//                 />
//               </div>
//             </div>
//           </div>
//         </Form>
//       </Content>
//     </Layout>
//   );
// };

// export default CardDetails;




import React, { useState, useEffect } from 'react';
import { Layout, Form, Button, DatePicker, Space, Radio } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useLocation } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import Paymentmodal from '../components/Paymentmodal'; // Corrected import statement
import axios from 'axios'; // Import Axios
import dayjs, { Dayjs } from 'dayjs';

const CardDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve card details from URL parameters
  const title = queryParams.get('title');
  const description = queryParams.get('description');

  // State for date picker
  const [selectedDate, setSelectedDate] = useState<any>(null);

  console.log(selectedDate);

  const handleDateChange = (date: any) => {
    if (date) {
      setSelectedDate(date instanceof Date ? date : new Date(date));
      console.log("Selected Date:", date); // Log selected date
    } else {
      setSelectedDate(null);
    }
  };
  

  // State for radio button
  const [selectedTime, setSelectedTime] = useState<string>('10.30am - 12.30pm'); // Changed type to string

  const handleTimeChange = (e: RadioChangeEvent) => {
    setSelectedTime(e.target.value);
  };

  // State for seat system
  const [clickedSeats, setClickedSeats] = useState<any[]>([]);

  const handleClick = (seat: any) => {
    setClickedSeats(prevClickedSeats =>
      prevClickedSeats.includes(seat)
        ? prevClickedSeats.filter(clickedSeat => clickedSeat !== seat)
        : [...prevClickedSeats, seat]
    );
  };

  // State for booked seats with film names
  const [bookedSeats, setBookedSeats] = useState<any[]>([]);

  const [ticketPrice, setTicketPrice] = useState<number | null>(null);
  
  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + '/getSeat')
      .then(response => {
        const data = response.data;
        setBookedSeats(data);
      })
      .catch(error => {
        console.error('Error fetching booked seats:', error);
      });
  
    // Fetch film details including ticket price
    axios.get(import.meta.env.VITE_APP_BASE_URL + '/films')
      .then(response => {
        const data = response.data;
        const film = data.find((film: any) => film.name === title);
        if (film) {
          setTicketPrice(film.ticketPrice);
        }
      })
      .catch(error => {
        console.error('Error fetching film details:', error);
      });
  }, [title]);

  // const isSeatBooked = (filmName: string, time: string, seatNumber: string, ) => {
  //   return bookedSeats.some(item => item.film_name === filmName  && item.time === time && item.seat_numbers.includes(seatNumber));
  // };

  const isSeatBooked = (filmName: string, time: string, seatNumber: string) => {
    const selectedDateString = dayjs(selectedDate).format('YYYY-MM-DD');
    
    return bookedSeats.some(item => {
      const backendDateString = dayjs(item.date).format('YYYY-MM-DD');
      
      return item.film_name === filmName &&
        item.time === time &&
        backendDateString === selectedDateString &&
        item.seat_numbers.includes(seatNumber);
    });
  };
  


  const renderSeats = () => {
    const rows = ['D', 'C', 'B', 'A'];
    const seats: JSX.Element[] = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = `${rows[i]}${j}`;
        const isBooked = isSeatBooked(title || '', selectedTime, seat);

        seats.push(
          <Button
            key={seat}
            style={{
              width: 110,
              height: 50,
              textAlign: 'center',
              backgroundColor: (clickedSeats.includes(seat) || isBooked) ? '#D3D3D3' : (clickedSeats.includes(seat) ? '#1677ff' : 'inherit'),
              margin: '2px'
            }}
            onClick={() => handleClick(seat)}
            disabled={isBooked} // Disable the button if the seat is booked
          >
            {seat}
          </Button>
        );
        if (j === 4) {
          seats.push(<div key={`${seat}-spacer`} style={{ width: 50 }} />);
        }  
      }
    }

    return seats;
  };

  // State for modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const disabledDate = (current: Dayjs) => { // Use Dayjs instead of Moment
    // Disable past dates (before today)
    return current && current < dayjs().startOf('day');
  };
  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <Form
          name="cardDetailsForm"
          onFinish={showModal}
          style={{ padding: '24px 200px 24px 200px', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', marginBottom: '24px' }}>
            <div>
              <h1>Title: {title}</h1>
              <h4>Description: {description}</h4>
            </div>

            <div style={{ padding: '60px 50px 0 100px' }}>
              <Space direction="vertical" align="end">
                <Form.Item
                  name="date"
                  rules={[{ required: true, message: 'Please select a date!' }]}
                >
                  {/* <DatePicker onChange={handleDateChange} style={{ width: 200, marginTop: 10 }} /> */}
                  <DatePicker 
  onChange={handleDateChange} 
  style={{ width: 200, marginTop: 10 }} 
  disabledDate={disabledDate} 
/>
                </Form.Item>
              </Space>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', padding: '60px 50px 0 0px' }}>
              <p style={{ margin: 0, marginRight: 20 }}>Show time:</p>
              <Radio.Group onChange={handleTimeChange} value={selectedTime}>
                <Radio value="10.30am - 12.30pm">10.30am - 12.30pm</Radio>
                <Radio value="01.00pm - 03.00pm">01.00pm - 03.00pm</Radio>
                <Radio value="04.30pm - 06.30pm">04.30pm - 06.30pm</Radio>
                <Radio value="07.30pm - 09.30pm">07.30pm - 09.30pm</Radio>
              </Radio.Group>
            </div>
          </div>

          <div style={{ padding: '24px 100px 24px 100px', display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Space wrap>{renderSeats()}</Space>
              <div style={{ backgroundColor: '#D9D9D9FF', height: 50, margin: 48, width: '50rem', justifyContent: 'center', display: 'flex' }}>
                <p>SCREEN</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Number of seats selected: {clickedSeats.length}</h4>
                <h4 style={{ margin: '30px' }}>Total Ticket Price: {ticketPrice !== null ? `${clickedSeats.length * ticketPrice}` : 'Loading...'}</h4>
                <Button style={{ marginLeft: 50 }} type="primary" htmlType="submit">
                  Book Now
                </Button>
                <Paymentmodal
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  title={title}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  clickedSeats={clickedSeats}
                  token={''}
                  totalTicketPrice={ticketPrice !== null ? (clickedSeats.length * ticketPrice).toString() : ''}
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default CardDetails;

