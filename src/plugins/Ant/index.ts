import { LeftOutlined,CloseOutlined } from '@ant-design/icons-vue'

const ant = {
  install(Vue: any) {
    // Vue.component(Button.name, Button)
    // Vue.component(Input.name, Input)
    // Vue.component(Steps.name, Steps)
    // Vue.component(Form.name, Form)
    // Vue.component(Select.name, Select)
    // Vue.component(Row.name, Row)
    // Vue.component(Radio.name, Radio)
    // Vue.component(DatePicker.name, DatePicker)
    // Vue.component(Col.name, Col)
    Vue.component(LeftOutlined.name,LeftOutlined)
    Vue.component(CloseOutlined.name,CloseOutlined)
    // Vue.component(Checkbox.name, Checkbox)
    // Vue.component(Switch.name, Switch)
  }
}
export default ant