import React, { useEffect } from 'react';
import { useState } from 'react';
import support from '../../support.png';
import ServiceList from '../ServiceList/ServiceList';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch('./services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    },[]);

    return (
        <div>
            <section className="container">
                <div className="my-3 row align-items-center">
                    <div className="col-lg-7">
                        <img className="img-fluid" src={support} alt="support img" />
                    </div>
                    <div className="col-lg-5 text-end">
                        <h5 className="">“Anything that’s human is mentionable, and anything that is mentionable can be more manageable. When we can talk about our feelings, they become less overwhelming, less upsetting, and less scary.”</h5>
                        <p className="text-main fw-bolder">– Fred Rogers</p>
                    </div>
                </div>
            </section>
            <section className="container mt-2 mb-5">
                <h1 className="mt-5 fw-bolder">Find therapy</h1>
                <p className="pb-3 col-12 text-second">We Are Here For You!</p>
                <div className="row g-4">
                    {
                        services.map((service) => (
                            <ServiceList key={service.id} service={service}></ServiceList>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Services;