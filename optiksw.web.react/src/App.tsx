import './scss/styles.scss';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import Home from './pages/Home.tsx';
import Orders from './pages/Orders.tsx';
import Order from './components/Orders/Order.tsx';
import Customers from './pages/Customers.tsx';
import NoPage from './pages/NoPage.tsx';
import CustomersCreate from './components/Customers/CustomersCreate/CustomersCreate.tsx';
import OrderCreate from './components/Orders/OrderCreate/OrderCreate.tsx';
//import { useState } from 'react';
//import Login from './pages/Login.tsx';

function App() {

    //const [token, setToken] = useState(null);

    //if (!token) {
    //    import('../vendor/smart-admin-4-5-1/content/page/page_login_alt/page-login-alt.scss');
    //    return <Login logoUrl="../vendor/smart-admin-4-5-1/img/logo.png" title="Optik SW" />
    //}

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/create" element={<OrderCreate />} />
                <Route path="/orders/:id" element={<Order />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/create" element={<CustomersCreate />} />
                <Route path="*" element={<NoPage />} />
            </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
