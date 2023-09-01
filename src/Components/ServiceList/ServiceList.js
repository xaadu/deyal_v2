import React from 'react';
import { Link } from 'react-router-dom';

const ServiceList = (props) => {
    const {id, title, duration, img, description} =props.service;
    return (
        <div className="col-lg-6">
            <div className="shadow box rounded-20 h-100">
                <div className="row">
                    <div className="col-sm-6">
                        <img className="p-4 img-fluid" src={img} alt="service img" />
                    </div>
                    <div className="p-4 col-sm-6 d-flex flex-column justify-content-around text-start">
                        <h5 className="text-main">{title}</h5>
                        <small><span className="px-2 py-1 me-1 btn-main rounded-3"><i className="fas fa-stopwatch"></i> Duration</span> <span className="fw-bolder text-second">{duration} Hours</span></small>
                        <small className="py-3 text-second d-block ">{description}</small>
                        <Link className="me-auto btn btn-outline-main d-block" to={`/services/${id}`}>View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceList;