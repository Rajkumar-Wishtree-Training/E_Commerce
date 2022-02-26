import React , {useState , useEffect} from 'react'
import axios from 'axios'
function Orders(props) {
    const [orders , setOrders] = useState([]);
    useEffect(async () =>{
        const order = await axios.get('http://localhost:4000/order',{
            headers:{
                Authorization: 'Bearer ' + props.token 
            }
        })
        console.log(order)
        setOrders(order.data);
    },[])
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Placed Orders</h1>
      <table className="table table-striped container border border-4">
          <tbody>
              <tr className='table table-dark'>
                  <th>UserID</th>
                  <th>Adress</th>
                  <th>Contact</th>
                  <th>Amount</th>
              </tr>
              {
                  orders.map((order , id) =>{
                      return(
                          <tr key={id}>
                          <td>{order.user_id}</td>
                          <td>{order.address}</td>
                          <td>{order.contact}</td>
                          <td className='text-success'> <strong> ₹:{order.amount}</strong></td>
                          </tr>
                      )
                  })
              }
          </tbody>
      </table>
    </div>
  )
}

export default Orders
