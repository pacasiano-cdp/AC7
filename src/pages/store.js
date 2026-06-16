import React, { useState, useEffect } from "react";
import "../App.css";
import ItemSlider from "../components/itemSlider";
import CategorySlider from "../components/categorySlider";
import { ProductCardSkeleton } from "../components/skeletons";

function Store() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product/categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return loading ? (
      <main className="page-shell">
        <section className="content-wrap py-10">
          <div className="mb-8">
            <div className="skeleton-line h-4 w-24 rounded-md" />
            <div className="mt-3 skeleton-line h-9 w-80 max-w-full rounded-md" />
            <div className="mt-3 skeleton-line h-5 w-[34rem] max-w-full rounded-md" />
          </div>
          <ProductCardSkeleton />
        </section>
      </main>
    ) : (
      <div className="page-shell flex items-center justify-center px-4">
        <div className="surface max-w-lg p-8 text-center">
          <div className="text-2xl font-black text-[#232323]">Store is currently empty</div>
          <div className="mt-2 text-[#697586]">Please contact the administrator.</div>
        </div>
      </div>
    );
  }

  return (
    <main className="page-shell">
      <section className="content-wrap py-10">
        <div className="mb-8">
          <div className="eyebrow">Shop AC7</div>
          <h1 className="section-title">Beauty products by collection</h1>
          <p className="section-copy mt-2">
            Browse available stock, compare categories, and add products to your cart without leaving the catalog.
          </p>
        </div>

        <ProductSection title="Recently Added">
          <ItemSlider />
        </ProductSection>

        {categories.map((category) => (
          <ProductSection key={category.category} title={category.category}>
            <CategorySlider category={category.category} />
          </ProductSection>
        ))}
      </section>
    </main>
  );
}

function ProductSection({ title, children }) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#232323]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default Store;
