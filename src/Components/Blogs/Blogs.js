import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogImg from '../../assets/blog.png'

const Blogs = () => {

    const [pageNum, setPageNum] = useState(1);

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch(`https://deyal-service.zayedabdullah.com/api/api/api/api/api/blogs/?page=${pageNum}`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data?.results);
                setNextPage(data?.next);
                setPrevPage(data?.previous);
            });
    }, [pageNum]);

    const handleNextPage = (e) => {
        if (nextPage) setPageNum(old_value => old_value + 1)
    }
    const handlePrevPage = (e) => {
        if (prevPage) setPageNum(old_value => old_value - 1)
    }

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
                <h1 className="my-5 fw-bolder text-main">Our Blogs</h1>
                <div className="row g-4">
                    {
                        blogs.map((blog) => (
                            <div className="col-12" key={blog?.id}>
                                <div className="p-5 mb-2 shadow box rounded-20 text-start">
                                    <h3>{blog?.title}</h3>
                                    <span className="px-2 py-1 btn-main pe-auto rounded-3">
                                        <i className="far fa-calendar-alt"></i> {blog?.date}
                                    </span>
                                    <br />
                                    <small className="mt-4 d-block text-second">{blog?.des}</small>
                                    {/* <Link className="mt-3 btn btn-outline-main" to="/blogpost">Read More</Link> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button
                    className={`my-3 btn btn-outline-main ${!prevPage && "disabled"}`}
                    onClick={handlePrevPage}
                >
                    Previous
                </button>
                <button className="my-3 mx-2 btn btn-outline-main disabled" disabled>{pageNum}</button>
                <button
                    className={`my-3 btn btn-outline-main ${!nextPage && "disabled"}`}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </section>
        </div>
    );
};

export default Blogs;
