import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  LoginDemo  from "./commponents/login"
import Home  from './commponents/Home'; 
<<<<<<< HEAD
import Menu  from './commponents/menu';
import ProductsInStock from './commponents/ProductsInStock'; 
=======

>>>>>>> 58b5029e72782bd7ad3819a7755c0c8a09928d74
function App() {
    return (
        <>
            <Router>
                <Home></Home>
                <Routes>
                    <Route path='/' element={<h1>wellcome!!!</h1>}></Route>
                    <Route path='/login' element={<LoginDemo/>}></Route>
<<<<<<< HEAD
                    <Route path='/menu' element={<Menu/>}></Route>
                    <Route path='/products' element={<ProductsInStock/>}></Route>
=======
>>>>>>> 58b5029e72782bd7ad3819a7755c0c8a09928d74
                </Routes>
            </Router></>
    )
}

export default App;
