import { Carousel, Drawer, Avatar } from 'ant-design-vue'

const ant = {
  install(Vue: any) {
    Vue.component(Carousel.name, Carousel)
    Vue.component(Drawer.name, Drawer)
    Vue.component(Avatar.name, Avatar)
  }
}
export default ant