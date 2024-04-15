// //v4

// import React, { useState } from 'react';
// import { Button, Modal, Input, Form, Row, Col, message } from 'antd';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// interface PaymentModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   title: string | null;
//   selectedDate: Date | null;
//   selectedTime: string; 
//   clickedSeats: string[];
//   token: string; // User token
//   totalTicketPrice:string;
// }

// const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onCancel, title, selectedDate,totalTicketPrice, selectedTime, clickedSeats, token }) => {
//   const [form] = Form.useForm();
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCVV] = useState('');

//   const userId = Cookies.get("userId");
//   console.log(userId);
  

//   const handlePayment = () => {
//     form.validateFields().then(values => {
//       console.log("Payment details:", userId);


//       // Send payment details to backend
//       console.log(title);
//       axios.post(import.meta.env.VITE_APP_BASE_URL + '/filmBookings/post_bookingData', {
//         filmName: title, 
//         date: selectedDate?.toISOString(), // Convert date to ISO string
//         time: selectedTime,
//         seatNumber: clickedSeats,
//         payment: values.payment, // Access payment from form values
//         paymentStatus: true,
//         userId: userId, 
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in request headers
//         }
//       }).then(response => {
//         console.log('Payment successful:', response.data);
//         message.success('Payment successful')
//         onCancel();
//         // Handle success, maybe close the modal or show a success message
//       }).catch(error => {
//         console.error('Payment failed:', error);
//         // Handle error, maybe show an error message
//       });
//     }).catch(errorInfo => {
//       console.log('Validation failed:', errorInfo);
//     });
//   }

//   // Function to extract user ID from token
//   // const getUserIdFromToken = (token: string) => {
//   //   // Your token parsing logic here to extract user ID
//   //   // Example: If token is in JWT format, decode it and extract user ID
//   //   return "user_id"; // Replace with actual user ID extracted from token
//   // }

//   return (
//     <Modal title="Payment" visible={visible} onCancel={onCancel} footer={null}>
//       <h2>Booking Details</h2>
//       <p>Film Name: {title}</p>
//       <p>Date: {selectedDate?.toLocaleDateString()}</p>
//       <p>Show Time: {selectedTime}</p>
//       <p>Seats: {clickedSeats.join(', ')}</p>
//       <p>Amount : {totalTicketPrice}</p>
//       <p>Amount : {userId}</p>



// <Form form={form} layout="vertical">
//         <Form.Item 
//           label="Card Number" 
//           name="cardNumber" 
//           rules={[
//             { required: true, message: 'Please enter your card number' },
//             { len: 16, message: 'Card number must be 16 digits' }
//           ]}
//         >
//           <Input 
//             placeholder="Enter card number" 
//             onChange={(e) => setCardNumber(e.target.value)} />
//         </Form.Item>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item 
//               label="Expiry Date" 
//               name="expiryDate" 
//               rules={[
//                 { required: true, message: 'Please enter expiry date' },
//                 { len: 4, message: 'Expiry date format must be MM/YY ' }
//               ]}
//             >
//               <Input 
//                 placeholder="MMYY" 
//                 onChange={(e) => setExpiryDate(e.target.value)} />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item 
//               label="CVV" 
//               name="cvv" 
//               rules={[
//                 { required: true, message: 'Please enter CVV' },
//                 { len: 3, message: 'CVV must be 3 digits' }
//               ]}
//             >
//               <Input 
//                 placeholder="Enter CVV" 
//                 onChange={(e) => setCVV(e.target.value)} />
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>

//       <div style={{ display: "flex", justifyContent: "right" }}>
//         <Button onClick={onCancel}>Cancel</Button>
//         <Button onClick={handlePayment} type="primary">Payment</Button>
//       </div>
//     </Modal>
//   );
// };

// export default PaymentModal;


//v4

import React, { useState } from 'react';
import { Button, Modal, Input, Form, Row, Col, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

interface PaymentModalProps {
  visible: boolean;
  onCancel: () => void;
  title: string | null;
  selectedDate: Date | null;
  selectedTime: string; 
  clickedSeats: string[];
  token: string; // User token
  totalTicketPrice:string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onCancel, title, selectedDate,totalTicketPrice, selectedTime, clickedSeats, token }) => {
  const [form] = Form.useForm();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const userId = Cookies.get("userId");
  console.log(userId);
  

  const handlePayment = () => {
    form.validateFields().then(values => {
      console.log("Payment details:", userId);
  
      // Send payment details to backend
      console.log(title);
      axios.post(import.meta.env.VITE_APP_BASE_URL + '/filmBookings/post_bookingData', {
        filmName: title, 
        date: selectedDate?.toISOString(), // Convert date to ISO string
        time: selectedTime,
        seatNumber: clickedSeats,
        payment: totalTicketPrice,
        userId: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        }
      }).then(response => {
        console.log('Payment successful:', response.data);
        message.success('Payment successful')
        onCancel();
        // Handle success, maybe close the modal or show a success message
      }).catch(error => {
        console.error('Payment failed:', error);
        // Handle error, maybe show an error message
      });
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  }
  
  return (
    <Modal title="Payment" visible={visible} onCancel={onCancel} footer={null}>
      <h2>Booking Details</h2>
      <p>Film Name: {title}</p>
      <p>Date: {selectedDate?.toLocaleDateString()}</p>
      <p>Show Time: {selectedTime}</p>
      <p>Seats: {clickedSeats.join(', ')}</p>
      <p>Amount : {totalTicketPrice}</p>



<Form form={form} layout="vertical">
<Form.Item 
    label="Card Number" 
    name="cardNumber" 
    rules={[
        { required: true, message: 'Please enter your card number' },
        { len: 16, message: 'Card number must be 16 digits' }
    ]}
>
    <Input 
        placeholder="Enter card number" 
        onChange={(e) => setCardNumber(e.target.value)} 
        maxLength={16} 
    />
</Form.Item>


        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="Expiry Date" 
              name="expiryDate" 
              rules={[
                { required: true, message: 'Please enter expiry date' },
                { len: 4, message: 'Expiry date format must be MM/YY ' }
              ]}
            >
              <Input 
                placeholder="MMYY" 
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={4} 
                />
                
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="CVV" 
              name="cvv" 
              rules={[
                { required: true, message: 'Please enter CVV' },
                { len: 3, message: 'CVV must be 3 digits' }
              ]}
            >
              <Input 
                placeholder="Enter CVV" 
                onChange={(e) => setCVV(e.target.value)}
                maxLength={3} 
                />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handlePayment} type="primary">Payment</Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
