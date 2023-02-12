import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config'

function Users() {
  const navigate = useNavigate()
  const [isLoaded,setIsLoaded] = useState(false)
  const [data,setData] = useState([])
  const [user,setUser] = useState({
    name: "Daniel",
    email: "daniel@gmail.com",
    tel: "+237 671307800"
  })

  useEffect(()=>{
    if(!checkUserLogged())
        navigate("/")
    
    checkSigninWithGmail()
    fetchUsers()
  },[])

  const checkSigninWithGmail=()=>{
    if(sessionStorage.getItem('email')!=null && sessionStorage.getItem('displayName')!=null){
        setUser({...user,name: sessionStorage.getItem('displayName'),email: sessionStorage.getItem('email')})
    }
  }

  const fetchUsers = ()=>{
    //  db.collection('users')
    //   .get()
    //   .then((snapshot)=>{
    //     let arr = []
    //     snapshot.docs.map((doc)=>{
    //       arr.push(doc.data())
    //     })
    //     setData(arr)
    //   })
     
    //   setIsLoaded(true)
  }

  const checkUserLogged=()=>{
    let authToken = sessionStorage.getItem('auth_token')
    if (!authToken)
        return false

    return true
  }

  signOut(auth)
    .then(() => {
        console.log('logged out');
        navigate('/');
    })
    .catch((error) => {
        console.log(error);
    });

  return (
    <div className="App">

       <div className='col-12' style={{ width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',marginTop:'5%' }}>
            <span className="badge bg-primary text-white p-2 mx-2">{user.name}</span>
            <span className="badge bg-warning text-white p-2 mx-2">{user.email}</span>
            <span className="badge bg-secondary text-white p-2 mx-2">{user.tel}</span>
            <button className='btn btn-danger mx-3'>Signout</button>
        </div> 

      {
        !isLoaded ? 
        <center>
        <div className="row-12" style={{ marginTop:'19%'}}>
          <div className="progress col-8">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%"}}></div>
          </div>
          <h5 className='col-3 text-primary'>Loading Data from DB !!!</h5>
        </div>
        </center>
       :

      <table class="table" border={1} style={{ width: "80%",marginLeft: '5%',marginTop:'10%'}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index)=>{
              return(
                <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table> 
      }
    </div>
  );
}

// const updateInput=(input)=>{
//   let arr = [...countryListDefault]
//   const filtered = arr.filter(country => {
//     return country.name.toLowerCase().includes(input.toLowerCase())
//   })
//   setCountryList(filtered)
// }

export default Users;
