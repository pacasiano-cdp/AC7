import React, { useState, useEffect, useMemo } from "react";
import { MdSearch } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Link } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);

  useEffect(() => {
    fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => setBatch(data));
  }, []);

  const searchableProducts = useMemo(() => (
    products.map((product) => ({ id: product.product_id, name: product.name }))
  ), [products]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    const delayTimeout = setTimeout(() => {
      setSearchResults(
        searchableProducts.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setIsLoading(false);
    }, 200);

    return () => {
      clearTimeout(delayTimeout);
      setIsLoading(false);
    };
  }, [searchTerm, searchableProducts]);

  function redirectToProductPage(id) {
    window.location.href = `/AC7/product/${id}`;
  }

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#697586]">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-10 w-full rounded-md border border-[#e6e0d8] bg-white pl-10 pr-3 text-sm font-semibold text-[#232323] shadow-sm transition placeholder:text-[#9aa4b2] hover:border-[#cfc5b8] focus:border-[#b85c6b] focus:outline-none"
      />
      <div className={`absolute left-0 right-0 top-full z-50 pt-2 ${searchTerm.length === 0 ? "hidden" : ""}`}>
        {isLoading ? (
          <div className="flex items-center rounded-lg border border-[#e6e0d8] bg-white px-4 py-3 text-sm font-semibold text-[#697586] shadow-xl">
            <MdSearch className="mr-2 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : batch.length > 0 ? (
          <div className="max-h-72 overflow-y-auto rounded-lg border border-[#e6e0d8] bg-white p-2 shadow-xl">
            {searchResults.length === 0 ? (
              <div className="px-3 py-2 text-sm font-semibold text-[#697586]">No results</div>
            ) : (
              searchResults.map((item) => (
                <Link
                  key={item.id}
                  onClick={() => redirectToProductPage(item.id)}
                  className="block rounded-md px-3 py-2 text-sm font-bold text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]"
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>
        ) : (
          <p className="rounded-lg border border-[#e6e0d8] bg-white px-4 py-3 text-sm font-semibold text-[#697586] shadow-xl">No results</p>
        )}
      </div>
    </div>
  );
}

export default Search;
