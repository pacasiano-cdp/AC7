import React from "react";
import ItemSlider from "../components/itemSlider";
import bodypic from "../imgs/bodypic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShieldAlt, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="min-h-screen pt-16">
      <section className="relative min-h-[34rem] overflow-hidden">
        <img src={bodypic} className="absolute inset-0 h-full w-full object-cover" alt="AC7 skincare products" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ef]/95 via-[#fff8ef]/70 to-transparent" />
        <div className="content-wrap relative flex min-h-[34rem] items-center py-16">
          <div className="max-w-xl">
            <div className="eyebrow">AC7 Dazzle White</div>
            <h1 className="mt-3 text-4xl font-black leading-tight text-[#232323] md:text-5xl">
              Everyday beauty care with a polished shop experience.
            </h1>
            <p className="section-copy mt-4">
              Browse body care and skincare products, add essentials to your cart, and check out with a cleaner, faster storefront.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/store" className="btn-primary">
                Shop Now <FontAwesomeIcon className="ml-2 text-sm" icon={faArrowRight} />
              </Link>
              <Link to="/about" className="btn-secondary">About AC7</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap relative z-10 -mt-16 grid gap-3 pb-10 md:grid-cols-3">
        <Feature icon={faStar} title="Curated Care" text="Focused product catalog for daily routines." />
        <Feature icon={faTruck} title="Order Tracking" text="Checkout, shipping, and order status in one flow." />
        <Feature icon={faShieldAlt} title="Admin Managed" text="Inventory and stock controls stay connected." />
      </section>

      <section className="content-wrap py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Fresh picks</div>
            <h2 className="section-title">Recently Added</h2>
          </div>
          <Link to="/store" className="hidden text-sm font-bold text-[#b85c6b] sm:block">View store</Link>
        </div>
        <ItemSlider />
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="surface flex min-h-32 items-start gap-3 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f3ebe1] text-[#b85c6b]">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <div className="font-black text-[#232323]">{title}</div>
        <div className="mt-1 text-sm leading-5 text-[#697586]">{text}</div>
      </div>
    </div>
  );
}

export default Main;
