import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  LoginDemo  from "./commponents/login"
import Home  from './commponents/Home'; 

import Menu  from './commponents/menu';
import ProductsInStock from './commponents/ProductsInStock'; 

function App() {
    return (
        <>
            <Router>
                <Home></Home>
                <Routes>
                    <Route path='/' element={<h1>wellcome!!!</h1>}></Route>
                    <Route path='/login' element={<LoginDemo/>}></Route>
                    <Route path='/menu' element={<Menu/>}></Route>
                    <Route path='/products' element={<ProductsInStock/>}></Route>

                </Routes>
            </Router></>
    )
}

export default App;
