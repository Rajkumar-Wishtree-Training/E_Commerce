import React , {useState , useEffect} from 'react'
import axios from 'axios'
function Users(props) {
    const [users , setUsers] = useState([])
    useEffect(async()=>{
        try {
            const user = await axios.get('http://localhost:4000/users',{
                headers:{
                    Authorization : 'Bearer ' + props.token
                }
            })
            setUsers(user.data);    
        } catch (error) {
            props.showAlert('Something went wrong' , 'danger')
        }
         
    },[])
  return (
    <div>
        <h1 style={{textAlign : 'center'}}>List Of Users</h1>
        <table className="table table-striped container border border-4" style={{width:"50%"}}>
            <tbody>
                <tr className='table table-dark'>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
                {
                    users.map((user, id) =>{
                        return(
                            <tr key={id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <span className='text-success'>Admin</span> : <span className='text-warning'>User</span>}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Users
