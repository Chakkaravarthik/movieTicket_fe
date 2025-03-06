import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode';
import TicketPopUp from "../ticket/ticketpopup";




function BarHeading( {handleLogout}) {

    const [customerdata, setcustomerdata] = useState('');
    const [ticketpopup, setticketpopup]= useState(false);

    useEffect(() => {
        const updateAdminStatus = () => {
              const userToken = localStorage.getItem('UserToken');
              if (userToken) {
                const userDetails = jwtDecode(userToken);
                setcustomerdata(userDetails);
              } else {
                setcustomerdata('');
              }
            };
        
            window.addEventListener('storage', updateAdminStatus);
            updateAdminStatus(); // Run initially
        
            return () => window.removeEventListener('storage', updateAdminStatus);
        
    }, [])

  

    const ticketpoping =()=>{
        setticketpopup(true);
    }

    const blockticketpoping =()=>{
        setticketpopup(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Companylogo />
                {/* <MovieSearch /> */}
                <CustomerLoginIcon customerdata={customerdata} handleLogout={handleLogout} ticketpoping={ticketpoping} />
                {ticketpopup ? <TicketPopUp blockticketpoping={blockticketpoping} /> : <></>}
            </nav>
            
        </>
    )
}

export default BarHeading;


const MovieSearch = () => {

    const [MovieandTheater, setMovieandTheater] = useState("Movie")
    const [placeHolder, setplaceHolder] = useState("movie name");

    function setMovie() {
        setMovieandTheater('Movie');
        setplaceHolder('movie name')
    }

    function setTheater() {
        setMovieandTheater('Theater')
        setplaceHolder('theater name')
    }

    return (
        <>
            <div className="container-fluid d-flex  p-2">
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle p-2 me-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {MovieandTheater}
                    </a>
                    <ul className="dropdown-menu" style={{textAlign:"center",minWidth:"0"}} aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item " style={{cursor:'pointer'}} onClick={() => setMovie()}>Movie</a></li>
                        <li><a className="dropdown-item" style={{cursor:'pointer'}} onClick={() => setTheater()}>Theater</a></li>
                    </ul>

                </div>
                <input type="text" class="form-control" placeholder={placeHolder}></input>
                <div className="container-fluid d-flex flex-row p-2">
                    <a class="btn btn-danger  p-2 ms-4">
                        Search
                    </a>
                </div>
            </div>
        </>
    )
}


const Companylogo = () => {

    return (
        <div className="container-fluid d-flex flex-row p-2">
            <a class="btn btn-danger  p-2 ms-4">
                MoviesNoww
            </a>
        </div>
    )
}


const CustomerLoginIcon = ({customerdata , handleLogout , ticketpoping}) => {



    return (
        <div className="container-fluid d-flex flex-row-reverse p-2">
            <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle p-2 me-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {customerdata.name}
                </a>
                <ul class="dropdown-menu" style={{textAlign:"center",minWidth:"0"}} aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" style={{cursor:'pointer'}} onClick={()=>ticketpoping()}>Tickets</a></li>
                    <li><a class="dropdown-item"style={{cursor:'pointer'}}  onClick={()=>handleLogout()}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}