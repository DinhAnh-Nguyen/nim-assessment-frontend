/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from "react";

function OrderConfirmation({ order }) {
  const { id, name, phone, address, items } = order;
  return (
    <div>
      <h2>Thank you for your order</h2>
      <p>Order ID: {id}</p>
      <p>Customer&apos;s Name: {name}</p>
      <p>Customer&apos;s Phone: {phone}</p>
      <p>Customer&apos;s Address: {address}</p>
      <p>List of Items:</p>
      <ul>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              {item.item.name} (Quantity: {item.quantity})
            </li>
          ))
        ) : (
          <p>No items in the order.</p>
        )}
      </ul>
    </div>
  );
}

export default OrderConfirmation;
