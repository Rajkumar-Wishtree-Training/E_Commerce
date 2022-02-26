import React , {useEffect , useState} from 'react'
import axios from 'axios'
import './home.css'
import {Link , useNavigate} from 'react-router-dom'
function Home(props) {
    const navigate  = useNavigate();
    const [products , setProducts] = useState([]);
    const [isAdded , setIsAdded] = useState(false);
    const [keyWord , setKeyword] = useState("");
useEffect(async ()=>{
    const res =await axios.get('product')
    setProducts(res.data);
},[isAdded])
const onClickHandler = async (id) =>{
  try {
    props.isSigned || 
    await axios.post(`addtocart/${id}` , {} ,{
      headers:
      {
        'Authorization' : `Bearer ${props.token}`
      }
    })
    props.showAlert('Added to cart' , 'success')
  } catch (error) {
    // props.showAlert('Can not add product in cart' , 'danger')
    navigate('/signin')

  }
}
  return (
   
    <div>
 <h1 className='head'>Welcome to Ecommerce</h1>
 <div class="input-group mb-3 search">
  <input type="text" class="form-control border border-2 border-dark" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" value={keyWord} onChange={(e) => setKeyword(e.target.value)}/>
</div>
 <div className="container product">
 {
       products.map((product , id) =>{
         return(
            (!keyWord  || product.name.toLowerCase().includes(keyWord)) &&
            <div key={id} className="card" style={{"width": "18rem"}}>
            <img src={product.image} className="card-img-top" alt="Image"/>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <h5 className="card-title text-success">₹ {product.price}</h5>
              <p className="card-text">{product.description}</p>
              <button onClick={() => onClickHandler(product._id)} className="btn btn-primary">Add to Cart</button>
              
            </div>
          </div>
         )
       
     })
 }
 </div>

      
 </div>
  )
}

export default Home
