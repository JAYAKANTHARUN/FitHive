import './App.css';
import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import Private from './components/Private'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import Products from './components/Products'
import UpdateProduct from './components/UpdateProduct'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route path='/' element={ <h1>FitHive</h1> }/>
        
        <Route element={ <Private /> } >
        <Route path='/products' element={ <Products /> }/>
        <Route path='/add' element={ <AddProduct /> }/>
        <Route path='/update/:id' element={ <UpdateProduct /> }/>
        {/* <Route path='/delete' element={ <h1>Delete Products</h1> }/> */}
        <Route path='/profile' element={ <Profile /> }/> 
        </Route>
        <Route path='/signup' element={ <SignUp /> }/>
        <Route path='/login' element={ <Login /> }/>

        
      </Routes>
      </BrowserRouter>
      <Footer />  
    </div>
  );
}

export default App;
