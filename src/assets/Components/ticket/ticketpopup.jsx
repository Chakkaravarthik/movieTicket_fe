import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { userlist } from "../../Apis/authapi/login";


const TicketPopUp = ({ blockticketpoping }) => {


    const [customerdata, setcustomerdata] = useState('');
    const [ticketarr, setticketarr] = useState([]);



    useEffect(() => {
        const updateAdminStatus = async () => {
            const userToken = localStorage.getItem('UserToken');

            const response = await userlist();

            if (response && userToken) {

                const userDetails = await jwtDecode(userToken);
                setcustomerdata(userDetails);

                response.userlist.forEach((e) => {
                    if(e.id === userDetails.id){
                        setticketarr(e.tickets.flat());
                    }
                });
                
            }else {
                setcustomerdata('');
            }
            

  
        };

        


        window.addEventListener('storage', updateAdminStatus);
        updateAdminStatus(); // Run initially

        return () => window.removeEventListener('storage', updateAdminStatus);

    }, [])


    const popupOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(7, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };



    return (
        <>
            <div style={popupOverlayStyle} onClick={() => blockticketpoping()}>
                <div className="card" style={{ width: '60vw', height: '60vh', borderColor: 'red', borderWidth: '2px' }} onClick={(e) => e.stopPropagation()} >
                    <div className="card-body overflow-y-auto">
                        <p className="text-center fs-3 fw-bold">Tickets History</p>
                        {customerdata && ticketarr.map((ele) => {
                            return (
                                <>
                                    <Ticket ele={ele} key={ele.id} />
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketPopUp;

const Ticket = ({ ele }) => {

    console.log(ele);


    return (
        <>
            <div className="card-body shadow-lg d-flex flex-column align-items-center justify-content-center border border-danger" >
                <p className="fs-4 fw-bold">{`Ticket No : ${ele.no_of_tickets}`}</p>
                <p className="fs-4 fw-bold">{`Movie Name : ${ele.movie_name}`}</p>
                <p className="fs-4">{`No of Tickets : ${ele.no_of_tickets}`}</p>
                <p className="fs-4">{`Ticket Rate : ${ele.ticketrate}`}</p>
            </div>
        </>
    )
}