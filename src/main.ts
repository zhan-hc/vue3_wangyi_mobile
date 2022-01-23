import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from './plugins/Ant/index'
import { Request } from "@/utils/request";
import VueAxios from 'vue-axios'
import 'amfe-flexible'
import '@/assets/iconfont/iconfont.css'
import Vant from 'vant';
import {Toast} from 'vant'
import 'vant/lib/index.css';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Antd)
app.use(Vant)
app.use(VueAxios, Request.init())
app.mount('#app')
app.config.globalProperties.$toast = Toast