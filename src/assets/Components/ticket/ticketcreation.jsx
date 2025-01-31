


const Ticketcreation = ({ele}) => {

    console.log({ele})


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
            <div style={popupOverlayStyle} >
                <div className="card d-flex flex-row align-items-center justify-content-center border border-success shadow-lg p-4" style={{width:"50vw",height:"50vh"}}>
                    <div className="card-body  d-flex flex-column align-items-center justify-content-center " >
                        <p className="fs-4 fw-bold">{`Movie Name : ${ele.ticket.movie_name || ""}`}</p>
                        <p className="fs-4">{`No of Tickets : ${ele.ticket.no_of_tickets || ""}`}</p>
                        <p className="fs-4">{`Ticket Rate : ${ele.ticket.ticketrate || ""}`}</p>
                        <p className="fs-4 p-1 border border-success bg-success">{`Ticket Booked`}</p>
                    </div>
                    <div>
                        <img src={ele.movieimg} style={{width:"250px",height:"250px"} }></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticketcreation;