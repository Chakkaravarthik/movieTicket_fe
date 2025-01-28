import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usersignup from '../../Apis/authapi/registerapi.js';



const RegisterForm = ( {blockregisterpopup}) => {



    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
    });

    const [registerationsuccess, setregisterationsuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const res = await usersignup(formData);
        if(res.code==1){
            setregisterationsuccess(true);
            setTimeout(() => {
                navigate('/login');
        },4000)
        };
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
        <div style={popupOverlayStyle}>
            <div className="container d-flex justify-content-center align-items-center min-vh-100" onClick={()=>blockregisterpopup()}>
                <div className="card" style={{ width: '24rem', borderColor: 'red', borderWidth: '2px' }} onClick={(e) => e.stopPropagation()}>
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4" style={{ color: 'red' }}>Register</h5>
                        {registerationsuccess ? (
                            <div className="alert alert-success" role="alert">
                                Registration successful!
                            </div>
                        ) : (
                            <form onChange={handleChange}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input name='name' type="text" className="form-control" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input name='email' type="email" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                    <input name='phonenumber' type="phonenumber" className="form-control" id="phonenumber" placeholder="Enter your Phone Number" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input name='password' type="password" className="form-control" id="password" placeholder="Create a password" />
                                </div>
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100 mb-3" style={{ backgroundColor: 'red', borderColor: 'orange' }}>
                                    Register
                                </button>
                            </form>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;