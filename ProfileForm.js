import classes from './ProfileForm.module.css';

import { useRef ,useContext} from 'react';

import AuthContext from '../../store/auth-context';



const ProfileForm = () => {
  const updateRef=useRef()
  const authCtx=useContext(AuthContext)

  function updatePassowrd(event){
    event.preventDefault()
    const update=updateRef.current.value
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBWAai-YRPJ8fRwGXSB0LiHg1JkaxQv-zo`,{
      method: 'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:update,
        returnSecureToken:true
      }),
      headers:{
        "Content-Type":'application/json'
      }

    }).then(res=>{
      
    })
    console.log(update)

  }
  return (
    <form className={classes.form} onSubmit={updatePassowrd}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={updateRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
