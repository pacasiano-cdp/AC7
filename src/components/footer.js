import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="border-t border-[#e6e0d8] bg-[#232323] text-white">
      <div className="content-wrap grid gap-8 py-10 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <div className="text-xl font-black">AC7 Dazzle White</div>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
            Beauty essentials, daily skincare, and store support in one place.
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <div className="font-bold text-white">Contact</div>
          <div><FontAwesomeIcon icon={faPhone} /> 09164770793</div>
          <div><FontAwesomeIcon icon={faEnvelope} /> Ac7copr95@gmail.com</div>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <div className="font-bold text-white">Social</div>
          <div className="text-2xl"><FontAwesomeIcon icon={faFacebook} /></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
