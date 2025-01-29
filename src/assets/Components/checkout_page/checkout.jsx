import React, { useEffect } from "react";
import handlePayment from "../../Apis/paymentapi/paymentapi.js";

const Checkout = ({ amount, customerobj }) => {
  
  const payNow = async () => {

    try {
      const order = await handlePayment({ amount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Corrected env variable
        amount: order.amount,
        currency: "INR",
        name: "MoviesNoww Ticket Booking Company",
        description: "Movie Ticket Purchase",
        order_id: order.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: customerobj?.name || "Guest",
          email: customerobj?.email || "guest@example.com",
          contact: customerobj?.phonenumber || "0000000000",
        },
        theme: { color: "#528FF0" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed! Please try again.");
    }
  };

  return (
    <button onClick={payNow} className="btn btn-primary m-3 p-3">
     Pay ₹{amount}
    </button>
  );
};

export default Checkout;
