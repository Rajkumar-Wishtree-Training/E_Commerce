import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
function Products(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [qty , setQty] = useState();
  const [status, setStatus] = useState(false);
  const [editId , setEditId] = useState(null);
  useEffect(async () => {
    try {
      const product = await axios.get("http://localhost:4000/products", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      setProducts(product.data);
    } catch (error) {
      props.showAlert("Something is Wrong", "danger");
    }
  }, [products,editId]);
  const onSubmitHandler = async(e) =>{
    try {
      e.preventDefault();
      const res = await axios.post('product',{
        name , price , description , status , qty
      },{
        headers:{
          Authorization : 'Bearer ' + props.token
        }
      })
      props.showAlert('Product Added' , 'success')
      setName('')
      setPrice('')
      setDescription('')
      setQty('')
      setStatus(false)
    } catch (error) {
      props.showAlert('Can not add product' , 'danger')
    }
  }
 
  const onClickHandler = async (id) =>{
         try {
           console.log(id)
           const res =  await axios.patch('http://localhost:4000/product/'+id , {
             name , price , status , qty
           },{
             headers:{
               Authorization : 'Bearer '+props.token
             }
           })
          props.showAlert('product updated successfully' , 'success')
          setEditId(null)
          setName('')
          setPrice('')
          setQty('')
          setStatus(false)
         } catch (error) {
           props.showAlert('can not update product' , 'danger')
           setEditId(null)
         }
  }
const onClickRemoveHandler = async (id) =>{
  try {
    await axios.delete('http://localhost:4000/product/'+id , {
      headers:{
        Authorization : 'Bearer '+props.token
      }
    })
    props.showAlert('Product Deleted' , 'success')
    setEditId(null)
  } catch (error) {
    setEditId(null)
    props.showAlert("You can't delete Product" , 'danger')
  }

}
  const togleStatus = () => {
    if(status){
      setStatus(false)
    }
    else{
      setStatus(true)
    }

  }
  return (
    <>
      <div className="row">
        <div className="col-4 addform border border-2">
          <h1 style={{ textAlign: "center" }}>Add Product</h1>
          <form method="post" onSubmit={onSubmitHandler}>
            <div class="mb-3">
              <label for="formGroupExampleInput" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="formGroupExampleInput2" class="form-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="formGroupExampleInput2" class="form-label">
                Quantity
              </label>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="formGroupExampleInput2" class="form-label">
                Description
              </label>
              <textarea class="form-control" id="formGroupExampleInput2" 
               value={description}
               onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={togleStatus}
                checked={status}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Status
              </label>
            </div>
            <div className="button">
              <button className="btn btn-warning">Add Product</button>
            </div>
          </form>
        </div>
        <div className="col-7">
        <h1 style={{ textAlign: "center" }}>List of Products</h1>
          <table className="table table-striped container border border-5">
           
            <tbody>
              <tr className="table table-dark">
                <th>Image</th>
                <th>name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {products.map((product, id) => {
                return (
                  <>                  <tr key={id}>
                    <td style={{width : '150px'}}>
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
                    <td>{product.qty}</td>
                    <td>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked={product.status}
                        />
                      </div>
                    </td>
                    <td><button className="btn btn-warning" onClick={() => setEditId(id)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={() => onClickRemoveHandler(product._id)}>Remove</button></td>
                  </tr>
                  {
                    id === editId && 
                    <tr key={editId}>
                      <td><input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /></td>
              <td>
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                id="formGroupExampleInput2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              </td>
              <td>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              </td>
              <td>
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={togleStatus}
                checked={status}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Status
              </label>
              </td>
              <td><button className="btn btn-success" onClick={() => onClickHandler(product._id)}>Save</button></td>
                    </tr>
                  }
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
