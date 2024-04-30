const UserReducer=(userState,action)=>{
    switch(action.type){
        case "id":
            return {
                ...userState,
                id:action.payload
            };

        case "username":
            return {
                ...userState,
                username:action.payload
            };
        
        case "loginStatus":
            return {
                ...userState,
                loginStatus:action.payload
            }

        case "addItemLoading":
            return {
                ...userState,
                addItemLoading:action.payload
            }
        
        case "addItemError":
            return {
                ...userState,
                addItemError:action.payload
            }
        
        case "cart":
            return {
                ...userState,
                cart:[...userState.cart, action.payload]
            }
        
        default: return userState;
    }
}

export default UserReducer;