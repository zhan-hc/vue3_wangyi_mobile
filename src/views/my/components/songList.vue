<template>
  <div class="songList-wrap">
    <div class="songList-tab">
      <div class="tab-item" v-for="(item, i) in songTab" :key="i" @click="handleClick(i)">
        <span :class="{'active': i === activeIndex}">{{item}}</span>
      </div>
    </div>
    <div class="songlist-create" v-if="mySongList.length">
      <div class="create-header">
        <span>创建歌单({{mySongList.length}}个)</span>
          <i class="iconfont icon-plus"></i>
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="create-song" v-for="item in mySongList" :key="item.id" @click="handleClickJump(item.id)">
        <div class="song-img">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="song-info">
          <div class="info-title">{{item.name}}</div>
          <div class="info-num">{{item.trackCount}}首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
      <div class="create-song">
        <div class="song-import">
          <i class="iconfont icon-daoru"></i>
        </div>
        <div class="song-info">
          <div class="info-title" style="line-height:45px">一键导入外部音乐</div>
        </div>
      </div>
    </div>
    <div class="songlist-collect"  v-if="collectList.length">
      <div class="collect-header">
        <span>收藏歌单(1个)</span>
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="collect-song" v-for="item in collectList" :key="item.id"  @click="handleClickJump(item.id)">
        <div class="song-img">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="song-info">
          <div class="info-title">{{item.name}}</div>
          <div class="info-num">{{item.trackCount}}首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue"
import { user_playList } from '@/api/user/index'
import useRouteFun from '@/hooks/router/useRouteFun'
export default defineComponent({
  name: 'songList',
  setup() {
    const store = useStore()
    const { handleRouterJump } = useRouteFun()
    const state = reactive({
      songTab: ['创建歌单','收藏歌单','歌单助手'],
      activeIndex: 0,
      mySongList: [],
      collectList: [], // 收藏歌单
      uid: sessionStorage.getItem('wangyi_uid')
    })

    
    onMounted(async () => {
      const res = await user_playList(state.uid)
      state.mySongList = res.playlist.filter(item => item.userId === Number(state.uid))
      state.collectList = res.playlist.filter(item => item.userId !== Number(state.uid))
      console.log(state.mySongList)
    })


    // 歌单详情跳转
    const handleClickJump = (id) => {
      handleRouterJump(`/songListDetail/${id}`)
    }

    const handleClick = (i) => {
      state.activeIndex = i
    }
    return {
      ...toRefs(state),
      handleClick,
      handleClickJump
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixin.scss';
.songList-wrap{
  font-size: 12px;
  .songList-tab{
    display: flex;
    margin-bottom: .3125rem;
    .tab-item{
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-right: 1px solid #D0D0D0;
      span{
        &.active{
          border-bottom: .125rem solid #FF4E4E;
          border-radius: 2px;
        }
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .songlist-create,
  .songlist-collect{
    background: #fff;
    border-radius: 10px;
    padding: .3125rem;
    font-size: 14px;
    margin-bottom: .3125rem;
    .create-header,
    .collect-header{
      display: flex;
      color: #999;
      padding-bottom: .3125rem;
      span{
        flex: 1;
        // line-height: 60px;
      }
      .iconfont{
        font-size: 20px;
      }
      .icon-plus{
        margin-right: .3125rem;
      }
    }
    .create-song,
    .collect-song{
      display: flex;
      margin-bottom: .3125rem;
      align-items: center;
      .song-img{
        position: relative;
        width: 1rem;
        height: 1rem;
        margin-right: .3125rem;
        img{
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .song-import{
        position: relative;
        padding: .3125rem;
        width: 1rem;
        height: 1rem;
        border-radius: 10px;
        margin-right: .3125rem;
        background: #F3F3F3;
        .icon-daoru{
          position: absolute;
           top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 15px;
        }
      }
      .song-info{
        flex: 1;
        width: 240px;
        .info-title{
          font-size: 14px;
          font-weight: 600;
          @include ellipsis;
        }
        .info-num{
          color: #999;
        }
      }
      .icon-sandian{
        font-size: 20px;
        color: #999;
        line-height: 1rem;
      }
    }
  }
}
</style>
