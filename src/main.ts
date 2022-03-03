import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from './plugins/Ant/index'
import 'amfe-flexible'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/common.css'
import Vant from 'vant';
import {Toast} from 'vant'
import 'vant/lib/index.css';
import lazyPlugin from 'vue3-lazy'
import 'default-passive-events'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Antd)
app.use(Vant)
app.mount('#app')
app.use(lazyPlugin, {
  loading: require('@/assets/images/loading.gif'), // 图片加载时默认图片
  error: require('@/assets/images/error.jpg')// 图片加载失败时默认图片
})
app.config.globalProperties.$toast = Toast