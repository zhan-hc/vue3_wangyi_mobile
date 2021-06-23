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
interface artists {
  name: String,
  id: Number,
  picUrl: String
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
export {
  formatCount,
  getAuthor,
  durationTrans
}