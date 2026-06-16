import { useEffect, useState } from "react";
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { useParams } from "react-router-dom";
import { ProductDetailSkeleton } from "../components/skeletons";

function Product() {
  const { product_id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/product/${product_id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [product_id]);

  const { name: itemName, description, price, quantity: maxBatchQty } = products || {};
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < maxBatchQty) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  function submitForm(e) {
    e.preventDefault();
    fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        product_id,
        product_price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data message" + data.message);
        window.location.href = "/AC7/cart";
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  return (
    <main className="page-shell">
      <form onSubmit={submitForm} className="content-wrap py-10">
        {loading ? (
          <ProductDetailSkeleton />
        ) : (
        <section className="surface grid overflow-hidden md:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#f3ebe1] p-4 md:p-8">
            <img
              alt={itemName || "Product"}
              className="h-full min-h-[24rem] w-full rounded-lg object-cover"
              src={Item1}
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <div className="eyebrow">Product details</div>
            <h1 className="mt-2 text-3xl font-black leading-tight text-[#232323] md:text-4xl">
              {itemName}
            </h1>
            <p className="section-copy mt-4">{description}</p>
            <div className="my-8 h-px bg-[#e6e0d8]" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-bold text-[#697586]">Price</div>
                <div className="text-3xl font-black text-[#b85c6b]">&#8369;{price}</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-[#e6e0d8] bg-white p-1">
                <button type="button" onClick={decrementQuantity} className="h-10 w-10 rounded-md bg-[#f7f3ec] text-xl font-black">-</button>
                <div className="w-10 text-center text-xl font-black">{quantity}</div>
                <button type="button" onClick={incrementQuantity} className="h-10 w-10 rounded-md bg-[#f7f3ec] text-xl font-black">+</button>
              </div>
              <button type="submit" className="btn-primary px-8">Add to Cart</button>
            </div>
          </div>
        </section>
        )}
      </form>
    </main>
  );
}

export default Product;
