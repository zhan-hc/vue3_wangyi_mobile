
import Carousel from '@/views/find/components/Carousel.vue'
import Recommend from '@/views/find/components/Recommend.vue'
import IndexSong from '@/views/find/components/IndexSong.vue'
import IndexCalendar from '@/views/find/components/IndexCalendar.vue'
import IndexNewSong from '@/views/find/components/IndexNewSong.vue'
import IndexBroadcast from '@/views/find/components/IndexBroadcast.vue'
import { onMounted, reactive} from 'vue'
import { home_icon, home_page } from '@/api/home/index'
import {homeBlock} from './type'

export default function useHomeModule(){
  const state = reactive({
    homeList: [],
    homeComMap: {
      'HOMEPAGE_BANNER': Carousel,
      'HOMEPAGE_BLOCK_PLAYLIST_RCMD': Recommend,
      'HOMEPAGE_BLOCK_STYLE_RCMD': IndexSong,
      'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG': IndexNewSong,
      'HOMEPAGE_MUSIC_CALENDAR': IndexCalendar,
      'HOMEPAGE_MUSIC_MLOG': IndexSong,
      'HOMEPAGE_BLOCK_MGC_PLAYLIST': Recommend,
      'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST': Recommend,
      'HOMEPAGE_VOICELIST_RCMD': IndexNewSong,
      'HOMEPAGE_PODCAST24': IndexBroadcast,
      'HOMEPAGE_BLOCK_VIDEO_PLAYLIST': Recommend,
    },
    endText: '', // 底部提示文案
    iconList: [],
    bannerList: [],
    status: false,
  })
  onMounted(async () => {
    try {
      const homeModule = home_page()
      const homeIcon = home_icon()
      const [homeData, IconData]: any = await Promise.all([homeModule, homeIcon])
      // 过滤出banner和未知模块
      state.homeList = homeData.data.blocks.filter(
        (item: homeBlock) =>
          !['HOMEPAGE_BANNER', 'HOMEPAGE_MUSIC_MLOG'].includes(item.blockCode)
      )
      // 过滤出banner
      state.bannerList = homeData.data.blocks.filter(
        (item: homeBlock) => item.blockCode === 'HOMEPAGE_BANNER'
      )[0].extInfo.banners

      state.iconList = IconData.data
      state.endText = homeData.data.pageConfig.nodataToast
      state.status = true
    } catch (err) {
      console.log('err:', err)
    }
  })
  return {state}
  
}
