import React, { useState, useEffect } from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import bodypic from "../imgs/bodypic.png";
import { Link } from "react-router-dom";

function Landing() {
  const usernameCookie = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
  const [isCustomerRegistered, SetIsCustomerRegistered] = useState(true);

  useEffect(() => {
    if (usernameCookie) {
      fetch(`/api/customer/username/${usernameCookie}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((response) => {
          SetIsCustomerRegistered(response !== "wala");
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [usernameCookie]);

  if (!isCustomerRegistered) {
    window.location.href = "/AC7/sign-up/account-information";
  }

  const [incorrectUsername, setIncorrectUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  function handleChange(event) {
    setUserInfo({
      ...userInfo,
      [event.target.id]: event.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Correct") {
          window.location.href = "/AC7/";
        } else if (data.message === "Incorrect") {
          setInvalidPassword(true);
          setTimeout(() => setInvalidPassword(false), 3000);
        } else if (data.message === "User not found") {
          setIncorrectUsername(true);
          setTimeout(() => setIncorrectUsername(false), 3000);
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec]">
      <section className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <img src={bodypic} alt="AC7 storefront" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#232323]/70 to-transparent" />
          <div className="absolute bottom-10 left-10 max-w-lg text-white">
            <div className="text-sm font-black uppercase tracking-widest text-white/75">AC7 Dazzle White</div>
            <div className="mt-3 text-5xl font-black leading-tight">Beauty retail, inventory, and orders in one app.</div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            <Link to="/AC7/" className="mb-6 flex items-center gap-3">
              <img className="h-12 w-12 rounded-md object-cover" src={navlogo} alt="AC7 logo" />
              <div>
                <div className="text-xl font-black text-[#232323]">AC7 Dazzle White</div>
                <div className="text-sm font-semibold text-[#697586]">Sign in to continue</div>
              </div>
            </Link>

            <div className="surface p-6 sm:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-[#232323]">Login</h1>
                <p className="mt-1 text-sm text-[#697586]">Use your customer or employee account.</p>
              </div>

              <form className="space-y-5" onSubmit={submitForm}>
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-bold text-[#232323]">Username</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    id="username"
                    className={`block w-full rounded-md p-3 text-sm ${incorrectUsername ? "border-red-500" : ""}`}
                    placeholder="Enter username"
                  />
                  {incorrectUsername && <span className="mt-1 block text-xs font-semibold text-red-500">Invalid username</span>}
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-bold text-[#232323]">Password</label>
                  <input
                    type="password"
                    onChange={handleChange}
                    id="password"
                    placeholder="Enter password"
                    className={`block w-full rounded-md p-3 text-sm ${invalidPassword ? "border-red-500" : ""}`}
                  />
                  {invalidPassword && <span className="mt-1 block text-xs font-semibold text-red-500">Invalid password</span>}
                </div>

                <button type="submit" className={`${incorrectUsername || invalidPassword ? "animate-wiggle" : ""} btn-primary w-full`}>
                  Login
                </button>

                <p className="text-center text-sm text-[#697586]">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="font-black text-[#b85c6b]">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
