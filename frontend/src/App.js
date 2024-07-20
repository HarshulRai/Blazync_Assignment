import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            {isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        </div>
    );
}

export default App;
