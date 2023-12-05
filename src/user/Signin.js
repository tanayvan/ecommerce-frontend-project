import React from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { signin, authenticate, isAuthenticated } from "../auth/helper"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { ArrowRight } from 'lucide-react'




const Signin = () => {
    const [values, setValues] = useState({
        email: "lums@mals.com",
        password: "Rock@1999",
        error: "",
        loading: false,
        didRidirect: false
    })

    const { email, password, error, loading, didRidirect } = values;
    const { user } = isAuthenticated() ? isAuthenticated() : {}

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })?.then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })
            } else {
                // console.log(data)
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRidirect: true
                    })
                })
            }
        })
            .catch(console.log("signin request failed"))
    }

    const performRedirect = () => {
        if (didRidirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className='alert alert-info text-center'>
                    <h2>Loading...</h2>
                </div>
            )
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

    return (<>
        {errorMessage()}
        {loadingMessage()}


        <Base>
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>

                            <form action="#" method="POST" className="mt-8">
                                <div className="space-y-5">
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
        </Base>
        {performRedirect()}
    </>
    )
}
export default Signin