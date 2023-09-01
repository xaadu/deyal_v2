import React from 'react';
import { Link } from 'react-router-dom';

const Service = (props) => {
    const {title, img, description} =props.service;
    return (
        <div className="col-lg-6">
            <div className="shadow box rounded-20 h-100">
                <div className="row">
                    <div className="col-sm-6">
                        <img className="p-4 img-fluid" src={img} alt="service img" />
                    </div>
                    <div className="p-4 col-sm-6 d-flex flex-column justify-content-around">
                        <h5 className="text-main text-start">{title}</h5>
                        <small className="text-second d-block text-start">{description}</small>
                        <Link className="me-auto btn btn-main d-block" to="/services">See More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;