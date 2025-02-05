import { useState } from "react";
import RegisterForm from "./register.jsx";
import { userlogin } from "../../Apis/authapi/login.js";
import { useNavigate } from "react-router-dom";



const LoginComponent = ({setIsAuthenticated , loadspinner, stopspinner}) => {

    const [LoginPopUpclicked, setLoginPopUpclicked] = useState(false);
    const [RegisterPopUpclicked, setRegisterPopUpclicked] = useState(false);
    const [contentshow, setcontentshow] = useState(false);


    const clickedpopup = () => {
        setLoginPopUpclicked(true);
        setcontentshow(true);
    }

    const blockpopup = () => {
        setLoginPopUpclicked(false);
        setcontentshow(false);
    }

    const clickedRegisterpopup = () =>{
        setRegisterPopUpclicked(true);
        setcontentshow(true);
    }

    const blockregisterpopup = () =>{
        setRegisterPopUpclicked(false);
        setcontentshow(false);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center " style={{ width: '100vw', height: '100vh', }} >
                <div style={{ width: '90vw', height: '90vh', borderRadius: '10px' }} className="border border-black shadow-lg d-flex align-items-center justify-content-center">
                    {contentshow ? <></> : <LoginContent clickedpopup={clickedpopup}  clickedRegisterpopup={clickedRegisterpopup }/>}
                </div>
                {LoginPopUpclicked ? <LoginPage blockpopup={blockpopup} setIsAuthenticated={setIsAuthenticated} loadspinner={loadspinner}  stopspinner={stopspinner}/> : <></>}
                {RegisterPopUpclicked ? <RegisterForm blockregisterpopup={blockregisterpopup} /> : <></>} 
            </div>
        </>
    )
}

export default LoginComponent;

const LoginPage = ({ blockpopup , setIsAuthenticated , loadspinner, stopspinner}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await userlogin(formData);
        if (data.code === 1) {
          localStorage.setItem("IsAuthenticated", "true");
          localStorage.setItem("UserToken",data.userwebtoken)
          setIsAuthenticated(true);
          stopspinner();
          navigate('/home'); 
          
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const popupOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(112, 107, 107, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };


    return (
        <>
            <div style={popupOverlayStyle} >
                <div className="container d-flex justify-content-center align-items-center min-vh-95" onClick={() => blockpopup()}>
                    <div className="card" style={{ width: '24rem', borderColor: 'red', borderWidth: '2px' }} onClick={(e) => e.stopPropagation()} >
                        <div className="card-body">
                            {/* <button style={{ position: 'relative', left: '10px', top: '10px' }} onClick={()=>blockpopup()}>X</button> */}
                            <div className="text-center mb-4">
                                <div style={{ width: '200px', height: '100px', backgroundColor: 'white', margin: '0 auto' }}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9xMAd-PgVcWAQTQLxBcSUexZYm_q5-foLUpUuVjEWcWDzdKf3RJisrhiZ6il0kZz1ps&usqp=CAU"
                                        alt="Image Description"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        name='email'
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        name='password'
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    style={{ backgroundColor: 'red', borderColor: 'red' }}
                                    onClick={()=>loadspinner()}
                                >
                                    Login
                                </button>
                                {/* <div className="btn btn-link w-100" style={{ border: 'grey', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                    <a href='/register'>Register</a><a href='/forgetpassword'>Forget Password</a>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const LoginContent = ({ clickedpopup, clickedRegisterpopup }) => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: '50vw' }}>
            <h3 className="text-bg-danger">Movie Ticket Booking Application</h3>
            <p className="lh-lg fw-medium fs-4 text-center">
                The Movie Ticket Booking App is a user-friendly platform for browsing and booking movie tickets. It features a secure payment gateway for hassle-free transactions and a powerful search functionality to quickly find movies by name, genre, or showtime. Upon booking, users receive automated email notifications with their ticket details for convenience. The app ensures a seamless and reliable experience for movie enthusiasts, combining ease of use with secure payment and notification features.
            </p>
            <div>
                <button className="btn btn-primary fs-4" onClick={() => clickedpopup()}>Login</button>
                <button className="btn btn-primary fs-4 m-2" onClick={() => clickedRegisterpopup()}>Register</button>
            </div>
        </div>
    )
}