import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import dpic from '../../datepick.png';

const ServiceDetails = () => {
    const {serviceId}= useParams();
    const key = parseInt(serviceId);

    const [serviceDetails, setServiceDetails] = useState([]);
    useEffect(() => {
        fetch('/services.json')
        .then(res => res.json())
        .then(data => setServiceDetails(data))
    },[]);
    const service = serviceDetails.find( ({ id }) => id === key );
    
    const [therapist, setTherapist] = useState([]);
    useEffect(() => {
        fetch('/therapist.json')
        .then(res => res.json())
        .then(data => setTherapist(data))
    },[]);
    const person = therapist.find( ({ id }) => id === key );

    return (
        <div className="container text-start">
            <section>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6">
                        <h1 className="mt-3 fw-bolder">{service?.title}</h1>
                        <p className="fs-5"><span className="fw-bolder text-main">Therapist: </span>{person?.name}</p>
                        <p className="text-second">{service?.description}</p>
                        <p><span className="px-2 py-1 me-2 btn-main rounded-3"><i className="fas fa-stopwatch"></i> Duration</span> <span className="fw-bolder text-second">{service?.duration} Hours</span></p>
                    </div>
                    <div className="col-md-5">
                        <img className="p-5 img-fluid" src={service?.img} alt="service img" />
                    </div>
                </div>
                <div>
                    <h3 className="fw-bolder">What is <span className="text-main">{service?.title}</span> ?</h3>
                    <p className="py-3">{service?.what}</p>
                </div>
                <div>
                    <h3 className="fw-bolder">Common symtomps -</h3>
                    <ul className="p-3">
                        {
                            service?.sym.map(symp=>(
                                <li key={symp}  className="mx-5 list-unstyled fs-5"><i className="fas fa-caret-right text-main"></i> {symp}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3 className="fw-bolder">How to cure <span className="text-main">{service?.title}</span> ?</h3>
                    <p className="py-3">{service?.cure}</p>
                </div>
            </section>
            <section className="container">
                <h1 className="mt-5 text-center fw-bolder">Recomended <span className="text-main">Therapist</span></h1>
                <div className="row justify-content-center">
                    <div className="py-5 col-lg-8">
                        <div className="row align-items-center">
                            <div className="text-center col-sm-5">
                                <img className="img-fluid rounded-circle" src={person?.img} alt="therapist" />
                                <h4 className="mt-2 mb-0">{person?.name}</h4>
                                <span className="text-second fw-bolder d-block">Speciality in{service?.title}</span>
                                <small className="text-main">{person?.expyear} Years+ Experience</small>
                            </div>
                            <div className="col-sm-7">
                                <small>{person?.description}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="my-5 row align-items-center">
                    <h1 className="text-center fw-bolder">Book An <span className="text-main">Appointment</span></h1>
                    <p className="text-center text-second">Pick your suitable time and weekday. We will confirm your appoinment over the email.</p>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={dpic} alt="date pick" />
                    </div>
                    <div className="col-lg-6">
                        <div className="form-body">
                            <div className="my-2 col-md-12">
                                <input className="form-control" type="text" name="name" placeholder="Your Full Name" required />
                            </div>
                            <div className="my-2 col-md-12">
                                <input className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                            </div>
                            <div className="my-2 col-md-12">
                                <input className="form-control" type="number" name="number" placeholder="Your Current Age" required />
                            </div>
                             <div className="my-2 col-md-12">
                                <select className="mt-3 form-select" required>
                                    <option disabled defaultValue="">Pick A Week Date</option>
                                    <option defaultValue="jweb">Satday</option>
                                    <option defaultValue="sweb">Monday</option>
                                    <option defaultValue="pmanager">Wednesday</option>
                                </select>
                            </div>

                            <div className="my-2 col-md-12">
                                <label className="p-1 mb-3 rounded-3 me-3 btn-main" htmlFor="pickTime"> Pick Your Suitable Time</label>
                                <input type="time" name="" id="pickTime" />
                            </div>

                            <div className="my-2 col-md-12">
                                <label className="mb-3 me-2 fw-bolder text-second" htmlFor="gender">Gender: </label>
                                
                                <input type="radio" className="btn-check" name="gender" id="male" autoComplete="off" required />
                                <label className="btn btn-sm btn-outline-main me-3" htmlFor="male">Male</label>

                                <input type="radio" className="btn-check" name="gender" id="female" autoComplete="off" required />
                                <label className="btn btn-sm btn-outline-main" htmlFor="female">Female</label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input text-main" type="checkbox" defaultValue="" id="invalidCheck" required />
                                <label className="form-check-label">I confirm that all data are correct</label>
                            </div>

                            <div className="mt-3 form-button">
                                <button id="submit" type="submit" className="btn btn-main">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetails;