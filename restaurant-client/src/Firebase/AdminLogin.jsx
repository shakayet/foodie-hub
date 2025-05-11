import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from './firebase.config';
import axios from 'axios';
import Swal from 'sweetalert2';

const provider = new GoogleAuthProvider();

const AdminLogin = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (user?.email) {
        setUserEmail(user.email);
  
        // 🔸 Save user to database
        await axios.post('http://localhost:5000/api/user', {
          email: user.email,
        });
  
        // 🔸 Check if the user is an admin
        const res = await axios.get(`http://localhost:5000/api/user/admin/${user.email}`);
        if (res.data?.isAdmin) {
          navigate('/admin-panel');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'Sorry! You are not an Admin.',
          });
        }
      }
    } catch (err) {
      console.error('Login Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
      });
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-300 via-orange-100 to-white">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-sm w-full text-center border border-orange-100">
        <h2 className="text-3xl font-bold text-orange-700 mb-4">Admin Login</h2>
        <p className="text-sm text-gray-600 mb-6">Sign in with Google to access the Admin Panel</p>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 w-full"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
