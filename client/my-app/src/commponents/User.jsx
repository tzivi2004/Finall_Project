import { useState, useEffect } from "react"
import Axios from "axios"
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import Useradd from "./Useradd";
import { useSelector } from 'react-redux';
 

const Users=()=>{

const [users,setUsers] = useState([])

const [MyUpdatUser,SetMyUpdatUser]=useState([])

const [UserUpdateState,setUserUpdateState] = useState(false)
const {user, role,token } = useSelector((state) => state.token);

const getUser = async ()=> {
    try{
    const {data} = await Axios.get("http://localhost:1233/api/User",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    setUsers(data)
}
    catch(ex){
        <Button icon="pi pi-user-plus" label="Add User" onClick={()=>addUserEzer()} />
    }
}


const getYorUser = async ()=> {
    try{
        console.log("fghdh",user);
        console.log("jh",users);
        
        
    const {data} = await Axios.get(`http://localhost:1233/api/User/${user._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
    console.log("data",data);
    setUsers([data])
    console.log("hhhh",users);
    
    
    
}
    catch(ex){
        <Button icon="pi pi-user-plus" label="Add User" onClick={()=>addUserEzer()} />
    }
}

const deleteUser = async (id)=> {
    const {data} = await Axios.delete(`http://localhost:1233/api/User/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    getUser();
}

const updateUserEzer = (user)=>{
    SetMyUpdatUser(user)
    setUserUpdateState(true)
}

const addUserEzer = ()=>{
    SetMyUpdatUser({})
    setUserUpdateState(true)
}

useEffect(()=>{
     { role === "Admin" ? getUser() : role === "User" ? getYorUser() : <></> } 
},[])



const itemTemplate = (users) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                    <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                        <div className="flex flex-column gap-1">
                            <div className="text-2xl font-bold text-900">{users.name}</div>
                            <div className="text-700">{users.username}</div>
                        </div>
                        {/* <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-building"></i>
                                <span className="font-semibold">{user.address}</span>
                            </span>
                        </div> */}
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-envelope"></i>
                                <span className="font-semibold">{users.email}</span>
                            </span>
                        </div>
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-phone"></i>
                                <span className="font-semibold">{users.phone}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                        {role==="Admin"?<Button icon="pi pi-user-minus" label="Delet" onClick={()=>{deleteUser(users._id)}} ></Button>:<></>}
                        <Button icon="pi pi-user-edit" label="update"  onClick={()=>{ updateUserEzer(users)}}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

return (
    <>
    <div className="card">
        {
         UserUpdateState?<Useradd setUserUpdateState={setUserUpdateState}  visible={UserUpdateState}  setUsers={setUsers} users={users} SetMyUpdatUser={SetMyUpdatUser} MyUpdatUser={MyUpdatUser} getUser={getUser}></Useradd>:
    <><div className="card flex justify-content-center"> </div><DataScroller value={users} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" /> </>  
        }
    </div>
    </>
    
)
}


export default Users