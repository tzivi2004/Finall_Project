import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Axios from "axios"


const addProduct=({ visible, setProductUpdateState, setProduct, Product, SetMyUpdatProduct, MyUpdatProduct, getProduct }) => {

    const [formData, setFormData] = useState({});



    const defaultValues = {
        title: MyUpdatProduct.name,
        // body: MyUpdatProduct.body

    }

    useEffect(() => {
       
    }, []); 

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addPost = async (datas) => {

        try {
            const res = await Axios.post("http://localhost:1233/api/Post", datas)

            // setPost([...Post, res.data])בגלל ה sort!!!
            getPost()
            setPostUpdateState(false)
        }
        catch (ex) {

        }
    }

    const UpdatePost = async (datas) => {
        datas._id = MyUpdatPost._id;
        console.log(datas);
        try {
            const { data } = await Axios.put("http://localhost:1233/api/Post", datas)
            getPost()
            setPostUpdateState(false)
        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        if (MyUpdatPost.title) {
            UpdatePost(data)
        }
        else {
            addPost(data)
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    return (
        <div className="form-demo">

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center"></h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">

                            <span className="p-float-label">
                                <Controller name="title" control={control} rules={{ required: 'title is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.title} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>{MyUpdatPost.title ? MyUpdatPost.title : "Title*"}</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="body" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="body" >{MyUpdatPost.body ? MyUpdatPost.body : "Body"}</label>
                            </span>
                            {getFormErrorMessage('body')}
                        </div>

                        <Button type="submit" label={MyUpdatPost.title ? "Update Product" : "Add Product"} className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );

}

export default addProduct