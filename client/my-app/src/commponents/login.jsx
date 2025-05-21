import React, { useEffect, useState } from 'react';
// import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Axios from "axios"
import { useDispatch,useSelector } from 'react-redux';
import { setToken, setUser,setRole } from '../redux/tokenSlice';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate

export default function LoginDemo() {

    const dispatch = useDispatch();

    const navigate = useNavigate(); // יצירת פונקציה לניווט



    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const login = async ()=>{
        try {            console.log("fdhdgfj");
            console.log(userName);
            const {data} = await Axios.post("http://localhost:1233/api/auth/login", {username:userName,password:password})
            dispatch(setUser(data.user));
            dispatch(setRole(data.role));
            dispatch(setToken(data.accessToken));
            console.log(data);
            navigate('/')
        }
        catch (ex) {

        }
    }



    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText   onChange={(e)=>{setUserName(e.target.value)}} id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" className="w-12rem" />
                    </div>
                    <Button label="Login" onClick={()=>{login()}} icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
        </div>
    )
}
        