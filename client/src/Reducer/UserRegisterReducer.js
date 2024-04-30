const UserRegisterReducer=(userRegisterStatus,action)=>{
    // console.log("k");
    switch(action.type){
        case "username":
            return {
                ...userRegisterStatus,
                username:action.payload
            };

        case "email":
            return {
                ...userRegisterStatus,
                email:action.payload
            }
        
        case "password":
            return {
                ...userRegisterStatus,
                password:action.payload
            }
        
        case "registerStatus":
            console.log("rs");
            return {
                ...userRegisterStatus,
                registerStatus:action.payload
            }

        case "message":
            console.log("msg");
            return {
                ...userRegisterStatus,
                message:action.payload
            }

        case "trigger":
            return {
                ...userRegisterStatus,
                trigger:action.payload
            }
        
        default: return userRegisterStatus;
    }
}

export default UserRegisterReducer;