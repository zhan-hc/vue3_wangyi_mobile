import { 
  LeftOutlined,
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  AudioFilled,
  CaretRightOutlined
 } from '@ant-design/icons-vue'

 import { Carousel } from 'ant-design-vue'
const ant = {
  install(Vue: any) {
    Vue.component(SearchOutlined.name, SearchOutlined)
    Vue.component(AudioFilled.name, AudioFilled)
    Vue.component(MenuOutlined.name, MenuOutlined)
    Vue.component(LeftOutlined.name,LeftOutlined)
    Vue.component(CloseOutlined.name,CloseOutlined)
    Vue.component(CaretRightOutlined.name,CaretRightOutlined)
    Vue.component(Carousel.name,Carousel)
  }
}
export default ant