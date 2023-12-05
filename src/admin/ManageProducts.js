import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteProduct, getProducts } from './helper/adminapicall'


const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const { user, token } = isAuthenticated()

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const deletethisproduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        preload()
      }
    })
  }


  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      {/* <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link> */}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {products.map((product, index) => {
            return (<div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h2 className="text-left text-3xl font-bold leading-tight">{product.name}</h2>
              </div>
              <div className="col-4">
                <Link className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  to={`/admin/product/update/${product._id}`}>
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => { deletethisproduct(product._id) }} className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Delete
                </button>
              </div>
            </div>)
          })}
        </div>
      </div>
    </Base>
  )
}

export default ManageProducts