import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginDemo from "./commponents/login"
import Home from './commponents/Home';

import Menu from './commponents/menu';
import ProductsInStock from './commponents/ProductsInStock';
import HomeUser from './commponents/Home User';
import HomeAdmin from './commponents/HomeAdmin';
import { useDispatch, useSelector } from 'react-redux';
import PortionForm from './commponents/image';

function App() {
    const { token, role, user } = useSelector((state) => state.token);

    return (
        <>
            <HomeAdmin></HomeAdmin>
            {/* { role=="Admin" ?<HomeAdmin></HomeAdmin>:role=="User"?<HomeUser></HomeUser>:<Home></Home>} */}
            <Routes>
                <Route path='/' element={<h1>wellcome!!!</h1>}></Route>
                <Route path='/login' element={<LoginDemo />}></Route>
                <Route path='/menu' element={<Menu />}></Route>
                <Route path='/products' element={<ProductsInStock />}></Route>
                <Route path='/image' element={<PortionForm />}></Route>

            </Routes>
        </>
    )
}

export default App;
