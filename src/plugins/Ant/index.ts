import { 
  LeftOutlined,
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  RightOutlined,
  PlusOutlined,
  AudioFilled,
  CaretRightOutlined
 } from '@ant-design/icons-vue'

 import { Carousel, Drawer, Avatar } from 'ant-design-vue'
const ant = {
  install(Vue: any) {
    Vue.component(SearchOutlined.name, SearchOutlined)
    Vue.component(AudioFilled.name, AudioFilled)
    Vue.component(MenuOutlined.name, MenuOutlined)
    Vue.component(LeftOutlined.name, LeftOutlined)
    Vue.component(RightOutlined.name, RightOutlined)
    Vue.component(CloseOutlined.name, CloseOutlined)
    Vue.component(PlusOutlined.name, PlusOutlined)
    Vue.component(CaretRightOutlined.name, CaretRightOutlined)
    Vue.component(Carousel.name, Carousel)
    Vue.component(Drawer.name, Drawer)
    Vue.component(Avatar.name, Avatar)
  }
}
export default ant