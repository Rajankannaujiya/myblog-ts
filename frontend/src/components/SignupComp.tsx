import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { SingUpInput } from "@rajan108/medium-blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";
import DangerAlert from "./Alert";

function SignupComp(){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SingUpInput>({
        name: "",
        email: "",
        password: ""
    });

    const [isClick, setisClick] = useState(false)

    async function sendRequest() {
        try {
            setisClick(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            <DangerAlert color="red" alertType="Danger alert" description="failed to login"/>
            // alert the user here that the request failed
        }
        finally{
            setisClick(false)
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                  <Header headerText="Already have an Account?" linkto="signin" directto="Signin" />
                </div>
                <div className="pt-8">
                    <Input label="Username" placeholder="Enter the username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />

                    <Input label="email" placeholder="Enter the email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <Input label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                    <Button type="button" onClick={sendRequest} buttonFor="SignUp" colour="gray" isClicked={isClick}/>
                </div>
            </div>
        </div>
    </div>
}


export default SignupComp;