import React, { useState } from 'react';

function PortionForm() {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: ''
  });
  // שלב 1: העלאת תמונה לשרת
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('http://localhost:1234/api/Portion/upload-image', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.imageUrl; // הנתיב של התמונה
  };

  // שלב 2: שליחת Portion חדש עם הנתיב של התמונה
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (file) {
      imageUrl = await uploadImage(file);
    }
    const portionData = {
      ...form,
      image: imageUrl
    };
    await fetch('http://localhost:1234/api/Portion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(portionData)
    });
    alert('Portion added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input type="text" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input type="text" placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="text" placeholder="Ingredients" onChange={e => setForm({ ...form, ingredients: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Add Portion</button>
    </form>
  );
}

export default PortionForm;