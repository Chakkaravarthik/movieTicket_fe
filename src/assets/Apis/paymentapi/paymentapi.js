

const handlePayment = async ({amount }) => {
    const response = await fetch("http://localhost:8000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    return await response.json();
}

export default handlePayment;