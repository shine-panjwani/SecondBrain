import { InputBox } from "../component/InputBox";
import Button from "../component/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  async function signin(){
    const username = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username : username,
      password : password
    })
    console.log(response.data);
    console.log(response.data.token);
    localStorage.setItem("token",response.data.token)
    alert("Logged in successfully!!");
    navigate("/dashboard")
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={(e)=>{
          e.preventDefault();
        }} className="bg-white p-8 rounded-lg shadow-md w-100 flex items-center justify-center flex-col gap-2">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <InputBox placeHolder="Name"  refrence={nameRef}/>
              <InputBox placeHolder="Password" refrence={passwordRef}/>
              <Button onClick={signin} size="lg" variant="primary" content="Login" />
            </form>
    </div>
  );
};
export default SignIn;
