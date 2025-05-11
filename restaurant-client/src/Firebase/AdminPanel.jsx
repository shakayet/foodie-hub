import { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [
  { name: 'Drinks', endpoint: 'drinks' },
  { name: 'Cookies', endpoint: 'cookies' },
  { name: 'Groceries', endpoint: 'groceries' },
  { name: 'Rice', endpoint: 'rice' },
  { name: 'Fast Food', endpoint: 'fastfood' },
  { name: 'Popular', endpoint: 'popular' },
];

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', image: '', price: '', _id: null });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/${selectedCategory}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/${selectedCategory}`;
    try {
      if (form._id) {
        await axios.put(`${url}/${form._id}`, form);
      } else {
        await axios.post(url, form);
      }
      setForm({ name: '', image: '', price: '', _id: null });
      fetchProducts();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:5000/api/${selectedCategory}/${id}`;
      await axios.delete(url);
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const Button = ({ children, onClick, type = 'button', className = '' }) => (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Product Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.endpoint}
            onClick={() => setSelectedCategory(cat.endpoint)}
            className={`px-4 py-2 rounded font-semibold ${
              selectedCategory === cat.endpoint
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <Button type="submit" className="col-span-1 md:col-span-3">
          {form._id ? 'Update Product' : 'Add Product'}
        </Button>
      </form>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-orange-50 p-4 rounded shadow flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-orange-600 font-bold">${item.price}</p>
            <div className="flex gap-2 mt-3">
              <Button onClick={() => handleEdit(item)}>Edit</Button>
              <Button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
