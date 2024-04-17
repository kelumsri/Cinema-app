
// import React, { useState, useEffect } from 'react';
// import { Button, Space } from 'antd';

// const SeatButton: React.FC = () => {
//   const [clickedSeats, setClickedSeats] = useState<string[]>([]);
//   const [bookedSeats, setBookedSeats] = useState<string[]>([]);

//   useEffect(() => {
//     // Fetch booked seats from the server
//     fetchBookedSeatsFromServer();
//   }, []);

//   const fetchBookedSeatsFromServer = () => {
//     // Make a request to your backend to fetch booked seats
//     // Assuming your backend provides an API endpoint to fetch booked seats
//     fetch('/bookings/booked-seats')
//       .then(response => response.json())
//       .then(data => {
//         // Update state with the fetched booked seats
//         setBookedSeats(data.bookedSeats);
//       })
//       .catch(error => console.error('Error fetching booked seats:', error));
//   };

//   const handleClick = (seat: string) => {
//     setClickedSeats(prevClickedSeats =>
//       prevClickedSeats.includes(seat)
//         ? prevClickedSeats.filter(clickedSeat => clickedSeat !== seat)
//         : [...prevClickedSeats, seat]
//     );
//   };

//   const isSeatBooked = (seat: string) => {
//     return bookedSeats.includes(seat);
//   };

//   const renderSeats = () => {
//     const rows = ['D', 'C', 'B', 'A'];
//     const seats = [];

//     for (let i = 0; i < rows.length; i++) {
//       for (let j = 1; j <= 10; j++) {
//         const seat = `${rows[i]}${j}`;
//         const isClicked = clickedSeats.includes(seat);
//         const isDisabled = isSeatBooked(seat) || (!isClicked && clickedSeats.length >= 4);

//         seats.push(
//           <React.Fragment key={seat}>
//             <Button
//               style={{
//                 width: 110,
//                 height: 50,
//                 textAlign: 'center',
//                 backgroundColor: isClicked ? '#1677ff' : isSeatBooked(seat) ? 'gray' : 'inherit',
//                 margin: '2px'
//               }}
//               onClick={() => handleClick(seat)}
//               disabled={isDisabled}
//             >
//               {seat}
//             </Button>
//             {j === 4 && <div style={{ width: 50 }} />}
//           </React.Fragment>
//         );
//       }
//     }

//     return seats;
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Space wrap>
//         {renderSeats()}
//       </Space>
//       <div style={{ backgroundColor: '#D9D9D9FF', height: 50, margin: 48, width: '50rem', justifyContent: 'center', display: 'flex' }}>
//         <p>SCREEN</p>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <h4>Number of seats selected: {clickedSeats.length}</h4>
//         <Button style={{ marginLeft: 50 }}>Book Now</Button>
//       </div>
//     </div>
//   );
// };

// export default SeatButton;





import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';

const SeatButton: React.FC = () => {
  const [clickedSeats, setClickedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [bookedTime, setBookedTime] = useState<string[]>([]);

  useEffect(() => {
    // Fetch booked seats from the server
    fetchBookedSeatsFromServer();
  }, []);

  const fetchBookedSeatsFromServer = () => {
    // Make a request to your backend to fetch booked seats
    // Assuming your backend provides an API endpoint to fetch booked seats
    fetch(import.meta.env.VITE_APP_BASE_URL + '/bookings/booked-seats')
      .then(response => response.json())
      .then(data => {
        // Update state with the fetched booked seats
        setBookedSeats(data.bookedSeats);
        setBookedTime(data.time);
      })
      .catch(error => console.error('Error fetching booked seats:', error));
  };

  const handleClick = (seat: string) => {
    setClickedSeats(prevClickedSeats =>
      prevClickedSeats.includes(seat)
        ? prevClickedSeats.filter(clickedSeat => clickedSeat !== seat)
        : [...prevClickedSeats, seat]
    );
  };

  const isSeatBooked = (seat: string) => {
    return bookedSeats.includes(seat);
  };

  const renderSeats = () => {
    const rows = ['D', 'C', 'B', 'A'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = `${rows[i]}${j}`;
        const isClicked = clickedSeats.includes(seat);
        const isDisabled = isSeatBooked(seat) || (!isClicked && clickedSeats.length >= 4);

        seats.push(
          <React.Fragment key={seat}>
            <Button
              style={{
                width: 110,
                height: 50,
                textAlign: 'center',
                backgroundColor: isClicked ? '#1677ff' : isSeatBooked(seat) ? 'gray' : 'inherit',
                margin: '2px'
              }}
              onClick={() => handleClick(seat)}
              disabled={isDisabled}
            >
              {seat}
            </Button>
            {j === 4 && <div style={{ width: 50 }} />}
          </React.Fragment>
        );
      }
    }

    return seats;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Space wrap>
        {renderSeats()}
      </Space>
      <div style={{ backgroundColor: '#D9D9D9FF', height: 50, margin: 48, width: '50rem', justifyContent: 'center', display: 'flex' }}>
        <p>SCREEN</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>Number of seats selected: {clickedSeats.length}</h4>
        <Button style={{ marginLeft: 50 }}>Book Now</Button>
      </div>
    </div>
  );
};

export default SeatButton;
