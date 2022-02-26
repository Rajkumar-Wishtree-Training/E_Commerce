import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
function Userdetails(props) {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [clickPressed, setClickPressed] = useState(false);
  // const [isUpdated , setIsUpdated] = useState(false)
  useEffect(async () => {
    try {
      const user = await axios.get("http://localhost:4000/user", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      setUserData(user.data);
    } catch (error) {
      props.showAlert("Can't find your details", "danger");
    }
  }, [clickPressed]);
  const onClickEditUser = async (e) => {
    try {
      e.preventDefault();
      const result =  await axios.patch('http://localhost:4000/user',{
            name , email , password
        },{
            headers:{
                Authorization : 'Bearer '+props.token
            }
        })
        console.log(result)
        // console.log(res);
        
        props.showAlert('Updated Successfully' , 'success')
        // clickPressed(false)
        setClickPressed(false)
        // navigate('/userdetails')
    } catch (error) {
        props.showAlert("Can't update" , 'danger')
    }
  };
  return (
    <div>
      <div className="card text-center container bg-dark text-light border border-5">
        <div className="card-header">
          <h2>User Details</h2>
        </div>
        <div className="card-body">
          <h5 className="card-title">Name : {userData.name}</h5>
          <p className="card-text">Email: {userData.email}</p>
          <p className="card-text">Hashed Password: {userData.password}</p>
          <button
            className="btn btn-warning"
            onClick={() => setClickPressed(true)}
          >
            Edit User
          </button>
        </div>
        <div className="card-footer text-muted">
          
        </div>
      </div>
      {clickPressed && (
            <form  className="container border border-5 my-5" style={{width : '40%'}} onSubmit={onClickEditUser}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{textAlign:'center'}}>
              <button type="submit" className="btn btn-warning my-3">
                Update
              </button>
              </div>
            </form>
          )}
    </div>
  );
}

export default Userdetails;
