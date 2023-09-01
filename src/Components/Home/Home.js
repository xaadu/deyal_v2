import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import showImg from '../../showcase-img.png';
import home1 from '../../home01.png';
import home2 from '../../home02.png';
import home3 from '../../home03.png';
import Service from '../Service/Service';

const Home = () => {

    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch('./services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    },[]);

    return (
        <div className="container">
            <section className="my-3 row justify-content-between align-items-center">
                <div className="col-md-5 text-start">
                    <p className="fw-bolder text-main">HEALING THERAPY</p>
                    <h1 className="fw-bolder">Make Your Own <span className="text-main">Mental Health</span> A Priority.</h1>
                    <p className="text-second">Choose your own therapist...</p>
                    <Link className="px-4 my-4 btn btn-main fs-5 rounded-pill" to="/services">Get Started</Link>
                </div>
                <div className="col-md-7">
                    <img className="img-fluid" src={showImg} alt="showcase img" />
                </div>
            </section>
            <section>
                <div className="my-3 row justify-content-between align-items-center">
                    <div className="col-md-6 order-md-2 text-start">
                        <h1 className="mb-3 fw-bolder">What Is Mental Health?</h1>
                        <p className="text-second"><span className="text-main">Mental health</span> includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img className="img-fluid" src={home2} alt="about img 01" />
                    </div>
                </div>
                <div className="my-3 row justify-content-between align-items-center">
                    <div className="col-md-6 order-md-1 text-start">
                        <h1 className="mb-3 fw-bolder">Why Should We Care?</h1>
                        <p className="text-second"><span className="text-main">Mental illness</span>  often has a 'ripple effect' on families, creating tension, uncertainty, stress and sometimes significant changes in how people live their lives. Different family members are likely to be affected in different ways. It's normal to feel a whole range of emotions, such as guilt, fear, anger and sadness.</p>
                    </div>
                    <div className="col-md-5 order-md-2">
                        <img className="img-fluid" src={home1} alt="about img 02" />
                    </div>
                </div>
            </section>
            <section className="py-5 row g-4">
                <h1 className="my-5 col-12 fw-bolder">Find Your Therapy</h1>
                {
                    services.map((service) => (
                        <Service key={service.id} service={service}></Service>
                    ))
                }
            </section>
            <section className="container">
                <div className="my-3 row align-items-center">
                    <h1 className="my-2 col-12 fw-bolder">Join Our Group <span className="text-main">Therapy</span> Sessions</h1>
                    <div className="col-lg-7">
                        <img className="img-fluid" src={home3} alt="support img" />
                    </div>
                    <div className="col-lg-5">
                        <h5 className="text-center">“Some of the most comforting words in the universe are ‘me too.’ That moment when you find out that your struggle is also someone else’s struggle, that you’re not alone, and that others have been down the same road.”</h5>
                        <Link className="mx-auto mt-3 w-50 d-block btn btn-main rounded-pill" to="/group-therapy">Join Now</Link>
                    </div>
                </div>
            </section>
            <section></section>
        </div>
    );
};

export default Home;