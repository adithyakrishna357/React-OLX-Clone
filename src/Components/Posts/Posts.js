import React, { useState, useContext, useEffect } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";

function  Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const navigate =useNavigate()
  useEffect(() => {
    const db = getFirestore(firebase);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const Products = querySnapshot.docs.map((doc) => doc.data());
        console.log("Products:", Products);
        setProducts(Products);
        // setFilteredData(Products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product=>{
          return<div className="card" onClick={()=>{
            setPostDetails(product)
            navigate('/view')
          }}>
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9;{product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdOn}</span>
          </div>
        </div>
        })}
        </div>
      </div>
      
    </div>
  );
}

export default Posts;
