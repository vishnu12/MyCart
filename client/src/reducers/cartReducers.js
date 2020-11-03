import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    SAVE_SHIPPING_DETAILS
} from '../constants/cartConstants'




export const cartReducer = (state = { cartItems:[],details:{} }, action) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            {
                let item=action.payload
                let itemExist=state.cartItems.find(prod=>prod.id===item.id)
                if(itemExist){
                 return {
                     ...state,
                     cartItems:state.cartItems.map(prod=>prod.id===itemExist.id?item:prod)
                 }
                }else{
                    return{
                        ...state,
                        cartItems:[...state.cartItems,item]
                    }
                }
            }

        case CART_REMOVE_ITEM:
            {
                return {
                    ...state,
                    cartItems:state.cartItems.filter(prod=>prod.id!==action.payload)
                }
            }


        case SAVE_SHIPPING_DETAILS:
            return {
                ...state,
                details:action.payload
            }    

        default:
            return state
    }
}