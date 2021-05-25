import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from './plugins/Ant/index'
import { Request } from "@/utils/request";
import VueAxios from 'vue-axios'
import 'amfe-flexible'
createApp(App).use(store).use(router).use(Antd).use(VueAxios, Request.init()).mount('#app')
// setupAntd(createApp(App))
