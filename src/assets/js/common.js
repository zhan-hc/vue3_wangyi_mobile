const formatCount = (num) => {
  let str = num.toString()
  const length = str.length
  if (length > 5 && length < 9) { //600000
    str = str.substring(0,length - 4) + '万'
  } else if (length >= 9) { // 900000000
    str = str.substring(0,length - 8) + '亿'
  }
  return str
}

const getAuthor = (obj) => {
  let authors = ''
  for (let i = 0; i < obj.length; i++) {
    authors +=  '-' + obj[i].name
  }
  return authors
} 

export {
  formatCount,
  getAuthor
}