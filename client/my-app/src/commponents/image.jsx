import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { AutoComplete } from 'primereact/autocomplete';
import { MultiSelect } from 'primereact/multiselect';
import { useSelector } from 'react-redux';

function Image({ visible, setProtionUpdateState, ProtionUpdateState, MyUpdatProtion, getProtion }) {
  const [selectedCities, setSelectedCities] = useState([]);
  const { token } = useSelector((state) => state.token);
  const toast = useRef(null);
  const [images, setImages] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(MyUpdatProtion ? MyUpdatProtion.category : "");

  const defaultValues = {
    name: MyUpdatProtion.name,
    price: MyUpdatProtion.price,
    description: MyUpdatProtion.description,
    category: MyUpdatProtion.category,
    image: MyUpdatProtion.image,
    ingredients: []
  };

  const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

  const getProduct = async () => {
    try {
      const { data } = await Axios.get("http://localhost:1233/api/Product", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data);
      setProductGroups(groupProductsByCategory(data));
      setCategories([...new Set(data.map(p => p.category || 'ללא קטגוריה'))]);
    } catch (ex) {
      console.log(ex);
    }
  };

  // Set selectedCities to actual product objects after products are loaded
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (MyUpdatProtion && MyUpdatProtion.ingredients && products.length > 0) {
      const selected = MyUpdatProtion.ingredients
        .map(ing => products.find(p => p._id === (ing.product._id || ing.product)))
        .filter(Boolean);
      setSelectedCities(selected);
    }
  }, [MyUpdatProtion, products]);

  useEffect(() => {
    if (MyUpdatProtion && MyUpdatProtion.image) {
      setImages(Array.isArray(MyUpdatProtion.image) ? MyUpdatProtion.image : [MyUpdatProtion.image]);
    }
  }, [MyUpdatProtion]);

  const onSubmit = async (data) => {
    try {
      const portionData = {
        ...data,
        category: value,
        ingredients: selectedCities.map((item) => ({ product: item._id })),
        image: images
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
      await Axios.post("http://localhost:1233/api/Portion", portionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion added successfully.' });
      setProtionUpdateState(false);
      getProtion();
    } catch (error) {}
  };

  const updateProtion = async (portionData) => {
    portionData.id = MyUpdatProtion._id;
    try {
      await Axios.put("http://localhost:1233/api/Portion", portionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getProtion();
      setProtionUpdateState(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion updated successfully.' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update portion.' });
    }
  };

  const onUpload = async (event) => {
    const uploadedFiles = event.files;
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append('images[]', file));
    try {
      const res = await Axios.post('http://localhost:1233/api/Portion/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      const uploadedImageUrls = res.data.map((file) => file.url);
      setImages(prevImages => [
        uploadedImageUrls[0],
        ...prevImages.slice(1)
      ]);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const search = (event) => {
    let query = event.query ? event.query.toLowerCase() : '';
    let _items = ['On the table', 'salad', 'first course', 'main course', 'Extras', 'dessert'];
    let filtered = _items.filter(item => item.toLowerCase().includes(query));
    setAutoCompleteSuggestions(filtered);
  };

  const groupedItemTemplate = (option) => (
    <div className="flex align-items-center">
      <div>{option.label}</div>
    </div>
  );

  const groupProductsByCategory = (products) => {
    const grouped = {};
    products.forEach(product => {
      const category = product.category || "ללא קטגוריה";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
    return Object.keys(grouped).map(category => ({
      label: category,
      items: grouped[category],
    }));
  };

  return (
    <div className="form-demo">
      <Toast ref={toast}></Toast>
      {products && <Dialog visible={ProtionUpdateState} onHide={() => setProtionUpdateState(false)}>
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">{MyUpdatProtion.name ? "Update Portion" : "Add Portion"}</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>{MyUpdatProtion.name ? MyUpdatProtion.name : "Name*"}</label>
                </span>
                {errors.name && <small className="p-error">{errors.name.message}</small>}
              </div>

              <div className="field">
                <div className="card flex justify-content-center">
                  <Controller name="category" control={control} rules={{ required: 'category is required.' }} render={({ field, fieldState }) => (
                    <AutoComplete value={value} suggestions={autoCompleteSuggestions} completeMethod={search} onChange={(e) => setValue(e.value)} placeholder={MyUpdatProtion.category ? MyUpdatProtion.category : "category"} dropdown />
                  )} />
                </div>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller name="price" control={control} render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )} />
                  <label htmlFor="price">{MyUpdatProtion.price ? MyUpdatProtion.price : "Price"}</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller name="description" control={control} render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )} />
                  <label htmlFor="description">{MyUpdatProtion.description ? MyUpdatProtion.description : "Description"}</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <>
                        {images && images[0] && (
                          <div style={{
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '8px',
                            display: 'inline-block',
                            position: 'relative',
                            width: 110,
                            height: 110,
                            background: '#fafafa'
                          }}>
                            <img
                              src={images[0]}
                              alt="portion"
                              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
                            />
                          </div>
                        )}
                        <FileUpload
                          name="images[]"
                          url="http://localhost:1233/api/Portion/upload-image"
                          multiple={false}
                          accept="image/*"
                          maxFileSize={100000000}
                          onUpload={onUpload}
                          chooseLabel={MyUpdatProtion.image?"החלף תמונה":"הוסף תמונה"}
                          cancelLabel="ביטול"
                          auto
                        />
                      </>
                    )}
                  />
                </span>
              </div>

              <Controller
                name="ingredients"
                control={control}
                render={({ field }) => (
                  <div className="card flex justify-content-center">
                    <MultiSelect
                      value={selectedCities}
                      options={productGroups}
                      onChange={(e) => setSelectedCities(e.value)}
                      optionLabel="name"
                      optionGroupLabel="label"
                      optionGroupChildren="items"
                      optionGroupTemplate={groupedItemTemplate}
                      placeholder="בחר מוצרים"
                      display="chip"
                      className="w-full md:w-20rem"
                    />
                  </div>
                )} />

              <Button type="submit" label={MyUpdatProtion.name ? "Update Portion" : "Add Portion"} className="mt-2" />
            </form>
          </div>
        </div>
      </Dialog>}
    </div>
  );
}

export default Image;