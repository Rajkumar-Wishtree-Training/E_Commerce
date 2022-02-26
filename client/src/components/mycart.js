import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mycart.css";
function Mycart(props) {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [productremove , setProductRemove] = useState(false)
  // const [amount , setAmount] = useState(0);
  // const [tax , setTax] = useState();
  // const [total , setTotal] = useState();
  const showProductRemove = () =>{
    if(productremove) setProductRemove(false);
    setProductRemove(true);
  }
  let amount = 0;
  let tax = 0;
  let total = 0;
  let shipCharge = 125;
  useEffect(async () => {
    console.log(props.token);
    const res = await axios.get("http://localhost:4000/mycart", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    console.log(res.data);
    setProducts(res.data);
  }, [contact , productremove]);
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const res =  await axios.post('http://localhost:4000/order',{
        address , contact ,
        amount : total 
      } , { 
        headers: {
        Authorization: `Bearer ${props.token}`,
      }
    }).then(() =>{
        setAddress('')
        setContact('')
      })
      console.log(res)
      props.showAlert('Order Placed Success fully' , 'success') 
    } catch (error) {
      props.showAlert('Can not Place order' , 'danger')
    }
  }

  const onClickRemoveHandler = async (id) => {
      try {
        const res = await axios.delete('http://localhost:4000/deletemycart/'+id , 
        { 
          headers: {
          Authorization: `Bearer ${props.token}`,
        }
      }).then(()=>showProductRemove())
      } catch (error) {
        props.showAlert('product not Deleted' , 'danger')
      }
  } 

  return (
    <>
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Cart Details</h1>
        <div className="col">
          <table className="table table-striped border border-4">
            <tbody>
              <tr className="table-dark">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                {/* <th>Description</th> */}
                <th>Remove</th>
              </tr>
              {products.map((product, id) => {
                //  {setAmount(amount + product.price)}
                amount = amount + product.price;
                return (
                  <tr key={id}>
                    <td>
                      <img
                        style={{
                          width: "100px",
                          height: "50px",
                          textAlign: "center",
                        }}
                        src={product.image}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    {/* <td>{product.description}</td> */}
                    <td>
                      <button className="btn btn-danger" onClick={() => onClickRemoveHandler(product._id)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
              {
                //   setTax(amount*0.2) , setTotal(amount + tax + shipCharge)
                ((tax = 0.2 * amount), (total = amount + tax + shipCharge))
              }
            </tbody>
          </table>
        </div>
        <div className="col">
          <div class="card" style={{ width: "18rem", margin: "auto" }}>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Order Amount : <strong>{amount}</strong>
              </li>
              <li class="list-group-item">
                Sales Tax: <strong>{tax.toFixed(1)}</strong>
              </li>
              <li class="list-group-item">
                Shipping Charges: <strong>{amount === 0 ? 0 : shipCharge} </strong>
              </li>
            </ul>
            <div class="card-footer">
              Total: <strong>{amount === 0 ? 0 : total} </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="order">
          <form method="post" onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Addres
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="button">
              <button className="btn btn-warning">Place Order</button>
            </div>
          </form>
        </div>
    </>
  );
}

export default Mycart;
