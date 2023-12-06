import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import { Trash, Heart } from 'lucide-react'
import { API } from "../backend";

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f, reload = undefined, isProduct = false }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count)

  const cardTitle = product ? product.name : "A photo from pexels"
  const cardDescription = product ? product.description : "Default Description"
  const cardPrice = product ? product.price : "DEFAULT"

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }


  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0"
          onClick={addToCart}>
          Add to Cart
        </button>
      )
    )
  }

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0"
          onClick={() => {
            removeItemFromCart(product._id)
            setReload(!reload)
          }}>
          <Trash size={16} />
          <span>Remove</span>
        </button>
      )
    )
  }
  if (isProduct) {
    const imageurl = product
      ? `${API}/product/product/photo/${product._id}`
      : `https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png`;
    return (
      <>


        {/* <section className="overflow-hidden">
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
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img class="object-cover" src={imageurl} alt="product image" />
          </a>
          <div class="mt-4 px-5 pb-5">
            <a href="#">
              <h5 class="text-xl tracking-tight text-slate-900">{product.name}</h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-3xl font-bold text-slate-900">${product.price}</span>
              </p>
            </div>
            <button href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={addToCart}>
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>

        {getARedirect(redirect)}
      </>
    )
  }
  return (
    <>
      <div key={product.id} className="flex flex-col py-1 sm:flex-row sm:justify-between border border-gray-200 py-2 px-5 rounded-lg">
        <div className="flex w-full space-x-1 sm:space-x-4">
          <ImageHelper product={product} />

          <div className="flex w-full flex-col justify-between pb-4">
            <div className="flex w-full justify-between space-x-2 pb-2">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leading-snug sm:pr-8">{cardTitle}</h3>
                <p className="text-sm">{cardDescription}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${cardPrice}</p>
              </div>
            </div>
            <div className="flex divide-x text-sm">
              {/* <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0"
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }}>
                <Trash size={16} />
                <span>Remove</span>
              </button> */}
              {showAddToCart(addtoCart)}
              {showRemoveFromCart(removeFromCart)}
              {getARedirect(redirect)}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Card;
