import React, { useEffect } from "react";
import handlePayment from "../../Apis/paymentapi/paymentapi.js";
import createticket from "../../Apis/ticketapi/ticketapi.js";


const Checkout = ({ amount, customerobj ,moviePopUp , count , closepop ,  setpopticket, setticketbookeddata}) => {

  const closepopticket=()=>{
    setTimeout(() => setpopticket(false), 8000); 
  }
  
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
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          let ticketdata ={
            ...moviePopUp,response, count,customerobj
          }

          const res = await createticket({ticketdata});
          if(res.code ===1){
            closepop();
            setticketbookeddata(res);
            setpopticket(true);
            closepopticket();
          }

        },
        prefill: {
          name: customerobj?.name || "Guest",
          email: customerobj?.email || "guest@example.com",
          contact: customerobj?.phonenumber || "0000000000",
        },
        theme: { color: "#c5031a" },
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
