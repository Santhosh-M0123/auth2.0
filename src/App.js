import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Token from './pages/Token';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Profile from './pages/Profile';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<Home />}/>
            <Route path="/account" element={<Profile />}/>
          <Route path='/client' element={<Token />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
