import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Axios from "axios"
import { Dialog } from "primereact/dialog"

const AddProduct = ({ visible, setProductUpdateState, ProductUpdateState, setProduct, Product, SetMyUpdatProduct, MyUpdatProduct, getProduct }) => {

    const [formData, setFormData] = useState({});



    const defaultValues = {
        name: MyUpdatProduct.name || "",
        allergens: MyUpdatProduct.allergens || "",
        store: MyUpdatProduct.atore || "",
        price: MyUpdatProduct.price || "",
        category: MyUpdatProduct.category || "",
        QuantityInStock: MyUpdatProduct.QuantityInStock || "",
    }

    useEffect(() => {

    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addProduct = async (datas) => {

        try {
            const { data } = await Axios.post("http://localhost:1233/api/Product", datas)

            // setPost([...Post, res.data])בגלל ה sort!!!
            console.log(data)
            console.log(ProductUpdateState);
            getProduct()
            setProductUpdateState(false)
            console.log(ProductUpdateState);

        }
        catch (ex) {

        }
    }

    const UpdateProduct = async (datas) => {
        datas._id = MyUpdatProduct._id;
        console.log(datas);
        try {
            const { data } = await Axios.put("http://localhost:1233/api/Product", datas)
            getProduct()
            setProductUpdateState(false)
            console.log(setProductUpdateState);

        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        if (MyUpdatProduct.name) {
            UpdateProduct(data)
        }
        else {
            addProduct(data)
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    return (


        <div className="form-demo" >
            <Dialog visible={ProductUpdateState} onHide={() => { setProductUpdateState(false) }}>
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center"></h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">

                                <span className="p-float-label">
                                    <Controller name="name" control={control} rules={{ required: 'name is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>{MyUpdatProduct.name ? MyUpdatProduct.name : "name*"}</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="category" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{MyUpdatProduct.category ? MyUpdatProduct.category : "category"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="price" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="price" >{MyUpdatProduct.price ? MyUpdatProduct.price : "price"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="QuantityInStock" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="body" >{MyUpdatProduct.QuantityInStock ? MyUpdatProduct.QuantityInStock : "QuantityInStock"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="allergens" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="allergens" >{MyUpdatProduct.allergens ? MyUpdatProduct.allergens : "allergens"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="store" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="store" >{MyUpdatProduct.store ? MyUpdatProduct.store : "store"}</label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>
                            <Button type="submit" label={MyUpdatProduct.name ? "Update Product" : "Add Product"} className="mt-2" />
                        </form>
                    </div>
                </div>
            </Dialog> </div>

    );

}

export default AddProduct
