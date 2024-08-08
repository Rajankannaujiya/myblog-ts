import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { SingUpInput } from "@rajan108/medium-blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";

function SignupComp(){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SingUpInput>({
        name: "",
        email: "",
        password: ""
    });

    console.log("the post is",postInputs)
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                  <Header headerText="Already have an Account?" linkto="signin" directto="Signin" />
                </div>
                <div className="pt-8">
                    <Input label="Username" placeholder="Harkirat Singh..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />

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

                    <Button type="button" onClick={sendRequest} buttonFor="SignUp" />
                </div>
            </div>
        </div>
    </div>
}


export default SignupComp;