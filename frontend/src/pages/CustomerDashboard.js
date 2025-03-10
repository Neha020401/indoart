import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/CustomerDashboard.css';

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch customer's orders
    // For now, we'll use dummy data
    const dummyOrders = [
      { id: 1, date: '2023-05-15', total: 500, status: 'Delivered' },
      { id: 2, date: '2023-05-20', total: 750, status: 'Processing' },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="customer-dashboard">
      <h1>Customer Dashboard</h1>
      <section className="user-info">
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <Link to="/profile" className="edit-profile-btn">Edit Profile</Link>
      </section>
      <section className="order-history">
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td>
                  <Link to={`/order/${order.id}`} className="view-order-btn">View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CustomerDashboard;

