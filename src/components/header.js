import React from "react";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./userDropdown";
import MenuDropdown from "./menuDropdown";
import { menuDropdown } from "./menuDropdown";
import { userDropdown } from "./userDropdown";
import Search from "./searchbar";
import "../App.css";

function Header() {
  return (
    <div className="header">
      <header className="fixed top-0 z-50 w-full border-b border-[#e6e0d8] bg-[#fffdf9]/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 w-[min(1180px,calc(100%-1rem))] items-center justify-between gap-4 px-2">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={menuDropdown}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e6e0d8] bg-white text-[#232323] md:hidden"
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Link to="/home" className="flex items-center gap-2">
              <img src={navlogo} className="h-11 w-11 rounded-md object-cover" alt="AC7 logo" />
              <div className="hidden leading-tight sm:block">
                <div className="text-sm font-black text-[#232323]">AC7</div>
                <div className="text-xs font-semibold text-[#697586]">Dazzle White</div>
              </div>
            </Link>
            <nav className="ml-3 hidden items-center gap-1 md:flex">
              <CustomLink to="/home">Home</CustomLink>
              <CustomLink to="/store">Store</CustomLink>
              <CustomLink to="/about">About</CustomLink>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden w-full max-w-sm md:block">
              <Search />
            </div>
            <Link
              to="/cart"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e6e0d8] bg-white text-[#232323] transition hover:border-[#b85c6b] hover:text-[#b85c6b]"
              aria-label="Cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <div className="relative flex items-center">
              <button
                onClick={userDropdown}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#232323] text-white transition hover:bg-black"
                aria-label="Account menu"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>
      <MenuDropdown />
    </div>
  );
}

function CustomLink({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-sm font-bold text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]"
    >
      {children}
    </Link>
  );
}

export default Header;
