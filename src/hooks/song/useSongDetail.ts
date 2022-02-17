import { onMounted, ref, onUnmounted, Ref, reactive} from "vue"
import useRouteFun from '@/hooks/router/useRouteFun'
import { songList_detail,song_detail} from '@/api/song'

export default function useSongDetail(){
  const DEFAULT_IMAGE = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
  const {getUrlParams} = useRouteFun()
  const id = getUrlParams('id')
  const state = reactive({
    songList: {},
    loading: false,
    finished: false,
    status: false,
    currentPage: 0,
    pageSize: 10,
    trackIds: [],
    paramsData: {
      songName: '',
      avatarUrl: '',
      authorName: ''
    },
    songListData: [],
    fixedStatus: true // 表单详情header fixed样式状态
  })

  onMounted(() => {
    // 如果是非歌单进入
    if (getUrlParams('likeIds')) {
      state.trackIds = JSON.parse(getUrlParams('likeIds'))
      state.paramsData = {
        songName: getUrlParams('songListName'),
        avatarUrl: getUrlParams('avatarUrl'),
        authorName: getUrlParams('authorName')
      }
      state.status = true
    } 
    // 如果是歌单进入
    else {
      getSongListDetail()
    }
  })

  // 歌单进入查询详情接口
  const getSongListDetail = async () => {
    const res:any = await songList_detail({id})
      state.songList = res.playlist
      state.trackIds = res.playlist.trackIds.map((item:any) => item.id)
      state.songListData = res.playlist.tracks
      state.status = true
      state.currentPage = state.currentPage + 1
  }

  // 按需加载
  const handleLoad = async () => {
    const start = state.pageSize * state.currentPage
    const end = state.pageSize*(state.currentPage + 1)
    const ids = state.trackIds.slice(start, end).join(',')
    if (!state.finished) {
      state.loading = true
      const res:any = await song_detail(ids)
      state.loading = false
      state.songListData = state.songListData.concat(res.songs)
      state.currentPage += 1
      if (state.songListData.length >= state.trackIds.length) {
        state.finished = true
      }
    }
  }

  return {
    state,
    handleLoad,
    DEFAULT_IMAGE
  }
  
}