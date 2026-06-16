import React from "react";
import Search from "./searchbar";
import { Link } from "react-router-dom";

function MenuDropdown() {
  return (
    <div id="menuButton" className="fixed top-16 z-40 w-full -translate-y-[120%] border-b border-[#e6e0d8] bg-[#fffdf9] px-3 py-3 shadow-lg transition duration-300 ease-in-out md:hidden">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-start gap-2">
          <CustomLink to="/home">Home</CustomLink>
          <CustomLink to="/store">Store</CustomLink>
          <CustomLink to="/about">About</CustomLink>
        </div>
        <Search />
      </div>
    </div>
  );
}

function CustomLink({ to, children }) {
  return (
    <Link to={to} className="rounded-md px-3 py-2 text-sm font-black text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]">
      {children}
    </Link>
  );
}

export function menuDropdown() {
  var element = document.getElementById("menuButton");
  if (element.classList.contains("-translate-y-[120%]")) {
    element.classList.remove("-translate-y-[120%]");
    element.classList.add("translate-y-0");
  } else {
    element.classList.remove("translate-y-0");
    element.classList.add("-translate-y-[120%]");
  }
}

export default MenuDropdown;
