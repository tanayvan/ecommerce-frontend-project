import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteCategory, getCategories } from './helper/adminapicall'


const ManageCategories = () => {

  const [categories, setCategories] = useState([])
  const { user, token } = isAuthenticated()

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    preload();
  }, [])

  const deletethiscategory = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        preload()
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      {/* <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link> */}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">list of categories</h2>
          {categories.map((cate, index) => {
            return (<div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className=" text-left text-3xl font-bold leading-tight">{cate.name}</h3>
              </div>
              <div className="col-4">
                <Link className="inline-flex w-40 items-center justify-center rounded-md bg-black px-1.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  to={`/admin/category/update/${cate._id}`}>
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => { deletethiscategory(cate._id) }} className="inline-flex w-40 items-center justify-center rounded-md bg-black px-1.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
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

export default ManageCategories;