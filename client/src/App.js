
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ButtonAppBar from './Components/ButtonAppBar';
import Product from './Components/Product';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/Product' element={<Product/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
