import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Item(props) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`/api/stock/${props.product_obj.product_id}`)
      .then((res) => res.json())
      .then((data) => setPrice(data.price))
      .catch(() => console.log("Item with Quantity 0"));
  }, [props.product_obj.product_id]);

  function submitForm(e) {
    e.preventDefault();

    fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        product_price: price,
        product_id: props.product_obj.product_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/AC7/cart";
      });
  }

  const imgPath = require(`../imgs/product-${props.product_obj.product_id}.png`);

  return (
    <>
      {price !== 0 && (
        <form onSubmit={submitForm} className="shrink-0">
          <article className="group flex w-72 flex-col overflow-hidden rounded-lg border border-[#e6e0d8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Link to={`/product/${props.product_obj.product_id}`} className="block h-56 overflow-hidden bg-[#f3ebe1]">
              <img
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={imgPath}
                alt={props.product_obj.name}
              />
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 inline-flex w-fit rounded-full bg-[#eef2e9] px-2.5 py-1 text-xs font-bold text-[#768f78]">
                {props.product_obj.category}
              </div>
              <Link to={`/product/${props.product_obj.product_id}`} className="line-clamp-2 text-lg font-black leading-tight text-[#232323]">
                {props.product_obj.name}
              </Link>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-5 text-[#697586]">
                {props.product_obj.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-lg font-black text-[#b85c6b]">&#8369;{price}</div>
                <button className="btn-primary min-h-0 px-4 py-2 text-sm">Add</button>
              </div>
            </div>
          </article>
        </form>
      )}
    </>
  );
}

export default Item;
