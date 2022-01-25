import { reactive } from "vue";
interface icons {
  id: Number,
  icon: String

}
const iconList: Array<icons> = [
  {
    id: 1001,
    icon: 'icon-xihuan-kongpt-wangyiicon'
  },
  {
    id: 1002,
    icon: 'icon-xiazaipt'
  },
  {
    id: 1003,
    icon: 'icon-changba'
  },
  {
    id: 1004,
    icon: 'icon-pinglunpt'
  },
  {
    id: 1005,
    icon: 'icon-sandian'
  }
]
const operateList: Array<icons> = reactive([
  {
    id: 101,
    icon: 'icon-list-loop'
  },
  {
    id: 102,
    icon: 'icon-shangyiqu-wangyiicon'
  },
  {
    id: 103,
    icon: 'icon-zanting'
  },
  {
    id: 104,
    icon: 'icon-shangyiqu'
  },
  {
    id: 105,
    icon: 'icon-caidan'
  }
])
export {
  iconList,
  operateList
}