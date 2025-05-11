import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 py-10">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">🍽️ Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        <button
          onClick={() => navigate('/admin/add-food')}
          className="btn bg-orange-600 text-white hover:bg-orange-700 w-full"
        >
          ➕ Add Food Item
        </button>
        <button
          onClick={() => navigate('/admin/edit-food')}
          className="btn bg-yellow-500 text-white hover:bg-yellow-600 w-full"
        >
          ✏️ Edit Food Item
        </button>
        <button
          onClick={() => navigate('/admin/delete-food')}
          className="btn bg-red-600 text-white hover:bg-red-700 w-full"
        >
          🗑️ Delete Food Item
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
