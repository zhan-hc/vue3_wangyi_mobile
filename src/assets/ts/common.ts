import store from "@/store/index";
import BScroll from "better-scroll";
import { Ref } from "vue";
interface artists {
  name: String,
  id: Number,
  picUrl: String
}

// 转换播放量等数据
const formatCount = (num : Number): String => {
  let str = String(num)
  const length = str.length
  if (length > 5 && length < 9) {
    str = str.substring(0,length - 4) + '万'
  } else if (length >= 9) {
    str = str.substring(0,length - 8) + '亿'
  }
  return str
}

// 获取作者
const getAuthor = (obj: Array<artists>): String => {
  let authors = ''
  for (let i = 0; i < obj.length; i++) {
    authors +=  '-' + obj[i].name
  }
  return authors.slice(1)
} 

// 音频时长转换
const durationTrans = (num: number, divider: number = 1) => {
  const dur: number = Math.floor(num / divider)
  let str: string = ""
  let h: string | number  = Math.floor(dur / 3600),
      m: string | number = Math.floor(dur % 3600 / 60),
      s: string | number = Math.floor(dur % 3600 % 60)
  if (h > 0) {
    h = h < 10 ? '0' + h : h
    str += h + ":"
  }
  m = m < 10 ? '0' + m : m 
  s = s < 10 ? '0' + s : s 
  str += m + ":" + s
  return str
}

// 点击播放音乐
const playMusic = (songInfo: any) => {
  // const songInfo = {
  //   id: song.resourceId,
  //   imageUrl: song.uiElement.image.imageUrl,
  //   title: song.uiElement.mainTitle.title,
  //   authors: getAuthor(song.resourceExtInfo.artists)
  // }
  store.commit('changeSongId', songInfo.id)
  store.commit('changeSongInfo', songInfo)
  store.commit('changePlayStatus', true)
}


/**
* 使用滚动组件
@params
  visualWidth: 单个dom的宽或高
  sumLen: dom总数量
  content：内容dom
  wrapper：外层dom
  direction: 滚动方向
}
*/

const initScroll = (visualWidth: number, sumLen: number, content: Ref, wrapper: Ref, direction: string = 'vertical') => {
  // let visualWidth = 650 // 可视宽度
  let width = (visualWidth * sumLen)/2
  content.value.style.width = width + 'px' // 给container设置了宽度
  new BScroll(wrapper.value, {
    click: true,
    scrollX: true,
    bounce: true,
    eventPassthrough: direction
  })
}


/**
* 高亮显示
@params
  str: 总字符串
  key: 匹配字符串
  className：高亮类名
}
*/
const highLightStr = (str: string, key: string, className:string = 'high-light') => {
  const strArr = str.split(key)
  return strArr.join(`<span class="high-light">${key}</span>`)
}


export {
  formatCount,
  getAuthor,
  durationTrans,
  playMusic,
  initScroll,
  highLightStr
}