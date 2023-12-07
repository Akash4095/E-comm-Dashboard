import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Signup from './components/signup';
import ProtectedRoute from './components/protectedRoute';
import Login from './components/login';
import AddProduct from './components/addProduct';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<h1>Product</h1>} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update' element={<h1>Product</h1>} />
          <Route path='/profile' element={<h1>Product</h1>} />
          <Route path='/logout' element={<h1>Product</h1>} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
