<template>
  <div class="likesong-wrap" @click="handleJumpDetail">
    <div class="song-img">
      <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
      <div><i class="iconfont icon-ziyuan1"></i></div>
    </div>
    <div class="song-info">
      <div class="info-title">我喜欢的音乐</div>
      <div class="info-num">{{likeIds.length}}首</div>
    </div>
    <div class="song-heart">
      <i class="iconfont icon-xindong"></i>
      心动模式
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, reactive, toRefs, watch} from 'vue'
import { useStore } from 'vuex'
import useRouteFun from '@/hooks/router/useRouteFun'
export default defineComponent({
  name: 'likeSong',
  props: {
  },
  setup(props) {
    const store = useStore()
    const likeIds = computed(() => store.state.likeIds)
    const userInfo = computed(() => store.state.userInfo)
    const { handleRouterJump } = useRouteFun()
    const handleJumpDetail = () => {
      handleRouterJump(
        {
          name: 'songListDetail', 
          params: {
            likeIds: JSON.stringify(likeIds.value),
            songListName: '我喜欢的音乐',
            authorName: userInfo.value.nickname,
            avatarUrl: userInfo.value.avatarUrl
          }
        }
      )
    }
    return {
      likeIds,
      handleJumpDetail
    }
  }
})
</script>

<style scoped lang="scss">
.likesong-wrap{
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: .3125rem;
  font-size: 14px;
  margin-bottom: .3125rem;
  .song-img{
    position: relative;
    width:1.25rem;
    height:1.25rem;
    margin-right: .3125rem;
    img{
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
    div{
      position: absolute;
      top: 0;
      left: 0;
      background: rgba($color: #000, $alpha: 0.4);
      width:1.25rem;
      height:1.25rem;
      border-radius: 10px;
      .icon-ziyuan1{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
      }
    }
  }
  .song-info{
    flex: 1;
    .info-title{
      font-size: 14px;
    }
    .info-num{
      color: #ccc;
    }
  }
  .song-heart{
    border: 1px solid #ccc;
    padding: 0 .125rem;
    border-radius: 20px;
  }
}
</style>
