import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';
import { ProductCardSkeleton } from "./skeletons";

function CategorySlider(props) {

    const {category: itemCategory} = props;
    console.log(itemCategory)
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('/api/product')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        loading ? <ProductCardSkeleton count={3} /> :
        <div className="itemSlider">
          <div className="flex justify-start gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide">
            {products.map((product) => (
                product.category === itemCategory ? (
                    <Item key={product.product_id} product_obj={product} />
                ) : null
            ))}
          </div>
        </div>
      );
}

export default CategorySlider;
