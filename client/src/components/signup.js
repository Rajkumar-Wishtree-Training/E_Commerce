import React , {useState , useEffect} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import './signup.css'

function Signup(props) {
    const navigate = useNavigate();
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    // const [isSigned , setIsSigned] = useState(false);
    useEffect(()=>{
        
    },[name]);

    const onClickHandler = async (e) =>{
        try {
           
            e.preventDefault();
            const user = {name , email , password};
            const res = await axios.post('/user' , user);
            console.log(res);
            if(res.status === 201){
                console.log('status')
                props.togleIsSigned();
                setName('');
                setEmail('');
                setPassword('');
                props.showAlert(`Welcome ${name}`, 'success')
                props.showToken(res.data.token)
                // setIsSigned(true);
                navigate('/');
               
            }
        } catch (error) {
            console.log(error)
        }
      

    }
  return (
      <>
     {
         props.isSigned ||
         <div className='container signup'>
   
      <h1 className='head'>Sign Up</h1>
      <form method='post' onSubmit={onClickHandler}>
          <div className="mb-3">
              <label htmlFor="name" className='form-label'>Name</label>
              <input type="text" className='form-control' id='name' onChange={(e)=>setName(e.target.value)} />
          </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
  </div>
   <div className="button">
   <button type="submit" className="btn btn-warning" >Submit</button>
   <p>Already have an Account <Link to='/signin'>Login</Link> </p>
   </div>
  
</form>
    </div>
     }
    </>
  )
}

export default Signup
