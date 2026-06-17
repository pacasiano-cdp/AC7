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
          <article className="group flex h-[29rem] w-72 flex-col overflow-hidden rounded-lg border border-[#e6e0d8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Link to={`/product/${props.product_obj.product_id}`} className="block h-52 min-h-52 max-h-52 overflow-hidden bg-[#f3ebe1]">
              <img
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={imgPath}
                alt={props.product_obj.name}
              />
            </Link>
            <div className="flex min-h-0 flex-1 flex-col p-4">
              <div className="mb-3 inline-flex h-6 max-w-fit items-center rounded-full bg-[#eef2e9] px-2.5 text-xs font-bold text-[#768f78]">
                <span className="truncate">
                {props.product_obj.category}
                </span>
              </div>
              <Link to={`/product/${props.product_obj.product_id}`} className="line-clamp-2 min-h-[2.75rem] text-lg font-black leading-tight text-[#232323]">
                {props.product_obj.name}
              </Link>
              <p className="mt-3 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-[#697586]">
                {props.product_obj.description}
              </p>
              <div className="mt-auto flex h-11 items-center justify-between gap-3 border-t border-[#f0e8de] pt-3">
                <div className="truncate text-lg font-black text-[#b85c6b]">&#8369;{price}</div>
                <button className="btn-primary min-h-0 w-20 px-0 py-2 text-sm">Add</button>
              </div>
            </div>
          </article>
        </form>
      )}
    </>
  );
}

export default Item;
