import './App.css';
import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={ <h1>FitHive</h1> }/>
        <Route path='/products' element={ <h1>Products</h1> }/>
        <Route path='/add' element={ <h1>Add Products</h1> }/>
        <Route path='/update' element={ <h1>Update Products</h1> }/>
        <Route path='/delete' element={ <h1>Delete Products</h1> }/>
        <Route path='/profile' element={ <h1>Profile</h1> }/>
      </Routes>
      </BrowserRouter>
      <Footer />  
    </div>
  );
}

export default App;
