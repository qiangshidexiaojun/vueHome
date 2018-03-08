import Vue from "vue"
export default {
    state: {
        cart: JSON.parse(localStorage.getItem("cartData")) || {}
    },
    getters: {
        total(state) {
            return Object.values(state.cart).reduce((sum, v) => sum += v, 0);
        }
    },
    mutations: {
        cartData(state, data) {
            let { id, num } = data;
            // state.cart[id] = num;
            Vue.set(state.cart, id, num);
            localStorage.setItem("cartData", JSON.stringify(state.cart));
        },
        delData(state, id) {
            Vue.delete(state.cart, id);
            localStorage.setItem("cartData", JSON.stringify(state.cart));
        }
    }
}