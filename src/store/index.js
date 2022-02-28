import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: 'jth',
        addressList: [
            {
                id: 1,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '李先生',
                number: '17893837683'
            },
            {
                id: 2,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '王先生',
                number: '17893837683'
            },
            {
                id: 3,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '赵先生',
                number: '17893837683'
            },
            {
                id: 4,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '钱先生',
                number: '17893837683'
            },
            {
                id: 5,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '孙先生',
                number: '17893837683'
            },
            {
                id: 6,
                address: '江苏省南京市栖霞区迈皋桥创业园8号往南30米',
                name: '吴先生',
                number: '17893837683'
            },
        ],
        addressId: '',
        flag: '',
        temporaryAddress: '',
        tabFlag: null,
        activeAddress: null
    },
    mutations: {
        setaddressId(state, payload) {
            state.addressId = payload.id
        },
        setFlag(state, payload) {
            state.flag = payload.flag
        },
        settemporaryAddress(state, payload) {
            state.temporaryAddress = payload.address
        },
        setName(state, payload) {
            state.name = payload.name
        },
        setTabFlag(state, payload) {
            state.tabFlag = payload.tabFlag
        },
        setActiveAddress(state, payload) {
            state.activeAddress = payload.info
        }
    }
});

