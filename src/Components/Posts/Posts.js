import React, { useEffect, useState } from 'react';
import blogImg from '../../assets/blog.png';
import useAuth from '../../hooks/useAuth';

const Posts = () => {

    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            this.getFullYear(),
        ].join('-');
    };

    const { user } = useAuth();

    const [formMsz, setFormMsz] = useState("");

    const [pageNum, setPageNum] = useState(1);

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`https://deyal-service.zayedabdullah.com/api/posts/?page=${pageNum}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data?.results);
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

    const handlePostSubmit = (e) => {
        e.preventDefault();

        const data = {
            details: e.target.details.value,
            site_user: user?.email,
        }
        fetch(
            `https://deyal-service.zayedabdullah.com/api/posts/`,
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
                    setFormMsz("Post Success!");
                    e.target.reset();
                    setPageNum(1);
                } else { }
            });

    }

    return (
        <div>
            <section className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                        <h2>Post Your <span className="text-main">Thoughts</span></h2>
                        <p className="pb-2">
                            Express what you're feeling anonymously.
                            {/* You can post once in every 5 minutes. */}
                        </p>
                        <p className='fw-bold'>{formMsz}</p>
                        <form onSubmit={handlePostSubmit}>
                            <div className="form-group">
                                <textarea
                                    name="details"
                                    className="form-control"
                                    id="post_details"
                                    rows="10"
                                    placeholder="Express your thoughts"
                                ></textarea>
                            </div>
                            <div className="form-group mt-2">
                                <button
                                    className="btn btn-outline-main px-5 fw-bolder rounded-3 text-decoration-none" type="submit"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={blogImg} alt="blogImg" />
                    </div>
                </div>
            </section>
            <section className="container">
                <h1 className="my-5 fw-bolder text-center">Recent <span className="text-main">Posts</span></h1>
                <div className="row g-4">
                    {
                        posts.map((blog) => (
                            <div className="col-12 mx-auto" style={{ maxWidth: "700px" }} key={blog?.id}>
                                <div className="p-5 mb-2 shadow box rounded-20 text-start">
                                    <h3>Anonymous User</h3>
                                    <span className="px-2 py-1 btn-main pe-auto rounded-3">
                                        <i className="far fa-calendar-alt"></i> &nbsp;
                                        {(new Date(blog?.created_at)).yyyymmdd()}
                                    </span>
                                    <br />
                                    <small className="mt-4 d-block text-second">{blog?.details}</small>
                                    {/* <Link className="mt-3 btn btn-outline-main" to="/blogpost">Read More</Link> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="pagination">
                    <div className="btngrp mx-auto">
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Posts;
