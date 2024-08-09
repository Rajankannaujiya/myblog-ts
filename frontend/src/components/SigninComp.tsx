import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { SingInInput } from "@rajan108/medium-blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";
import DangerAlert from "./Alert";

function SigninComp(){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SingInInput>({
        email: "",
        password: ""
    });

    console.log("the post is",postInputs)
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            <DangerAlert color="red" alertType="Danger alert" description="failed to login"/>
             // alert the user here that the request failed
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                  <Header headerText="Don't have an account?" linkto="signup" directto="Signup" />
                </div>
                <div className="pt-8">

                    <Input label="Username" placeholder="harkirat@gmail.com" onChange={(e) => {
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

                    <Button type="button" onClick={sendRequest} buttonFor="SignIn" />
                </div>
            </div>
        </div>
    </div>
}


export default SigninComp;