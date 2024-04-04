import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/reduxStore/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateUser(email));
  };

  return (
    <div
      className={
        "flex flex-col w-3/5 p-8 border rounded-md bg-teal-300 xl:w-1/3 lg:w-1/2 md:w-3/4 sm:w-full"
      }
    >
      <input
        type="text"
        name="email"
        className={"m-2 p-2 text-black rounded-sm"}
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        className={"m-2 p-2 text-black rounded-sm"}
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={"border"} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Login;
