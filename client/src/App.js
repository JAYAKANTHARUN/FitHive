import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import Private from './components/Private'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductsList from './components/ProductsList'
import UpdateProduct from './components/UpdateProduct'
import Profile from './components/Profile'
import AdminLogin from './components/AdminLogin'
import AdminPrivate from './components/AdminPrivate'
import UserProducts from './components/UserProducts'
import Details from './components/Details'
import Cart from './components/Cart'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>FitHive</h1>} />
          <Route element={<AdminPrivate />}>
            <Route path='/admin' element={<ProductsList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
          </Route>
          <Route element={<Private />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/details/:id' element={<Details />} />
          <Route path='/userproducts' element={<UserProducts />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
