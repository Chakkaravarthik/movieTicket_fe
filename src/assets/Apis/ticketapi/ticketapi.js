//const url = import.meta.env.VITE_LOCAL_URI;

const url = 'http://localhost:8000'




const createticket = async ({ticketdata}) => {
    try {
        let res = await fetch(`${url}/ticket`, {
            method: "post",
            body: JSON.stringify(ticketdata),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        }
        )

        return await res.json();
    } catch (e) {
        console.log(e);
    }

}

export default createticket;