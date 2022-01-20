import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from './plugins/Ant/index'
import { Request } from "@/utils/request";
// import toast from "@/components/Toast/Toast.vue";
import VueAxios from 'vue-axios'
import 'amfe-flexible'
import '@/assets/iconfont/iconfont.css'
// const showToast = require('@/components/Toast/index.ts')
createApp(App).use(store).use(router).use(Antd).use(VueAxios, Request.init()).mount('#app')
// createApp(App).config.globalProperties.$toast = showToast