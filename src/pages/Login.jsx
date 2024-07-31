import React, { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobilContext';

const Login = ({ setUser }) => {
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const { state, setState } = useContext(GlobalContext);
console.log(state)
    function handleLogin(e) {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === "User Not found.") {
                alert(data.message);
                return;
            } 
            if (data.message === "Invalid Password!") {
                alert(data.message);
                return;
            }
            if (data.accessToken) {
                localStorage.setItem("user", JSON.stringify(data));
                localStorage.setItem("token", data.accessToken);
                setState(true);
            }
        })
        .catch((err) => {
            console.error(err);
            alert("An error occurred");
        });
    }

    return (
        <div>
            <section className="flex flex-col items-center pt-6">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                                <input ref={nameRef} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emelia Erickson" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don't have an account? <NavLink to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up here</NavLink></p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
