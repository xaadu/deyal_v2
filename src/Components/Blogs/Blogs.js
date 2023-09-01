import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogImg from '../../blog.png'

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('/blogs.json')
        .then(res => res.json())
        .then(data => setBlogs(data))
    },[]);
    return (
        <div>
            <section className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                        <h2>Follow Our Blogs</h2>
                        <p className="pb-4">This Mental Health Awareness Month, GoodTherapy seeks to emphasize that mental health is a human experience. Symptoms and circumstances of mental health concerns come in nearly unlimited variation. But they are, above all, a normal part of being alive. We must care for not only our bodies, but also our emotions and thoughts. We have gathered here a selection of quotes about mental health. These are encouraging words about overcoming obstacles, seeking help, and stopping shame.</p>
                        <Link to="/follow" className="btn btn-outline-main fw-bolder rounded-3 text-decoration-none">Follow Us Now</Link>
                    </div>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={blogImg} alt="blogImg" />
                    </div>
                </div>
            </section>
            <section className="container">
                <h1 className="my-5 fw-bolder text-main">Our Recent Blogs</h1>
                    <div className="row g-4">
                        {
                            blogs.map((blog) => (
                                <div className="col-12" key={blog?.id}>
                                    <div className="p-5 mb-2 shadow box rounded-20 text-start">
                                        <h3>{blog?.title}</h3>
                                        <span className="px-2 py-1 btn-main pe-auto rounded-3"><i className="far fa-calendar-alt"></i> {blog?.date}</span>
                                        <br />
                                        <small className="mt-4 d-block text-second">{blog?.des}</small>
                                        <Link className="mt-3 btn btn-outline-main" to="/blogpost">Read More</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            </section>
        </div>
    );
};

export default Blogs;