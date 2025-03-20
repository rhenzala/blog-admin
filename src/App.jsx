import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin")) || null;
  });

  useEffect(() => {
    try {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    } catch (error) {
        console.error("Error parsing admin from localStorage:", error);
        setAdmin(null);
    }
}, []);


  return (
    <Router>
      <Header admin={admin} setAdmin={setAdmin} />
      <Main admin={admin} setAdmin={setAdmin} />
    </Router>
  );
}

export default App;
