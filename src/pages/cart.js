import React, { useState, useEffect } from "react";
import "../App.css";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";
import CartItem from "../components/cartItem";
import { CartSkeleton } from "../components/skeletons";

function Cart() {
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

  const cookie = document.cookie;
  const accountId = getAcctIdFromCookie(cookie);
  const [reloadData, setReloadData] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function submitOrder() {
    if (items.length === 0) {
      setEmptyCart(true);
      setTimeout(() => setEmptyCart(false), 3000);
    } else {
      window.location.href = "/AC7/checkout";
    }
  }

  useEffect(() => {
    fetch(`/api/cart/${accountId}`)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
      });
  }, [accountId, reloadData]);

  let orderSubtotal = 0;
  items.forEach((item) => {
    orderSubtotal += parseFloat(item.price) * item.quantity;
  });

  useEffect(() => {
    if (loading) setLoading(false);
  }, [items, loading]);

  return (
    <>
      <Invalid isModalOpen={emptyCart} />
      <main className="page-shell">
        <div className="content-wrap grid gap-6 py-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <section className="surface p-5 md:p-6">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#e6e0d8] pb-4">
              <div>
                <div className="eyebrow">Shopping cart</div>
                <h1 className="text-2xl font-black text-[#232323]">Item Summary</h1>
              </div>
              <div className="text-sm font-bold text-[#697586]">
                {items.length} item{items.length === 1 ? "" : "s"}
              </div>
            </div>

            {items.length === 0 ? (
              loading ? (
                <CartSkeleton />
              ) : (
                <div className="py-10 text-center text-[#697586]">
                  You currently do not have any products in your shopping cart.
                </div>
              )
            ) : (
              items.map((item) => (
                <CartItem key={item.id} item={item} setReloadData={setReloadData} reloadData={reloadData} />
              ))
            )}
          </section>

          <aside className="space-y-5">
            <div className="surface p-5">
              <div className="text-xl font-black text-[#232323]">Order Summary</div>
              <div className="mt-5 flex items-center justify-between border-t border-[#e6e0d8] pt-5">
                <div className="text-sm font-bold text-[#697586]">Total</div>
                <div className="text-2xl font-black text-[#b85c6b]">&#8369;{orderSubtotal.toFixed(2)}</div>
              </div>
              <button className={`${emptyCart && "animate-wiggle"} btn-primary mt-7 w-full`} onClick={submitOrder}>
                Check out
              </button>
            </div>

            <div className="surface p-5">
              <div className="text-sm font-black text-[#232323]">We Accept</div>
              <div className="mt-3 flex justify-start gap-2">
                <img src={CODLogo} alt="CODIcon" />
                <img src={gcashLogo} alt="GCASHIcon" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};

function Invalid({ isModalOpen }) {
  return (
    <div className="fixed pt-16">
      <Modal isOpen={isModalOpen}>
        <div className="flex w-screen items-center justify-center animate-bounce2">
          <div className="surface w-11/12 max-w-xl p-3">
            <div className="text-center text-sm font-semibold text-red-500">
              You currently do not have any products in your shopping cart.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Cart;
