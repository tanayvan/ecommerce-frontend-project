import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper";
import ImageHelper from "./helper/ImageHelper";




export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const { user } = isAuthenticated();
  const name = user ? user.name : "Guest"

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(() => {
    loadAllProducts();
  }, []);


  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      {/* <h1>{name}</h1> */}
      <div className="">
        <h1 className="text-5xl text-center">All Product List</h1>
        <div className="m-5 ">
          {products.map((product, index) => {
            return (
              <div key={index} className="">
                < Card product={product} isProduct={true} />

                {/* < ProductCard product={product} /> */}
              </div>
            )
          })}
        </div>
      </div>
    </Base >
  );
}



const ProductCard = ({ product }) => {
  const imageurl = product
    ? `${API}/product/product/photo/${product._id}`
    : `https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png`;
  return <>
    {/* <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex  flex-wrap items-center lg:w-4/5" style={{ flexDirection: "column" }}>
          <img src={imageurl} className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h1 className="my-4 text-3xl font-semibold text-black">{product.name}</h1>
            <p className="leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">${product.price}</span>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={imageurl}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">TV</h2>
            <h1 className="my-4 text-3xl font-semibold text-black">{product.name}</h1>

            <p className="leading-relaxed">
              {product.description}
            </p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-semibold">Color</span>
                <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">${product.price}</span>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
