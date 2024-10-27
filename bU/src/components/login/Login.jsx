import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
   
  });

  const { loading, signIn } = useLogin();
  const submitForm = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await signIn(inputs);

  };
  return (
    <>
      <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
        <div
          className="text-white w-full p-6 rounded-lg shadow-md  backdrop-filter backdrop-blur-md
        bg-opacity-0 "
        >
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-pink-500 pl-3">Dat09App</span>
          </h1>
          <form className=" flex flex-col gap-3 mt-4" action="">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                type="text" className="grow" placeholder="Username" />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input 
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                type="password" className="grow" placeholder="Password"  />
              </label>
            </div>
            <div className="text-violet-500 w-full text-center hover:underline">
              <Link to={"/signup"}> Creaet a new account</Link>
            </div>
            <div>
              <button
              onClick={submitForm}
              className="btn btn-primary w-full">
                	{loading ? <span className='loading loading-spinner'></span> : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
