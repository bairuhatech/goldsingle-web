import React from "react";

function SubscribeNewsletter() {
  return (
    <div className="mt-5 mb-3">
      <div className="container-fluid bg-white">
        <div className="container">
          <div className="row py-2">
            <div className="col-12 ">
              <p className="text-center fs-3 pb-3">
                <b>Subscribe to our newsletter</b>
              </p>
              <form id="newsletterFormFooter">
                <div className="row">
                  <div className="col-12 col-md-10">
                    <input
                      type="email"
                      className="form-control h-100"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="col-12 col-md-2">
                    <button
                      className="btn btn-primary h-100 w-100 mt-2 mt-md-0"
                      type="submit"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeNewsletter;
