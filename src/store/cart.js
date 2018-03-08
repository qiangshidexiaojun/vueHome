export default{
    state: {
        cart: JSON.parse(localStorage.getItem("cartData")) || {}
    },
    mutations: {
        cartData(state,data){
            let {id,num} = data;
            state.cart[id] = num;
            localStorage.setItem("cartData",JSON.stringify(state.cart));
            console.log(state.cart);
        }
    }
}