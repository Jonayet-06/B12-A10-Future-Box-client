import React from "react";
import error404 from "../../assets/error-404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto text-center">
          <img
            className="mx-auto pt-[80px] pb-[56px]"
            src={error404}
            alt="page not found"
          />
          <h1 className="font-bold text-[48px]">Oops, page not found!</h1>
          <p className="py-[16px]">
            The page you are looking for is not available.
          </p>

          <Link to="/">
            <div className="text-center pt-[40px] pb-[80px]">
              <button className="bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white font-semibold text-[16px] rounded-md">
                Go Back!
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
