import React from "react";
import { Link } from "react-router-dom";
import contact from "../../contatct.png";

const Contact = () => {
  return (
    <div className="container text-start">
      <h1 className="mt-3 text-center fw-bolder">Con<span className="border-2 border-bottom border-main">nect With</span> Us</h1>
      <div className="my-5 row">
        <div className="col-lg-6 align-items-center">
          <div>
            <img className="img-fluid" src={contact} alt="contact" />
          </div>
        </div>
        <div className="col-lg-6">
            <form className="p-3 rounded shadow row g-3">
                <div className="my-2 col-md-12">
                    <input className="form-control" type="text" name="name" placeholder="Your Email" required />
                </div>
                <div className="my-2 col-md-8">
                    <input className="form-control" type="email" name="email" placeholder="Your Full Name" required />
                </div>
                <div className="my-2 col-md-4">
                    <input className="form-control" type="number" name="age" placeholder="Your Age" required />
                </div>
                <div>
                    <textarea className="p-3 w-100" name="message" id="" rows="3" placeholder="Please Give Us Feedback If You Have Any..."></textarea>
                </div>
                <div className="col-12">
                    <label htmlFor="inputState" className="form-label">
                        Address
                    </label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Building No, 12 Street, Ward No..." />
                </div>
                <div className="col-md-6">
                <input type="text" className="form-control" id="inputCity" placeholder="Inter City" />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" id="inputCity" placeholder="State" />
                </div>
                <div className="col-md-2">
                    <input type="text" className="form-control" id="inputZip" placeholder="Zip" />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Send Me News Letter
                        </label>
                    </div>
                </div>
                <div className="col-12">
                <Link to="/contactusemail" type="submit" className="px-5 btn btn-outline-main fw-bolder">Submit</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;