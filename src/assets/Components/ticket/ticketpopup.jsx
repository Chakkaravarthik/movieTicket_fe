

const TicketPopUp = ({blockticketpoping}) => {

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
            <div style={popupOverlayStyle} onClick={()=>blockticketpoping()}>
                <Ticket />
            </div>
        </>
    )
}

export default TicketPopUp;

const Ticket = () => {

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <p><b>`Ticket Price is Rs ${ }` </b></p>
                <p className="fs-5">`No of Tickets ${ }`</p>
                <div className="d-flex align-items-center">
                </div>
            </div>
        </>
    )
}