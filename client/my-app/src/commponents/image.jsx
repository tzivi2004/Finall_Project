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
import { ListBox } from 'primereact/listbox';
import { MultiSelect } from 'primereact/multiselect';



function Image({
  visible,
  setProtionUpdateState,
  ProtionUpdateState,
  MyUpdatProtion,
  getProtion
}) {

  const [selectedCities, setSelectedCities] = useState([]);

  const toast = useRef(null);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const [productGroups, setProductGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);


  const { control, formState: { errors }, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  const getProduct = async () => {
    try {
      console.log("data");
      const { data } = await Axios.get("http://localhost:1233/api/Product")
      console.log(data);
      setProducts(data)
      setProductGroups(groupProductsByCategory(data)); // Set initial items to all products grouped by category
      setCategories([...new Set(data.map(p => p.category || 'ללא קטגוריה'))]);
    }
    catch (ex) {
      console.log(ex);

      // <Button icon="pi pi-user-plus" label="Add User" onClick={()=>addUserEzer()} />
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  const onSubmit = async (data) => {
    try {
      const idProducts = selectedCities.map((item) => item._id); // Extract the IDs of selected products
      console.log("data", data);
      console.log("autoCompleteSuggestions", autoCompleteSuggestions);
      console.log("idProducts", idProducts);
      console.log("selectedCities",selectedCities);
      console.log("value", value);
      const portionData = {
        ...data,
        category: value,
        ingredients: selectedCities.map((item) => ({ product: item._id })),
        image: images // Attach the image URL to the portion data
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
      const response = await Axios.post("http://localhost:1233/api/Portion", portionData);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion added successfully.' });
      setProtionUpdateState(false)
      getProtion();
    }
    catch (error) {
      //   console.error(error);
      //   toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add portion.' });
      // }
    }
  };

  const updateProtion = async (portionData) => {
    portionData.id = MyUpdatProtion._id; // Ensure to include ID for updating
    try {
      const response = await Axios.put("http://localhost:1233/api/Portion", portionData);
      getProtion();
      setProtionUpdateState(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Portion updated successfully.' });
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update portion.' });
    }
  };

  const onUpload = async (event) => {
    console.log(event);
    const uploadedFiles = event.files;

    // Create FormData object
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append('images[]', file));

    try {
      const res = await Axios.post('http://localhost:1233/api/Portion/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedImageUrls = res.data.map((file) => file.url);

      setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  const onClear = () => {
    setImages([]);
    console.log('Upload canceled');
  };

  const search = (event) => {

    // let filtered = products.filter(
    //   (product) => product.name.toLowerCase().includes(query)

    let query = event.query ? event.query.toLowerCase() : '';
    let _items = ['On the table', 'salad', 'first course', 'main course', 'Extras', 'dessert'];
    let filtered = _items.filter(item => item.toLowerCase().includes(query))
    setAutoCompleteSuggestions(filtered);
  }

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  const groupProductsByCategory = (products) => {
    const grouped = {};

    products.forEach(product => {
      const category = product.category || "ללא קטגוריה";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push({
        label: product.name,
        value: product, // אפשר גם לשים רק את ה-id אם תרצה
      });
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
                  <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                </span>
                {errors.name && <small className="p-error">{errors.name.message}</small>}
              </div>

              <div className="field">
                <div className="card flex justify-content-center">
                  <AutoComplete value={value} suggestions={autoCompleteSuggestions} completeMethod={search} onChange={(e) => setValue(e.value)} placeholder="category" dropdown />
                </div>
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
                    name="images[]"
                    url="http://localhost:1233/api/Portion/upload-image" // Replace with the correct API endpoint
                    multiple // Allow selecting multiple files
                    accept="image/*" // Accept only image files
                    maxFileSize={100000000} // Max file size: 1MB

                    onUpload={onUpload}
                    chooseLabel="הוספת תמונות"
                    cancelLabel="ביטול"
                    // uploadLabel="Upload"
                    auto
                  />
                </span>
              </div>
              <div className="card flex justify-content-center">
                <MultiSelect value={selectedCities}
                  options={productGroups}
                  onChange={(e) => setSelectedCities(e.value)}
                  optionLabel="label"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  optionGroupTemplate={groupedItemTemplate}
                  placeholder="בחר מוצרים"
                  display="chip"
                  className="w-full md:w-20rem" />
              </div>

              <Button type="submit" label={MyUpdatProtion.name ? "Update Portion" : "Add Portion"} className="mt-2" />
            </form>
          </div>
        </div>
      </Dialog>}
    </div>
  );
}

export default Image;