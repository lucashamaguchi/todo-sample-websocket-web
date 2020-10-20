import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./plugins/i18n";
import store from './store/';
import './plugins/';
import * as types from "@/store/types";

const Nes = require('@hapi/nes/lib/client')


Vue.config.productionTip = false;

// abrir a conexao e fazer subscribe
const client = new Nes.Client(process.env.VUE_APP_TODOS_WS);
const handler = (update, flags) => {
    console.log("update", update);
    console.log("flags", flags);
    store.dispatch(types.TODO_UPDATE_LIST, update)
};
client.connect()
    .then(() => client.subscribe('/todo', handler))
    .catch(e => console.log(e));

const vue = new Vue({
    render: h => h(App),
    router,
    i18n,
    store,
});

vue.$mount("#app");
