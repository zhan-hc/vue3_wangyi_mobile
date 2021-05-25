import { 
  LeftOutlined,
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  AudioFilled
 } from '@ant-design/icons-vue'

const ant = {
  install(Vue: any) {
    Vue.component(SearchOutlined.name, SearchOutlined)
    Vue.component(AudioFilled.name, AudioFilled)
    Vue.component(MenuOutlined.name, MenuOutlined)
    Vue.component(LeftOutlined.name,LeftOutlined)
    Vue.component(CloseOutlined.name,CloseOutlined)
    // Vue.component(Checkbox.name, Checkbox)
    // Vue.component(Switch.name, Switch)
  }
}
export default ant