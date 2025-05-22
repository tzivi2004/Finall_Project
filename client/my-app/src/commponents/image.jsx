import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

function Image({
  visible,
  setProtionUpdateState,
  ProtionUpdateState,
  MyUpdatProtion,
  getProtion
}) {
  const toast = useRef(null);
  const [file, setFile] = useState(null);
  const { control, formState: { errors }, handleSubmit } = useForm();

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await Axios.post("http://localhost:1233/api/Portion/upload-image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.imageUrl; // Return the URL of the uploaded image
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = '';

      if (file) {
        imageUrl = await uploadImage(file); // Upload the image first
      }

      const portionData = {
        ...data,
        image: imageUrl // Attach the image URL to the portion data
      };

      if (MyUpdatProtion.name) {
        await updateProtion(portionData);
      } else {
        await addProtion(portionData);
      }
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit data.' });
    }
  };

  const addProtion = async (portionData) => {
    try {
      const response = await Axios.post("http://localhost:1233/api/Protion", portionData);
      getProtion();
      setProtionUpdateState(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion added successfully.' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add portion.' });
    }
  };

  const updateProtion = async (portionData) => {
    portionData._id = MyUpdatProtion._id; // Ensure to include ID for updating
    try {
      const response = await Axios.put("http://localhost:1233/api/Protion", portionData);
      getProtion();
      setProtionUpdateState(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion updated successfully.' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update portion.' });
    }
  };

const onFileSelect = (event) => {
    console.log('Selected files:', event.files); // Log selected files
    if (event.files && event.files.length > 0) {
        setFile(event.files[0]); // Update file state
    }
};
  return (
    <div className="form-demo">
      <Toast ref={toast}></Toast>
      <Dialog visible={ProtionUpdateState} onHide={() => setProtionUpdateState(false)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">{MyUpdatProtion.name ? "Update Portion" : "Add Portion"}</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                </span>
                {errors.name && <small className="p-error">{errors.name.message}</small>}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller name="category" control={control} render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )} />
                  <label htmlFor="category">Category</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller name="price" control={control} render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )} />
                  <label htmlFor="price">Price</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller name="description" control={control} render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )} />
                  <label htmlFor="description">Description</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
<FileUpload 
    name="image"
    accept="image/*"
    customUpload 
    onChange={onFileSelect} 
    mode="basic" 
/>
                  <label htmlFor="image">Image</label>
                </span>
              </div>

              <Button type="submit" label={MyUpdatProtion.name ? "Update Portion" : "Add Portion"} className="mt-2" />
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Image;