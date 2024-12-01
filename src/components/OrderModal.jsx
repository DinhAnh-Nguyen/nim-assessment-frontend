import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const placeOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: order
        })
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/order-confirmation/${data.id}`);
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onClick={() => setOrderModal(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        role="menuitem"
        tabIndex={0}
      />
      <div
        ref={modalRef}
        className={styles.orderModalContent}
        tabIndex={-1}
        role="button"
        aria-label="Close Modal"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
      >
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
