import { onMounted, ref, onUnmounted, Ref} from "vue"
import { useStore } from 'vuex'
export default function useDetailScroll(){

    /**
    * 歌单详情滚动的时候固定头部
    @params
      fixedStatus: 控制fixed样式的状态
      detailHeader: 歌单详情的header DOM
      bgUrl: header背景图片url
    }
    */
    // 滚动的时候固定头部
    const handleScroll = (fixedStatus: boolean, detailHeader: Ref<HTMLElement | null>, bgUrl: string) => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= 200 && detailHeader.value) {
        fixedStatus = false
        // 待优化
        detailHeader.value.style.backgroundImage = `url('${bgUrl}')`
        detailHeader.value.style.backgroundPosition = 'bottom'
        detailHeader.value.style.backgroundSize = 'cover'
      } else {
        fixedStatus = true
        detailHeader.value && (detailHeader.value.style.backgroundImage = 'none')
      }
    }

  return {handleScroll}
  
}