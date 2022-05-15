import { Carousel, Drawer, Avatar,Switch } from 'ant-design-vue'

const ant = {
  install(Vue: any) {
    Vue.component(Carousel.name, Carousel)
    Vue.component(Drawer.name, Drawer)
    Vue.component(Avatar.name, Avatar)
    Vue.component(Switch.name, Switch)
  }
}
export default ant