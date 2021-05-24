import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue/es';
import Antd from './plugins/Ant/index'
import 'amfe-flexible'
createApp(App).use(store).use(router).use(Antd).mount('#app')
// setupAntd(createApp(App))
