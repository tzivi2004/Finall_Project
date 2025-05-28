import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
 
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import Axios from "axios"
import { useSelector } from 'react-redux';
import { Dialog } from "primereact/dialog"

// קומפוננטה זאת מעדכנת וגם מוסיפה!
export const Useradd = ({ visible, setUserUpdateState, setUser, users, SetMyUpdatUser, MyUpdatUser, getUser }) => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [un, setUn] = useState(false);
    const { token } = useSelector((state) => state.token);

    const defaultValues = {
        name: MyUpdatUser.name,
        email: MyUpdatUser.email,
        username: MyUpdatUser.username,
        address: MyUpdatUser.address,
        phone: MyUpdatUser.phone
    }

    useEffect(() => {

    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addUser = async (datas) => {

        try {
            const res = await Axios.post("http://localhost:1233/api/User", datas,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            // setUser([...user, res.data])
            getUser()
            setUserUpdateState(false)
        }
        catch (ex) {

        }
    }

    const UpdateUser = async (datas) => {
        datas.id = MyUpdatUser._id;
        console.log(datas);
        try {
            const { data } = await Axios.put("http://localhost:1233/api/User", datas,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            getUser()
            setUserUpdateState(false)
        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        if (MyUpdatUser.name) {
            UpdateUser(data)
        }
        else {
            addUser(data)

        }

    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const isUnique = async (username) => {
        const response = users.filter(e => e.username == username);
        if (response) {
            setUn(true)
            return true
        }
        return false;
    };



    return (
        <div className="form-demo">

            <div className="flex justify-content-center">
                <Dialog visible={true} onHide={() => { setUserUpdateState(false) }}>
                <div className="card">
                    <h5 className="text-center"></h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">

                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>{MyUpdatUser.name ? MyUpdatUser.name : "Name*"}</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{
                                    required: 'username is required.',
                                    validate: {
                                        isUnique: async (value) => {
                                            const unique = await isUnique(value);
                                            return unique || 'Username is already taken.';
                                        }
                                    }
                                }} render={({ field, fieldState }) => (

                                    <InputText id={field.username} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />

                                )} />
                                <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>{MyUpdatUser.username ? MyUpdatUser.username : "UserName*"}</label>
                            </span>
                            {getFormErrorMessage('username')}
                            {un && <div style={{ color: "red" }}>not valid username</div>}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="address" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.address} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="address" >{MyUpdatUser.address ? MyUpdatUser.address : "Address"}</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="email" control={control}
                                    rules={{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>{MyUpdatUser.Email ? MyUpdatUser.Email : "Email"}</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.address} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="phone" >{MyUpdatUser.phone ? MyUpdatUser.phone : "phone"}</label>
                            </span>
                            {getFormErrorMessage('phone')}
                        </div>

                        <Button type="submit" label={MyUpdatUser.name ? "Update User" : "Add User"} className="mt-2" />
                    </form>
                </div> </Dialog>
            </div>
           
        </div>
        
    );
}

export default Useradd