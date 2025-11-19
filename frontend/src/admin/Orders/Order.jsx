import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import "./Order.css";

const Order = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(`${server}/api/payments`);
      setPayments(data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to fetch payment records.");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="order-page">
      <h1>Payment Records</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment ID</th>
              <th>Signature</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.razorpay_order_id}</td>
                  <td>{payment.razorpay_payment_id}</td>
                  <td>{payment.razorpay_signature}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No payment records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;