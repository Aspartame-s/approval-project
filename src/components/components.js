import Header from '../components/Header.vue'
import ListTemplete from '../components/ListTemplete.vue'
export default (Vue) => {
    Vue.component('app-header', Header)
    Vue.component('list-item', ListTemplete)
}