import React from "react";
import "../App.css";
import bodypic from "../imgs/bodypic.png";
import navlogo from "../imgs/navlogo.png";

function About() {
  return (
    <main className="page-shell">
      <section className="content-wrap grid gap-8 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="eyebrow">About AC7</div>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#232323] md:text-5xl">
            Beauty essentials managed with care from shelf to checkout.
          </h1>
          <p className="section-copy mt-5">
            AC7 Dazzle White is a beauty retail platform for skincare and body care products. The storefront helps customers browse and order, while the admin workspace keeps inventory, orders, suppliers, and shipping connected.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e6e0d8] bg-white shadow-xl">
          <img src={bodypic} alt="AC7 beauty products" className="h-[28rem] w-full object-cover" />
        </div>
      </section>

      <section className="content-wrap grid gap-4 pb-14 md:grid-cols-3">
        <InfoCard title="Storefront" text="A clean catalog, cart, checkout, and order tracking flow for customers." />
        <InfoCard title="Operations" text="Admin tools for order processing, stock movement, employees, and suppliers." />
        <InfoCard title="Support" text="Contact AC7 for product questions, order status, and account help." />
      </section>

      <section className="border-y border-[#e6e0d8] bg-white/70">
        <div className="content-wrap flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={navlogo} alt="AC7 logo" className="h-14 w-14 rounded-md object-cover" />
            <div>
              <div className="text-xl font-black text-[#232323]">AC7 Dazzle White</div>
              <div className="text-sm font-semibold text-[#697586]">Premium beauty care and daily essentials.</div>
            </div>
          </div>
          <div className="text-sm font-bold text-[#697586]">09164770793 | Ac7copr95@gmail.com</div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="surface p-6">
      <div className="text-lg font-black text-[#232323]">{title}</div>
      <p className="mt-2 text-sm leading-6 text-[#697586]">{text}</p>
    </div>
  );
}

export default About;
