import { useRef } from "react";
import axios from "axios";
import { InputBox } from "../component/InputBox";
import Button from "../component/Button";
import { BACKEND_URL } from "../utils";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  async function signup(){
    const username = nameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username : username,
      password : password
    })
    navigate("/signin")
    alert("User signed up!!")
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={(e)=>{
        e.preventDefault();
      }} className="bg-white p-8 rounded-lg shadow-md w-100 flex items-center justify-center flex-col gap-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <InputBox placeHolder="Name" refrence={nameRef}/>
        <InputBox placeHolder="Password" refrence={passwordRef}/>
        <Button onClick={signup} size="lg" variant="primary" content="Register" />
      </form>
    </div>
  );
};

export default SignUp;
