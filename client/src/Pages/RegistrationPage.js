import React, { useState } from 'react';
import "./LoginRegistrationPage.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';

const RegistrationPage = () => {
    const navigate=useNavigate();
    const location=useLocation();

    

    const [visibility,setVisibility]=useState(false);

    function handleVisibility(){
        setVisibility(!visibility);
    }

    const [inputData,setInputData]=useState({
        username:"",
        email:"",
        password:""
    });

    function handleInputChange(event){
        const {value,name}=event.target;
        setInputData({...inputData,[name]:value});
        // [name]: value
        // callUpdateUserRegisterStatus({type:name,payload:value});
    }

    const [msg,setmsg]=useState("");

    function handleMessage(message){
        setmsg(message);
    }

    const registerUser=async(e)=>{
        e.preventDefault();

        // callUpdateUserRegisterStatus({type:"trigger",payload:true});
    
        // let responseStatus=await registerStatus;
        // let responseMessage=await message;

        // const timeout=setTimeout(temp,5000);

        // function temp(){
        //     console.log(registerStatus);
        //     console.log(message);
        //     if(registerStatus!==201){   
        //         handleMessage(message);
        //         const credVal=true;
        //         handleCredentialStatus({credVal});            
        //     }else if(registerStatus===201){
        //         const credVal=false;
        //         handleCredentialStatus({credVal}); 
        //         navigate("/login",{state:{prevPath:location.state.prevPath}});
        //     }
        //     console.log("waited");
        // };

        // callUpdateUserRegisterStatus({
        //     type:"trigger",
        //     payload:false
        // });



        // console.log(responseMessage);


        // let response;
        // if(registerStatus===null){
        //     response=await registerStatus;
        // }

        // statusDisplay=async (status)=>{
        //     responseStatus=await status;
        // }

        // msgDisplay=async (msg)=>{
        //     responseMessage=await msg;       
        // }

        



        const res=await fetch("http://localhost:8080/api/register",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(inputData),
        }); 

        const data=await res.json();
        // console.log(res.status);
        // console.log(data.msg);
        if(res.status!==201){
            const message=data.msg;
            handleMessage(message);
            const credVal=true;
            handleCredentialStatus({credVal});            
        }else if(res.status===201){
            const credVal=false;
            handleCredentialStatus({credVal}); 
            // window.location.replace("/login");
            navigate("/login",{state:{prevPath:location.state.prevPath}});
        }
    }

    const [credentialStatus,setCredentialStatus]=useState(false);

    function handleCredentialStatus({credVal}){
        setCredentialStatus(credVal);
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
                <h1>Register</h1>

                <div className="input-field">
                    <input name="username" onChange={handleInputChange} type="text" placeholder="Username" value={inputData.username} required />
                    <PersonOutlineOutlinedIcon/>
                </div>

                <div className="input-field">
                    <input name="email" onChange={handleInputChange} type="email" placeholder="Email address" value={inputData.email} required />
                    <EmailIcon/>
                </div>

                <div className="input-field">
                    <input name="password" onChange={handleInputChange} type={visibility?"text":"password"} placeholder="Password" value={inputData.password} required />
                    <div onClick={handleVisibility} style={{display:"flex",alignItems:"center",paddingRight:"11px"}}>
                        {visibility?<VisibilityOutlinedIcon />:<VisibilityOffOutlinedIcon />}
                    </div>
                </div>

                <CredentialStatusMessage />
                
                <button type="submit" onClick={registerUser}>Submit</button>

                <div className='register-link'>
                    <p>Already have an account? <NavLink to="/login" state={{prevPath:location.state.prevPath}}>Sign In</NavLink></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegistrationPage;
