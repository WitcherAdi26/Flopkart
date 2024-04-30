import { createContext, useContext, useEffect,useReducer } from "react";
import UserReducer from "../Reducer/UserReducer.js";
import ProductReducer from "../Reducer/ProductReducer.js";
import axios from "axios";



// for Logging In and Information of User
const UserContext=createContext();

const initialUser={
    id:"",
    username:"",
    loginStatus:false,
    addItemLoading:false,
    addItemError:false,
    cart:[]
}

const UserProvider=({children})=>{
    const [userState,updateUserState]=useReducer(UserReducer,initialUser);

    const addItem= async (prod)=>{
        const {_id,product_name,image,retail_price}=prod;

        let index=-1,qty=0;
        for(let i=0;i<userState.cart.length;i++){
            console.log(userState.cart[i]);
            if(userState.cart[i]._id===_id){
                index=i;
                console.log(index);
                qty=userState.cart[i].qty;
                break;
            }
        }

        if(index!==-1){
            userState.cart=userState.cart.filter(i=>i!==userState.cart[index]);
        }
        console.log(userState.cart.length);
        console.log(index);
        qty++;
        
        const cartItem={
            _id,
            product_name,
            image,
            retail_price,
            qty,
        }

        updateUserState({
            type:"cart",
            payload:cartItem
        });

        console.log(userState.cart);

        const URL="http://localhost:8080/api/addItemToCart";
        updateUserState({
            type:"addItemLoading",
            payload:true
        });

        try {
            const response=await axios.post(URL,{
                userID:userState.id,
                cart:userState.cart
            });
            //first add to cart here.Then how to add to MongoDB. 
        } catch (error) {
            updateUserState({
                type:"addItemError",
                payload:true
            });
        } finally {
            updateUserState({
                type:"addItemError",
                payload:false
            });
            updateUserState({
                type:"addItemLoading",
                payload:false
            });
        }
    };

    return <UserContext.Provider value={{...userState,updateUserState,addItem}}>
        {children}
    </UserContext.Provider>
};

const useUserContext=()=>{
    return useContext(UserContext);
};

export {UserProvider,UserContext,useUserContext};










// for Registration
// const UserRegisterContext =createContext();

// const initialUserRegisterStatus={
//     username:"",
//     email:"",
//     password:"",
//     registerStatus:0,
//     message:"",
//     trigger:false
// }

// let callUpdateUserRegisterStatus;

// const UserRegisterProvider=({children}) => {
//     const [userRegisterStatus,updateUserRegisterStatus]=useReducer(UserRegisterReducer,initialUserRegisterStatus);

//     callUpdateUserRegisterStatus=({type,payload})=>{
//         updateUserRegisterStatus({
//             type:type,
//             payload:payload
//         });        
//     }

//     const register= async ()=>{
//         const res=await fetch("http://localhost:8080/api/register",{
//             method: "POST",
//             headers:{
//                 "Content-type":"application/json"
//             },
//             body:JSON.stringify(userRegisterStatus),
//         });



//         const data=await res.json();
//         // console.log("msg "+data.msg);

//         callUpdateUserRegisterStatus({
//             type:"registerStatus",
//             payload:res.status
//         });
//         callUpdateUserRegisterStatus({
//             type:"message",
//             payload:data.msg
//         });
//         console.log(userRegisterStatus);
//         updateUserRegisterStatus({
//             type:"trigger",
//             payload:false
//         });
//     };

//     useEffect(()=>{
//         if(!userRegisterStatus.trigger)return;
//         register();
//     },[userRegisterStatus.trigger]);

//     return <UserRegisterContext.Provider value={{...userRegisterStatus}}>
//         {children}
//         </UserRegisterContext.Provider>;
// };

// const useUserRegisterContext=()=>{
//     return useContext(UserRegisterContext);
// };

// export {UserRegisterProvider,UserRegisterContext,useUserRegisterContext,callUpdateUserRegisterStatus};












// for fetching products.
const ProductContext=createContext();

let cancelToken1,cancelToken2;

const intitialState={
    isLoading:false,
    isError:false,
    homePageProducts:[],
    isSingleLoading:false,
    isSingleError:false,
    singleProduct:{}
}

const ProductProvider=({children})=>{
    const [state,updateState]=useReducer(ProductReducer,intitialState);
    
    const fetchProducts=async ()=>{
        if(cancelToken1){
            cancelToken1.cancel("Request Aborted");
        }
        cancelToken1=axios.CancelToken.source();

        const search="electronic",limit=50;
        const URL="http://localhost:8080/api/explore?search="+search+"&limit"+limit;

        updateState({type:"SetLoading",payload:true});
        try {
            const res=await axios.get(URL,{cancelToken:cancelToken1.token});
            updateState({type:"SetProductData",payload:res.data});
        } catch (error) {
            updateState({type:"SetError",payload:true});
        } finally{
            updateState({type:"SetLoading",payload:false});
            updateState({type:"SetError",payload:false});
        }
    };

    const fetchSingleProduct= async (URL) =>{
        if(cancelToken2){
            cancelToken2.cancel("Request Aborted");
        }
        cancelToken2=axios.CancelToken.source();

        updateState({type:"SetSingleLoading",payload:true});
        try {
            const res=await axios.get(URL,{cancelToken:cancelToken2.token});
            updateState({type:"SetSingleProductData",payload:res.data});
        } catch (error) {
            updateState({type:"SetSingleError",payload:true});
        } finally {
            updateState({type:"SetSingleLoading",payload:false});
            updateState({type:"SetSingleError",payload:false});
        }
    };

    useEffect(()=>{
        fetchProducts();
    },[]);

    return <ProductContext.Provider value={{...state,fetchSingleProduct}}>
        {children}  
    </ProductContext.Provider>
};

const useProductContext=()=>{
    return useContext(ProductContext);
};

export {ProductProvider,ProductContext,useProductContext};













// for authenticating user
const AuthContext=createContext();

const AuthProvider=({children})=>{
    const storeTokenInLS=(serverToken)=>{
        return localStorage.setItem("token",serverToken);
        console.log(localStorage.getItem("token"));
    };

    return (
        <AuthContext.Provider value={{storeTokenInLS}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext=()=>{
    return useContext(AuthContext);
};

export {AuthProvider,AuthContext,useAuthContext};