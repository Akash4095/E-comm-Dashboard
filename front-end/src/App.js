import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';

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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
