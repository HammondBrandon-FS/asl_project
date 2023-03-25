// App.js Parent Component
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import queryString from 'querystring';
import axios from 'axios';

function App() {
  // Set a variable for an empty state
  const [jwt, setJwt] = useState('');
  // useEffect to fetch our token from API -> GitHub
  useEffect(() => {
    async function fetchJwt() {
      const params = queryString.parse(window.location.search.replace(/^\?/, ''));
      localStorage.token = params.token;
      const response = await axios('http://localhost:3000/auth/token', {
        headers: {
          token : localStorage.token
        }
      })
      setJwt(response.data.name);
    }
    fetchJwt();
  }, []);

  if (!jwt) {
    return <Login />
  }

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={jwt ? true : false}/>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
