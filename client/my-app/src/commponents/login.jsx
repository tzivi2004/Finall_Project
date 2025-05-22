import React, { useEffect, useState } from 'react';
// import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser, setRole } from '../redux/tokenSlice';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate
import { Dialog } from "primereact/dialog"
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';


export default function LoginDemo() {

    const dispatch = useDispatch();

    const navigate = useNavigate(); // יצירת פונקציה לניווט



    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [signUp, setSignUp] = useState(false)
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState("")



    const login = async () => {
        try {
            console.log("fdhdgfj");
            console.log(userName);
            const { data } = await Axios.post("http://localhost:1233/api/auth/login", { username: userName, password: password })
            console.log(data.user);
            // console.log(dispatch(setToken(data.accessToken)));
            dispatch(setUser(data.user));
            dispatch(setRole(data.role));
            dispatch(setToken(data.accessToken));


            console.log(data.user);
            navigate('/')
        }
        catch (ex) {
            // if (ex.message == "Unauthorized")
            // console.log("fdh");
            //     return ex
        }
    }

    const SignUpEzer = () => {
        console.log("Gfdh");
        setSignUp(true)
    }
    const SignUp = async (data) => {
        console.log(data);
        try {
            const NewUser = await Axios.post("http://localhost:1233/api/auth/register", data)
            console.log(NewUser);
            navigate('/')
        }
        catch (ex) {

        }
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({});

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        SignUp(data)
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    return (
        <div className="card">
            <Dialog visible={!signUp} onHide={() => { navigate('/') }}>

                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Username</label>
                            <InputText onChange={(e) => { setUserName(e.target.value) }} id="username" type="text" className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <InputText onChange={(e) => { setPassword(e.target.value) }} id="password" type="password" className="w-12rem" />
                        </div>
                        <Button label="Login" onClick={() => { login() }} icon="pi pi-user" className="w-10rem mx-auto"></Button>
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
                        <Button label="Sign Up" onClick={() => { SignUpEzer() }} icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={signUp} onHide={() => { setSignUp(false) }}>
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center"></h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">

                                <span className="p-float-label">
                                    <Controller name="name" control={control} rules={{ required: 'name is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>{"Name*"}</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="username" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"UserName"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="price" >{"Password"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"Phone"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="email" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{"Email"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>
                            <Button type="submit" label={"Add User"} className="mt-2" />
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
