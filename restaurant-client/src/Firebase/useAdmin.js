import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase.config';
import axios from 'axios';

function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        const res = await axios.get(`http://localhost:5000/api/users/admin/${user.email}`);
        setIsAdmin(res.data.isAdmin);
      }
    });
    return () => unsubscribe();
  }, []);

  return isAdmin;
}

export default useAdmin;
