<template>
  <div class="songList-wrap">
    <div class="songList-tab">
      <div class="tab-item" v-for="(item, i) in songTab" :key="item.id" @click="handleClick(i)">
        <span :class="{'active': i === activeIndex}">{{item.text}}</span>
      </div>
    </div>
    <div class="songlist-create">
      <div class="create-header">
        <span>创建歌单(1个)</span>
          <i class="iconfont icon-plus"></i>
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="create-song">
        <div class="song-img">
          <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
        </div>
        <div class="song-info">
          <div class="info-title">{{userInfo.nickname}}的2020年度歌单</div>
          <div class="info-num">48首</div>
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
    <div class="songlist-collect">
      <div class="collect-header">
        <span>收藏歌单(1个)</span>
          <i class="iconfont icon-sandian"></i>
      </div>
      <div class="collect-song">
        <div class="song-img">
          <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
        </div>
        <div class="song-info">
          <div class="info-title">{{userInfo.nickname}}的2020年度歌单</div>
          <div class="info-num">48首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import { reactive, ref, toRefs } from "vue"
    const state = reactive({
      songTab: [
        {
          id: 101,
          text: '创建歌单'
        },
        {
          id: 102,
          text: '收藏歌单'
        },
        {
          id: 103,
          text: '歌单助手'
        }
      ],
      activeIndex: 0
    })

    const {songTab, activeIndex} = toRefs(state)
    const store = useStore()
    const userInfo = ref(store.state.userInfo)
    const handleClick = (i) => {
      state.activeIndex = i
    }
</script>

<style scoped lang="scss">
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
        .info-title{
          font-size: 14px;
          font-weight: 600;
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
