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
const getAuthor = (obj: Array<artists>): String => {
  let authors = ''
  for (let i = 0; i < obj.length; i++) {
    authors +=  '-' + obj[i].name
  }
  return authors.slice(1)
} 

export {
  formatCount,
  getAuthor
}