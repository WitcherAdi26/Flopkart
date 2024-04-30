import React, { useState } from 'react';
import "./LoginRegistrationPage.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/AppContext.js';
import { useAuthContext } from '../Context/AppContext.js';

const LoginPage = (props) => {
    const navigate=useNavigate();
    const location=useLocation();

    console.log(location.state);
    // const prevPath=location.state.prevPath;

    const {updateUserState}=useUserContext();

    const [visibility,setVisibility]=useState(false);

    function handleVisibility(){
        setVisibility(!visibility);
    }

    const [inputData,setInputData]=useState({
        username:"",
        password:""
    });

    function handleInputChange(event){
        const {value,name}=event.target;
        // setInputData({...inputData,[name]:value});
        setInputData(prevValue=>{
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const [credentialStatus,setCredentialStatus]=useState(false);

    function handleCredentialStatus({credVal}){
        setCredentialStatus(credVal);
    }

    const [msg,setmsg]=useState("");

    function handleMessage({message}){
        setmsg(message);
    }

    const {storeTokenInLS}=useAuthContext();

    const verifyUser=async(e)=>{
        e.preventDefault();

        // console.log(inputData);
        const res=await fetch("http://localhost:8080/api/login",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(inputData),
        }); 

        const data=await res.json();
        console.log(res.status);
        console.log(data.msg);
        console.log(data);
        if(res.status!==201){
            const message=data.msg;
            handleMessage({message});
            const credVal=true;
            handleCredentialStatus({credVal});            
        }else if(res.status===201){
            storeTokenInLS(data.userdata.token);
            updateUserState({
                type:"username",
                payload:inputData.username
            });
            updateUserState({
                type:"id",
                payload:data.id
            });
            updateUserState({
                type:"loginStatus",
                payload:true
            });
            updateUserState({
                type:"cart",
                payload:data.cart
            });

            const credVal=false;
            handleCredentialStatus({credVal}); 
            navigate(location.state.prevPath);
        }
    }

    function CredentialStatusMessage(){
        if(credentialStatus){
            return (
                <span style={{color:"red"}}>*{msg}*</span>
            );
        }
        return null;
    }

  return (
    <div className='login-main'>
        <div className='login-wrapper'>
            <form method='post'>
                <h1>Login</h1>

                <div className="input-field">
                    <input name="username" onChange={handleInputChange} type="text" placeholder="Username" value={inputData.username} required />
                    <PersonOutlineOutlinedIcon/>
                </div>
                <div className="input-field">
                    <input name="password" onChange={handleInputChange} type={visibility?"text":"password"} placeholder="Password" value={inputData.password} required />
                    <div onClick={handleVisibility} style={{display:"flex",alignItems:"center",paddingRight:"11px"}}>
                        {visibility?<VisibilityOutlinedIcon />:<VisibilityOffOutlinedIcon />}
                    </div>
                </div>

                <CredentialStatusMessage />
                
                <button type="submit" onClick={verifyUser}>Login</button>
                
                <div className='register-link'>
                    <p>Don't have an account? <NavLink to="/register" state={{prevPath:location.state.prevPath}}>Register</NavLink></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
