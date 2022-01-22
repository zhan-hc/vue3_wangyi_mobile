import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from './plugins/Ant/index'
// import Toast from '@/components/toast/Toast.vue'
import { Request } from "@/utils/request";
import VueAxios from 'vue-axios'
import 'amfe-flexible'
import '@/assets/iconfont/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css';
// const showToast = require('@/components/Toast/index.ts')
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Antd)
app.use(Vant)
app.use(VueAxios, Request.init())
app.mount('#app')
// createApp(App).config.globalProperties.$toast = showToast