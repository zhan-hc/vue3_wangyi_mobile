// 当前歌曲
export interface songData {
  id: string | number,
  imageUrl: string, 
  title: string,
  authors: string
}

// 歌词对象
export interface lyricData {
  lyric?: string,
  time?: number
}
