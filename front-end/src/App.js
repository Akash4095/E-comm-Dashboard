import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Product</h1>} />
        <Route path='/add' element={<h1>Product</h1>} />
        <Route path='/update' element={<h1>Product</h1>} />
        <Route path='/logout' element={<h1>Product</h1>} />
        <Route path='/profile' element={<h1>Product</h1>} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
