import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Signup from './components/signup';
import ProtectedRoute from './components/protectedRoute';
import Login from './components/login';
import AddProduct from './components/addProduct';
import ProductList from './components/productList';
import UpdateProduct from './components/updateProduct';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<ProductList />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct />} />
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
