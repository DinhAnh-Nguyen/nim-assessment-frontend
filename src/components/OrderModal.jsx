import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const formatPhoneNumber = (input) => {
    const cleanedPhoneNumber = input.replace(/\D/g, "");
    if (cleanedPhoneNumber.length !== 10) {
      return null;
    }

    return `(${cleanedPhoneNumber.slice(0, 3)}) ${cleanedPhoneNumber.slice(
      3,
      6
    )}-${cleanedPhoneNumber.slice(6)}`;
  };

  const validateFields = () => {
    const errorMessages = [];
    if (!name.trim()) {
      errorMessages.push("Enter your name.");
    }
    if (!phone.trim()) {
      errorMessages.push("Enter your phone number.");
    } else if (!formatPhoneNumber(phone)) {
      errorMessages.push("Invalid phone number format.");
    }
    if (!address.trim()) {
      errorMessages.push("Enter your address.");
    }

    if (errorMessages.length > 0) {
      setValidationError(errorMessages.join(" "));
      return false;
    }

    return true;
  };

  const placeOrder = async () => {
    if (!validateFields()) {
      return;
    }

    const formattedPhoneNumber = formatPhoneNumber(phone);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone: formattedPhoneNumber,
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                value={name}
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
                value={phone}
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="text"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                value={address}
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
              />
            </label>
          </div>
        </form>

        {validationError && (
          <div className={styles.error}>
            <p>{validationError}</p>
          </div>
        )}

        <div className={styles.orderModalButtons}>
          <button onClick={() => setOrderModal(false)}>Close</button>
          <button
            onClick={() => {
              placeOrder();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
