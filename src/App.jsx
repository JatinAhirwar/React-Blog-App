import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import { useEffect } from 'react';
import { login, logout } from './store/authSlice';
import { Footer } from './components';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Head from './components/Head/Head';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-900'>
      <div className=' w-full block'>
        <Head />
        <main className=' text-white' >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
