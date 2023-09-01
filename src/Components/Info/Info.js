import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import doctor from '../../thr.png';
import help from '../../help.png';

const Info = () => {

    const [therapists, setTherapist] = useState([]);
    useEffect(() => {
        fetch('/therapist.json')
        .then(res => res.json())
        .then(data => setTherapist(data))
    },[]);

    return (
        <div>
            <section className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                        <h1>About Us</h1>
                        <p className="pb-4">Our vision is for a world with good mental health for all. Our mission is to help people understand, protect and sustain their mental health. Prevention is at the heart of what we do, because the best way to deal with a crisis is to prevent it from happening in the first place.</p>
                        <Link to="/career" className="btn btn-outline-main fw-bolder rounded-3 text-decoration-none">Learn More</Link>
                    </div>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={doctor} alt="doct" />
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="row align-items-center">
                    <div className="order-lg-2 col-lg-6 text-start">
                        <h1>Why we do it?</h1>
                        <p className="pb-4">Prevention is at the heart of what we do. Our knowledge, informed by rigorous research and practical based study, has been pioneering change for more than 70 years and we aren't afraid to challenge the status quo or tackle difficult or under researched issues.</p>
                        <Link to="/career" className="btn btn-outline-main fw-bolder rounded-3 text-decoration-none">Get Involved</Link>
                    </div>
                    <div className="order-lg-1 col-lg-6">
                        <img className="img-fluid" src={help} alt="help" />
                    </div>
                </div>
            </section>
            <section className="container mb-5">
                <h1 className="my-5 fw-bolder text-main">Meet Out Team</h1>
                <div className="row g-4">
                    {
                        therapists.map((therapist) => (
                            <div className="col-lg-4 col-md-6" key={therapist?.id}>
                                <img className="p-5 img-fluid rounded-circle" src={therapist?.img} alt="therapist" />
                                <h3>{therapist?.name}</h3>
                                <small><span className="fw-bolder">Experience: </span><span className="text-main">{therapist?.expyear} + Years</span></small>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Info;