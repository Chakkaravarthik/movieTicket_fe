const URL = import.meta.env.VITE_LOCAL_URI

const handlePayment = async ({amount }) => {
    const response = await fetch(`${URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    return await response.json();
}

export default handlePayment;