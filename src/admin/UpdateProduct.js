import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getProduct, getCategories, updateProduct } from './helper/adminapicall'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  })

  const { name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData } = values

  const preload = (productId) => {
    getProduct(productId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData()
        })
        preloadCategories()
      }
    })
  }

  const preloadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    preload(match.params.productId);
  }, [])

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({ ...values, name: "", description: "", price: "", photo: "", stock: "", loading: false, createdProduct: data.name })
        setTimeout(() => {
          setValues({ ...values, getaRedirect: true })
        }, 2000)
      }
    })
  }

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value })
  }

  const successMessage = () => (
    <div className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}>
      <h4>{createdProduct} updated successfully</h4>
    </div>
  )

  const errorMessage = () => (
    <div className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}>
      <h4>{error} this is the error</h4>
    </div>
  )



  const performRedirect = () => {
    if (getaRedirect === true) {
      return <Redirect to="/admin/dashboard" />
    }
  }

  // const timeout = setTimeout(performRedirect, 200)

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && categories.map((cate, index) => (
            <option key={index} value={cate._id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        update Product
      </button>
    </form>
  );

  return (
    <Base title='Add a Product here!' description='Welcome to product creation section' className='container bg-info p-4'>
      {/* <Link to="/admin/dashboard" className='btn btn-md btn-dark mb-3'>Admin Home</Link> */}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  )
}

export default UpdateProduct;