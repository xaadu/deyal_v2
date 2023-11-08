import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import dpic from '../../assets/datepick.png';
import { getAuth } from 'firebase/auth';

const ServiceDetails = () => {
    const auth = getAuth();
    const { serviceId } = useParams();
    // const key = parseInt(serviceId);

    const [weekDates, setWeekDates] = useState([]);
    const [formMsz, setFormMsz] = useState("");

    const doctorInput = useRef(null);
    const appointmentTimeInput = useRef(null);

    const [serviceDetails, setServiceDetails] = useState({});
    useEffect(() => {
        fetch(`https://deyal-service.zayedabdullah.com/api/services/${serviceId}/`)
            .then(res => res.json())
            .then(data => setServiceDetails(data))
    }, [serviceId]);

    const [therapists, setTherapists] = useState([]);
    useEffect(() => {
        fetch(`https://deyal-service.zayedabdullah.com/api/therapists/?speciality_id=${serviceId}`)
            .then(res => res.json())
            .then(data => setTherapists(data));
    }, [serviceId]);
    // const person = therapists.find(({ id }) => id === key);

    const handleAppointment = (e) => {
        e.preventDefault();
        const data = {
            "appointment_time": e.target.appointmentTime.value,
            "full_name": e.target.fullName.value,
            "email": e.target.email.value,
            "current_age": e.target.currentAge.value,
            "phone_no": e.target.phoneNo.value,
            "gender": e.target.gender.value,
            "site_user": auth.currentUser.email,
        }
        fetch(
            `https://deyal-service.zayedabdullah.com/api/therapists/appointment-bookings/`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json;',
                    'Content-Type': 'application/json;',
                },
                body: JSON.stringify(data),
            }
        )
            .then(res => res.json())
            .then(data => {
                if (data?.id) {
                    setFormMsz("We'll let you know your date and time through email. Thank you.");
                    e.target.remove();
                } else { }
            });
    }
    const UpdateAppointmentTime = (e) => {
        setWeekDates([]);
        const therapist_id = doctorInput.current.value;
        const appointment_type = appointmentTimeInput.current.value;
        const qs = `therapist_id=${therapist_id}&appointment_type=${appointment_type}`
        if (therapist_id && appointment_type)
            fetch(
                `https://deyal-service.zayedabdullah.com/api/therapists/appointment-times/?${qs}`
            )
                .then(res => res.json())
                .then(data => setWeekDates(data));
    }

    return (
        <div className="container text-start">
            <section>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6">
                        <h1 className="mt-3 fw-bolder">{serviceDetails?.title}</h1>
                        {/* <p className="fs-5">
                            <span className="fw-bolder text-main">Therapist: </span>{person?.name}
                        </p> */}
                        <p className="text-second">{serviceDetails?.description}</p>
                        <p>
                            <span className="px-2 py-1 me-2 btn-main rounded-3">
                                <i className="fas fa-stopwatch"></i> Duration
                            </span>
                            <span className="fw-bolder text-second">{serviceDetails?.duration} Hours</span>
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img className="p-5 img-fluid" src={serviceDetails?.img} alt="service img" />
                    </div>
                </div>
                <div>
                    <h3 className="fw-bolder">What is <span className="text-main">{serviceDetails?.title}</span> ?</h3>
                    <p className="py-3">{serviceDetails?.what}</p>
                </div>
                <div>
                    <h3 className="fw-bolder">Common symtomps -</h3>
                    <ul className="p-3">
                        {
                            serviceDetails?.sym && serviceDetails?.sym.map(symp => (
                                <li key={symp} className="mx-5 list-unstyled fs-5">
                                    <i className="fas fa-caret-right text-main"></i> {symp}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3 className="fw-bolder">
                        How to cure <span className="text-main">{serviceDetails?.title}</span> ?
                    </h3>
                    <p className="py-3">{serviceDetails?.cure}</p>
                </div>
            </section>
            <section className="container">
                <h1 className="mt-5 text-center fw-bolder">Recomended <span className="text-main">Therapists</span></h1>
                {
                    therapists.map((therapist) => {
                        return (
                            <div className="row justify-content-center">
                                <div className="py-5 col-lg-8">
                                    <div className="row align-items-center">
                                        <div className="text-center col-sm-5">
                                            <img className="img-fluid rounded-circle" src={therapist?.img} alt="therapist" />
                                            <h4 className="mt-2 mb-0">{therapist?.name}</h4>
                                            <span className="text-second fw-bolder d-block">
                                                Speciality in {serviceDetails?.title}
                                            </span>
                                            <small className="text-main">{therapist?.expyear} Years+ Experience</small>
                                        </div>
                                        <div className="col-sm-7">
                                            <small>{therapist?.description}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <section>
                <div className="my-5 row align-items-center">
                    <h1 className="text-center fw-bolder">Book An <span className="text-main">Appointment</span></h1>
                    <p className="text-center text-second">Pick your suitable time and weekday. We will confirm your appoinment over the email.</p>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={dpic} alt="date pick" />
                    </div>
                    <div className="col-lg-6">
                        <p className='fw-bold text-success'>{formMsz}</p>
                        <form onSubmit={handleAppointment}>
                            <div className="form-body">
                                <div className="my-2 col-md-12">
                                    <select
                                        className="mt-3 form-select"
                                        required
                                        onChange={UpdateAppointmentTime}
                                        ref={doctorInput}
                                        name="therapist_id"
                                    >
                                        <option disabled selected value="">Choose Doctor</option>
                                        {
                                            therapists.map((therapist) => {
                                                return <option value={therapist?.id}>{therapist?.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="my-2 col-md-12">
                                    <select
                                        className="form-select"
                                        required
                                        onChange={UpdateAppointmentTime}
                                        ref={appointmentTimeInput}
                                        name="appointment_type"
                                    >
                                        <option disabled selected value="">Choose Appointment Type</option>
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                                <div className="my-2 col-md-12">
                                    <select className="form-select" name="appointmentTime" required>
                                        <option disabled selected value="">Pick A Week Date</option>
                                        {
                                            weekDates.map((weekDate) => {
                                                return <option value={weekDate?.id}>{weekDate?.details}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="my-2 col-md-12">
                                    <input className="form-control mt-3" type="text" name="fullName" placeholder="Your Full Name" required />
                                </div>
                                <div className="my-2 col-md-12">
                                    <input className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                                </div>
                                <div className="my-2 col-md-12">
                                    <input className="form-control" type="number" name="currentAge" placeholder="Your Current Age" required />
                                </div>
                                <div className="my-2 col-md-12">
                                    <input className="form-control" type="text" name="phoneNo" placeholder="Your Phone Number (Optional)" required />
                                </div>
                                <div className="my-2 col-md-12">
                                    <label className="mb-3 me-2 fw-bolder text-second" htmlFor="gender">Gender: </label>

                                    <input
                                        type="radio" className="btn-check"
                                        name="gender" id="male" autoComplete="off"
                                        value="male" required
                                    />
                                    <label className="btn btn-sm btn-outline-main me-3" htmlFor="male">Male</label>

                                    <input
                                        type="radio" className="btn-check"
                                        name="gender" id="female" autoComplete="off"
                                        value="female" required
                                    />
                                    <label className="btn btn-sm btn-outline-main me-3" htmlFor="female">Female</label>

                                    <input
                                        type="radio" className="btn-check"
                                        name="gender" id="other" autoComplete="off"
                                        value="other" required
                                    />
                                    <label className="btn btn-sm btn-outline-main" htmlFor="other">Other</label>
                                </div>

                                {/* <div className="form-check">
                                    <input className="form-check-input text-main" type="checkbox" defaultValue="" id="invalidCheck" required />
                                    <label className="form-check-label">I confirm that all data are correct</label>
                                </div> */}

                                <div className="mt-3 form-button">
                                    <button id="submit" type="submit" className="btn btn-main">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetails;
