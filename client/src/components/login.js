import React , {useState , useEffect} from 'react'
import { useNavigate , Link } from 'react-router-dom';
// import Alert from './alert'
import './signup.css'
import axios from 'axios';
function Signin(props) {
  const navigate = useNavigate();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const [invalid , setInValid] = useState(false);

  useEffect(() => {
    
  },[invalid])
  const onSubmitHandler = async (e) =>{
          e.preventDefault();
          try {
            const res = await axios.post('user/login',{
              email , password
            })
            if(!res){
              setInValid(true)
            }
            props.togleIsSigned();
            props.showAlert(`LogedIn Successfully`, 'success')
            props.showToken(res.data.token)
            if(res.data.isAdmin){
              props.showIsAdmin()
            }
            navigate('/');
          } catch (error) {
            setInValid(true)
            console.log(error)
            
          }
          
  }
  return (
    
    <div className='container signup'>
     
      <h1 className='head'>Login</h1>
      {
        invalid && <div class="alert alert-danger container" role="alert" style={{textAlign : 'center'}}>
        Unable to Login
      </div>
      }
      <form method='post' onSubmit={(e) => onSubmitHandler(e)} onFocus={() =>setInValid(false)}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <div className="button">
  <button type="submit" class="btn btn-warning my-3">Login</button>
  <p>Don't have an Account <Link to='/signup'>Sign Up</Link> </p>
  </div>
</form>
    </div>
  )
}

export default Signin
