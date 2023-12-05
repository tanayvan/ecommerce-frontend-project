import React, { useState } from 'react'
import Base from "../core/Base"
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../auth/helper/index';
import { ArrowRight } from 'lucide-react'

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                console.log(data)
                if (data.err) {
                    setValues({ ...values, error: data.err, success: false });
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })

                }
            })
            .catch(console.log("error in signup"))
    }

    const succesMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-success' style={{ display: success ? "" : "none" }}>
                        New account was created successfully. Please {" "}<Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-danger' style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" value={name} onChange={handleChange("name")} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" value={email} onChange={handleChange("email")} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} onChange={handleChange("password")} className="form-control" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>

                </div>
            </div>
        )
    }
    const performRedirect = () => {
        if (values.success) {


            return <Redirect to="/signin" />

        }

    }
    return (
        <Base title='Sign In Page' description='a page for sign in'>
            {succesMessage()}
            {errorMessage()}
            {/* {signUpForm()} */}

            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>

                            <form action="#" method="POST" className="mt-8">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="name"
                                                placeholder="Name"
                                                onChange={handleChange("name")}
                                                value={name}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                placeholder="Email"
                                                onChange={handleChange("email")}
                                                value={email}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                placeholder="Password"
                                                onChange={handleChange("password")}
                                                value={password}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            onClick={onSubmit}
                                        >
                                            Get started <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="h-full w-full">
                        <img
                            className="mx-auto h-full w-full rounded-md object-cover"
                            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            alt=""
                        />
                    </div>
                </div>
            </section>

            <p className='text-white text-center'>{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base >
    )
}

export default Signup