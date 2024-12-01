import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  const getOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        throw new Error("Failed to fetch order.");
      }
    } catch (error) {
      console.error(`Error: ${error}`); 
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <div>
      <h1>Confirmation</h1>
      <OrderConfirmation order={order} />
    </div>
  );
}

export default ConfirmationPage;
