import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginDemo from "./commponents/login"
import Menu from './commponents/menu';
import ProductsInStock from './commponents/ProductsInStock';
import HomeAdmin from './commponents/HomeAdmin';
import { useDispatch, useSelector } from 'react-redux';
import Image from './commponents/image';
import Order from './commponents/Orders';
import AddOrder from './commponents/MakAnOrder'
// import User from './commponents/Users';
import Users from './commponents/User';
import AdvancedDemo from './commponents/Galery';
import 'quill/dist/quill.snow.css'; // סגנון Snow
import 'quill/dist/quill.bubble.css'; // סגנון Bubble (אם נדרש)
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
                <Route path='/image' element={<Image />}></Route>
                <Route path='/orders' element={<Order />}></Route>
                <Route path='/makeOrders' element={<AddOrder />}></Route>
                <Route path='/user' element={<Users />}></Route>
                <Route path='/gallery' element={<AdvancedDemo />}></Route>
            </Routes>
        </>
    )
}

export default App;
