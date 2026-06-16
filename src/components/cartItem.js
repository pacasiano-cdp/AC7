import React, { useState, useEffect } from "react";

function CartItem({ item, setReloadData, reloadData }) {
  const cookie = document.cookie;
  function getAcctIdFromCookie(cookieStr) {
    if (cookieStr.indexOf(";") > 0) {
      const cookiesArray = cookieStr.split(";");
      for (let i = 0; i < cookiesArray.length; i++) {
        if (cookiesArray[i].indexOf("account_id") > 0) {
          return cookiesArray[i].replace("account_id=", "").trim();
        }
      }
    } else {
      return cookie.slice(cookie.indexOf("=") + 1);
    }
  }

  const accountId = getAcctIdFromCookie(cookie);
  const { name, price, quantity, product_id } = item;
  const [hookQty, setQuantity] = useState(quantity);
  const [submit, setSubmit] = useState(false);
  const [total, setTotal] = useState((price * quantity).toFixed(2));
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setQuantity(quantity);
  }, []);

  useEffect(() => {
    fetch(`/api/product/${product_id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [hookQty, product_id]);

  const { quantity: maxStockQty } = product || {};

  const incrementQuantity = () => {
    if (hookQty < maxStockQty) {
      setQuantity(hookQty + 1);
      setTotal((parseInt(total) + parseInt(price)).toFixed(2));
    }
  };

  const decrementQuantity = () => {
    if (hookQty > 1) {
      setQuantity(hookQty - 1);
      setTotal((parseInt(total) - parseInt(price)).toFixed(2));
    }
  };

  useEffect(() => {
    let timeoutId;
    const makeFetch = () => {
      fetch(`/api/cart/${accountId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          quantity: hookQty,
        }),
      })
        .then(() => {
          setReloadData(!reloadData);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    timeoutId = setTimeout(makeFetch, 1000);
    return () => clearTimeout(timeoutId);
  }, [submit]);

  useEffect(() => {
    if (hookQty !== quantity) setSubmit(!submit);
  }, [quantity, hookQty]);

  const imgPath = require(`../imgs/product-${product_id}.png`);

  return (
    <div className="grid gap-4 border-b border-[#e6e0d8] py-5 last:border-b-0 md:grid-cols-[6rem_1fr_auto_auto] md:items-center">
      <img src={imgPath} className="h-24 w-24 rounded-lg bg-[#f3ebe1] object-cover" alt={name} />
      <form action={`/api/item/${product_id}`} method="POST" className="min-w-0">
        <div className="text-lg font-black leading-tight text-[#232323]">{name}</div>
        <div className="mt-1 text-sm font-bold text-[#b85c6b]">&#8369;{price}</div>
        <button className="mt-2 text-xs font-bold text-[#697586] hover:text-[#b85c6b]">Remove</button>
      </form>
      <div className="flex w-fit items-center gap-3 rounded-lg border border-[#e6e0d8] bg-white p-1">
        <button type="button" onClick={decrementQuantity} className="h-9 w-9 rounded-md bg-[#f7f3ec] text-lg font-black">-</button>
        <div className="w-8 text-center font-black">{hookQty}</div>
        <button type="button" onClick={incrementQuantity} className="h-9 w-9 rounded-md bg-[#f7f3ec] text-lg font-black">+</button>
      </div>
      <div className="text-xl font-black text-[#232323]">&#8369;{total}</div>
    </div>
  );
}

export default CartItem;
