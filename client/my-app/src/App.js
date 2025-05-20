import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  LoginDemo  from "./commponents/login"
import Home  from './commponents/Home'; 

import Menu  from './commponents/menu';
import ProductsInStock from './commponents/ProductsInStock'; 
import { useDispatch,useSelector } from 'react-redux';

function App() {
    const { token, role, user } = useSelector((state) => state.token);

    return (
        <>
              { role=="Admin" ?<Home></Home>:role=="User"?<Home></Home>:<h1>אתה לא מחובר</h1>}
                <Routes>
                    <Route path='/' element={<h1>wellcome!!!</h1>}></Route>
                    <Route path='/login' element={<LoginDemo/>}></Route>
                    <Route path='/menu' element={<Menu/>}></Route>
                    <Route path='/products' element={<ProductsInStock/>}></Route>

                </Routes>
            </>
    )
}

export default App;
