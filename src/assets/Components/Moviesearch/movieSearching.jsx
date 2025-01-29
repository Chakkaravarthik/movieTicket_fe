import { useEffect, useState } from "react";
import { movieget } from "../../Apis/movieapi/movieapi.js";
import Checkout from "../checkout_page/checkout.jsx";
import { jwtDecode } from "jwt-decode";


const MovieList = () => {

    const [moviedatas, setmoviedatas] = useState([]);

    const [moviePopUp, setmoviePopUp] = useState(null);

    const [customerobj, setcustomerobj] = useState({});

    const popmovie = (data) => {
        setmoviePopUp(data);
    }

    const closepop = () => {
        setmoviePopUp(null);
    }

    //console.log(moviedatas);

    const loadMovie = async () => {
        let data = await movieget();
        if (data.code == 1) {
            setmoviedatas(data.movies);
        }
    }

    useEffect(() => {
        loadMovie();

        const updateAdminStatus = async () => {
            const userToken = localStorage.getItem('UserToken');
            if (userToken) {
                const userDetails = await jwtDecode(userToken);
                setcustomerobj(userDetails);

            } else {
                setcustomerobj({});
            }
        };

        updateAdminStatus();


    }, [])

    return (
        <>
            < MovieCards moviedatas={moviedatas} popmovie={popmovie} />
            {moviePopUp && <MoviePop moviePopUp={moviePopUp} closepop={closepop} customerobj={customerobj} />}
        </>
    )
};

export default MovieList;


const MovieCards = ({ moviedatas, popmovie }) => {

    return (
        <>
            <div className="d-flex  flex-wrap justify-content-center">
                {moviedatas.map((moviedata) => {
                    return <MovieCard moviedata={moviedata} key={moviedata.id} popmovie={popmovie} />
                })}
            </div>
        </>
    )
}


const MovieCard = ({ moviedata, popmovie }) => {

    //console.log(moviedata)

    return (
        <>
            <div className="card m-2 shadow-lg" onClick={() => popmovie(moviedata)}>
                <img src={moviedata.movieimg} className="card-img-top m-2" alt="..." style={{ width: "18rem", height: '18rem' }}></img>
                <div className="card-body " style={{ textAlign: "center" }}>
                    <h5 className="card-title">{moviedata.moviename}</h5>
                </div>
            </div>
        </>
    )
}



const MoviePop = ({ moviePopUp, closepop, customerobj }) => {

    const [count, setCount] = useState(0);
    const [mountrazorpay, setmountrazorpay] = useState(false);
    const [payableAmount, setpayableamount] = useState(0);

    const mountingrazorpay = () => {
        setmountrazorpay(true);
    }

    const incrementCount = () => setCount(count + 1);
    const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

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



    useEffect(() => {
        setpayableamount(count * moviePopUp.movieticketprice);
    }, [count, moviePopUp]);
    

    return (
        <div style={popupOverlayStyle}>
            <div
                className="card m-3 position-relative d-flex flex-row align-items-center justify-content-center"
                style={{
                    minWidth: "50vw",
                    minHeight: "50vh",
                    backgroundColor: "white",
                    maxWidth: "75vw",
                    maxHeight: "75vh",
                }}
            >
                {/* Close button */}
                <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-2"
                    onClick={closepop}
                    aria-label="Close"
                ></button>

                {/* Movie Image */}
                <div className="me-3">
                    <img
                        src={moviePopUp.movieimg}
                        className="img-fluid rounded-start p-2"
                        alt="Movie Poster"
                        style={{ maxHeight: "60vh", maxWidth: "60vw" }}
                    />
                </div>

                {/* Ticket Counter Section */}
                <div className="d-flex flex-column align-items-center card-body shadow-sm">
                    <p className="fs-4 "><b>{`Movie Name : ${moviePopUp.moviename}`}</b></p>
                    <p className="fs-4"><b>{`Ticket Price Rs : ${moviePopUp.movieticketprice}`}</b></p>
                    <p className="fs-5"><b>No of Tickets</b></p>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-light m-3 mx-4"
                            onClick={decrementCount}
                            disabled={count === 0}
                        >
                            -
                        </button>
                        <span className="fs-4 mx-4">{count}</span>
                        <button className="btn btn-light m-2 mx-4" onClick={incrementCount}>
                            +
                        </button>
                    </div>
                    <p className="fs-5 m-2 mx-4">
                        <b>Amount Payable (Rs) : {count * moviePopUp.movieticketprice}</b>
                    </p>
                    <button className="btn btn-primary fs-5 m-2 mx-4" onClick={mountingrazorpay}>
                        Proceed To Pay
                    </button>
                    {mountrazorpay && payableAmount > 0 && <Checkout amount={payableAmount} customerobj={customerobj} />}
                </div>
            </div>
        </div>
    );
};


