import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo.png';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img className="pb-1 me-2" width="20" src={logo} alt="deyal logo" />
                        <span className="fw-bolder text-main">deyal</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-5 mb-lg-0">
                            <li className="nav-item me-2">
                                <p className="nav-link fw-bolder">
                                    <span>Hi{" "}
                                        {user?.email &&
                                            (user?.displayName ?
                                                user.displayName.slice(0, user.displayName.indexOf(" "))
                                                :
                                                user.email.slice(0, user.email.indexOf("@"))
                                            )
                                        },
                                    </span>
                                </p>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/services">Find therapy</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/info">Info</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            <li className="me-5"></li>

                            {user?.email ? (
                                <li className="nav-item" onClick={logOut}>
                                    <Link className="btn btn-outline-main fw-bolder" to="/join">
                                        Sign Out <i className="fas fa-sign-in-alt"></i>
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="btn btn-outline-main fw-bolder" to="/join">
                                        Sign In <i className="fas fa-sign-in-alt"></i>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
