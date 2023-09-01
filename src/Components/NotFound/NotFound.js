import React from 'react';
import { Link } from 'react-router-dom';
import nfImg from '../../404.png';
const NotFound = () => {
    return (
        <div className="container">
            <div className="pb-5 mt-5 row align-items-center justify-content-around">
                <div className="col-lg-4 col-md-5 text-start">
                    <h2 className="text-main fw-bolder">Hmmm...</h2>
                    <h4 className="text-main">Looks like something went wrong.</h4>
                    <p className="text-second">Would you like to go back?</p>
                    <Link to="/home" className="my-3 btn btn-main fw-bolder">Go Back to Home</Link>
                </div>
                <div className="col-lg-6 col-md-7">
                    <img className="w-100" src={nfImg} alt="Not Found" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;