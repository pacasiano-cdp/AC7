import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';
import { ProductCardSkeleton } from "./skeletons";

function ItemSlider() {
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/product')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        });
    }, []);

    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [loading]);
    
    useEffect(() => {
        fetch('/api/stock')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBatch(data)
            })
    }, []);
    

    return (
        <>
        {batch.length !== 0 ? (
        <div className="itemSlider">
          <div className="flex justify-start gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide">
            {products.map((item) => (
                <Item key={item.product_id} product_obj={item} />
            ))}
          </div>
        </div>
        ) : (
        loading ? (
        <ProductCardSkeleton />
        ):(
        <div className="flex justify-center items-center  py-20">
            <div className="flex flex-col justify-center items-center">
                <div className="surface px-6 py-5 text-lg font-bold text-[#697586]">No Items Available</div>
            </div>
        </div>
        ))}
        </>
      );
}

export default ItemSlider;
