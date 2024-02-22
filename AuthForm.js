import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {

  const authCtx=useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const[show,hide]=useState(false)
  const emailid=useRef()
  const password=useRef()
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
   function submitHandler(event){
     event.preventDefault()
     const email=emailid.current.value
     const passe=password.current.value
     if(isLogin){
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWAai-YRPJ8fRwGXSB0LiHg1JkaxQv-zo`,{
        method:'POST',
        body:JSON.stringify({
          email:email,
          password:passe,
          returnSecureToken:true
        }),
        headers:{
          'Content-type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
          // console.log(res.json())
          return res.json().then(data=>{
            console.log(data.idToken)
            authCtx.login(data.idToken)
            console.log(authCtx)
          })
        }
        else{
          return res.json().then(data=>{
            alert(data.error.message)
          }
            
            )
        }
      })
     }else{
      hide(true)
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWAai-YRPJ8fRwGXSB0LiHg1JkaxQv-zo`,{
        method:'POST',
        body:JSON.stringify({
          email:email,
          password:passe,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then(res=>{
        if(res.ok){
          //
        }
        else{
          return  res.json().then(data=>{
            console.log(data.error.message)
            alert(`${data.error.message}`)
          })
        }
      })
     }

   }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required 
          ref={emailid}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={password}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ?'Login': 'Create Account'}</button>
          {show && <p style={{color:"red"}}>Sending Request......</p>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
