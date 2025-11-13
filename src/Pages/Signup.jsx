import React, { useState } from "react";
import { Link } from "react-router";

const SignUp = () => {
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordLength = /^.{6,}$/;
    if (!passwordLength.test(password)) {
      setPasswordError("Password should be at least 6 characters.");
      return;
    }
    const passwordUpperCase = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    if (!passwordUpperCase.test(password)) {
      setPasswordError("Password should be at least one Uppercase letter");
      return;
    }
    const passwordLowerCase = /^(?=.*[a-z]).*$/;
    if (!passwordLowerCase.test(password)) {
      setPasswordError("Password should be at least one Lowercase letter");
      return;
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Name"
            />

            <label className="label">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
            />
            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />
            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
              Register
            </button>
          </fieldset>
        </form>

        {/* Google */}
        <button className="btn bg-white rounded-full text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="text-center">
          Already have an account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
