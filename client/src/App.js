import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home'
import Signup from './components/signup';
import Signin from './components/login';
import Alert from './components/alert';
import Mycart from './components/mycart';
import Orders from './components/orders';
import Products from './components/products';
import {useState} from 'react'
import {Routes , Route , navigate , Link} from 'react-router-dom'
import Users from './components/users';
import Userdetails from './components/userdetails';
function App() {
  const [isSigned , setIsSigned] =  useState(false);
  const [alert , setAlert] = useState(null);
  const [token , setToken] = useState(); 
  const [isAdmin , SetIsAdmin] = useState(false);
  const showIsAdmin = async () =>{
     SetIsAdmin(true)
  }
  const togleIsSigned = () => {
    if(isSigned){
      setIsSigned(false)
      SetIsAdmin(false)
      setToken('')
    }
    else{
      setIsSigned(true);
    }
    
  }
  const showAlert = (msg , type) =>{
    setAlert({
      message : msg,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  const showToken = (token) =>{
         setToken(token);
  }
  return (
    <>
    <Navbar isSigned={isSigned} isAdmin={isAdmin} showAlert={showAlert} token={token} togleIsSigned={togleIsSigned}/>
    <Alert alert={alert}/>
    {/* <Home/> */}
    
    <Routes>
      <Route path='/' element={<Home token={token} showAlert={showAlert}/>}/>
      <Route path='/signin' element={<Signin showToken={showToken} togleIsSigned={togleIsSigned} showAlert={showAlert} showIsAdmin={showIsAdmin}/>}/>
      <Route path='/signup' element={<Signup showToken={showToken} togleIsSigned={togleIsSigned} isSigned ={isSigned} showAlert={showAlert}/>}/>
      <Route path='/mycart' element={<Mycart token={token} showAlert={showAlert}/>}/>
      <Route path='/orders' element={<Orders token={token} isAdmin={isAdmin}/>}/>
      <Route path='/users' element={<Users token={token} isAdmin={isAdmin} showAlert={showAlert}/>}/>
      <Route path='/products' element={<Products isAdmin={isAdmin} token={token} showAlert={showAlert}/>}/>
      <Route path='/userdetails' element={<Userdetails token={token} showAlert={showAlert}/>}/>
    </Routes>
    {/* <Signup togleIsSigned={togleIsSigned} isSigned ={isSigned} showToken={showToken} showAlert={showAlert}/> */}
    </>
  );
}

export default App;
