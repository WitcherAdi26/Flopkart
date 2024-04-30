const ProductReducer=(state,action)=>{
    switch(action.type){
        case "SetLoading":
            return {
                ...state,
                isLoading:action.payload
            };

        case "SetError":
            return {
                ...state,
                isError:action.payload
            };

        case "SetProductData":
            return {
                ...state,
                homePageProducts:action.payload
            };

        case "SetSingleLoading":
            return {
                ...state,
                isSingleLoading:action.payload
            };

        case "SetSingleError":
            return {
                ...state,
                isSingleError:action.payload
            };

        case "SetSingleProductData":
            return {
                ...state,
                singleProduct:action.payload
            };
        
        default: return state;
    }
};

export default ProductReducer;