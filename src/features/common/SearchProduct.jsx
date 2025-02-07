import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSearchProductsQuery } from "../../services/productApi"; // Import the hook from the slice
import { Link } from "react-router-dom";
function SearchedProduct() {
  const location = useLocation();
  //   const queryParams = new URLSearchParams(location.search);
  //   const query = queryParams.get('query');
  const { searchTerm } = useParams();
  const { data: products, error, isLoading } = useSearchProductsQuery(searchTerm); 
  console.log("serched products", products);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchTerm}"</h2>
        {
                products && products.length > 0 ? (
                    <div className="d-flex flex-wrap h">
                        {
                            products.map((product) => (
                                <div key={product._id} className="p-4">
                                    <div className="card mt-1 p-2 shadow" style={{ width: "19rem", height: "450px" }} >
                                        <Link to={`/productdetails/${product._id}`}>
                                        <img src={product.imgUrl} className="card-img-top" style={{ height: "320px" }} />
                                        </Link>
                                        <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.company}</p>
                                        <p className="card-text">Price: ₹{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                   </div>
            ) : (
                <p>No products found.</p>
            )
        }
    </div>
  );
}

export default SearchedProduct;
