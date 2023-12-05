import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripCheckout from "./StripCheckout";
import RazorpayCheckout from "./RazorpayCheckout";

export default function Cart() {

  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    console.log(loadCart())
    setProducts(loadCart())
  }, [reload]);


  const loadAllProducts = () => {
    return (
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <p className="mt-3 text-sm font-medium text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
          praesentium incidunt.
        </p>
        <ul className="flex flex-col divide-y divide-gray-200">

          {products.map((product, index) => {
            return (
              <Card key={index} product={product} removeFromCart={true} addtoCart={false} setReload={setReload} reload={reload} />
            )
          })}
        </ul>
      </div>
    )
  }


  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="">
        <div className="col-12">{loadAllProducts()}</div>
        <div className="col-12">

          <StripCheckout products={products} setReload={setReload} reload={reload} />
          {/* <RazorpayCheckout products={products} setReload={setReload} reload={reload} /> */}
        </div>
      </div>
    </Base>
  );
}
