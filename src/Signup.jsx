import React,{useEffect,useState} from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from './firebase.config'
import Items from './Items';

export default function Signup() {
  
  const navigate = useNavigate()
  const [user,setUser] = useState({
    email: '',
    password: ''
  })

  const googleHandler = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('user-info: ',user.displayName)
            console.log(user.uid)
            sessionStorage.setItem('auth_token', user.uid)
            sessionStorage.setItem('displayName',user.displayName)
            sessionStorage.setItem('email',user.email)

            navigate("/users")
            // redux action? --> dispatch({ type: SET_USER, user });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

  const SignupWithEmailandPassword = () => {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, user.email, user.password)
    .then(response=> {
      sessionStorage.setItem('auth_token', response._tokenResponse.refreshToken)
      navigate('/users')
    }).catch((error) => {
      if(error.code === 'auth/weak-password'){
        toast.error('Enter strong password with min length of 6');
      }
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email Already in Use');
      }
    })
  }

  const handleClick=(id)=>{
      console.log("Button: ",id," Clicked !!")
  }

  const data =[1,2,3,4]


  const LoginWithEmailAndPassword=()=>{
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, user.email, user.password)
        .then((response) => {
          navigate('/users')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
        })
  }

  return (
    <div>
      <ToastContainer />
      <center>
      <h3 className='col-12 text-primary my-5'>Signup Page !!!</h3>
      <div className='col-8'>
          <input type="text" onChange={(e)=> setUser({...user,email: e.target.value})} className='m-2 p-2' placeholder='Email: johndoe@gmail.com' /><br />
          <input type="text" onChange={(e)=> setUser({...user,password: e.target.value})} className='m-2 p-2' placeholder='password' /><br />
          <div className='row-12'>
            <button onClick={()=> SignupWithEmailandPassword()} className='col-3 btn btn-success'>Register</button>
            <button onClick={()=> LoginWithEmailAndPassword()} className='col-3 btn btn-primary mx-2'>Signin</button>
          </div>
      </div>
      <label htmlFor="" className='my-3 text-secondary'>Or Signin with</label>
      <div className='col-12'>
          <button className='col-2 btn btn-danger py-3' onClick={googleHandler}>Google</button>
          <button className='col-2 btn btn-primary py-3 mx-4'>Twitter</button>
      </div>

      {
        data.map((x,id)=>{
          return(
            <Items key={id} data={x} onClick={handleClick} />
          )
        })
      }

      <Link to="/tests">Move To Test Page</Link>
      </center>
    </div>
  )
}
