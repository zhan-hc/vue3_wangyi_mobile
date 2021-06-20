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
          <div class="info-title">{{userinfo.nickname}}的2020年度歌单</div>
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
          <div class="info-title">{{userinfo.nickname}}的2020年度歌单</div>
          <div class="info-num">48首</div>
        </div>
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import { ref } from "vue"
export default {
  name: '',
  components: {
  },
  setup (props, context) {
    const songTab = ref([
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
    ])
    const activeIndex = ref(0)
    const store = useStore()
    const userinfo = ref(store.state.userInfo)
    const handleClick = (i) => {
      activeIndex.value = i
    }
    return {
      songTab,
      userinfo,
      activeIndex,
      handleClick
    }
  }
}
</script>

<style scoped lang="scss">
.songList-wrap{
  font-size: 24px;
  .songList-tab{
    display: flex;
    margin-bottom: 20px;
    .tab-item{
      flex: 1;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      border-right: 1px solid #D0D0D0;
      span{
        &.active{
          border-bottom: 10px solid #FF4E4E;
          border-radius: 10px;
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
    border-radius: 20px;
    padding: 10px 30px 30px;
    font-size: 24px;
    margin-bottom: 30px;
    .create-header,
    .collect-header{
      display: flex;
      color: #999;
      padding-bottom: 20px;
      span{
        flex: 1;
        line-height: 60px;
      }
      .iconfont{
        font-size: 40px;
      }
      .icon-plus{
        margin-right: 20px;
      }
    }
    .create-song,
    .collect-song{
      display: flex;
      margin-bottom: 20px;
      .song-img{
        position: relative;
        width: 90px;
        height: 90px;
        margin-right: 30px;
        img{
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .song-import{
        position: relative;
        padding: 30px;
        width: 90px;
        height: 90px;
        border-radius: 10px;
        margin-right: 30px;
        background: #F3F3F3;
        .icon-daoru{
          position: absolute;
           top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 30px;
        }
      }
      .song-info{
        flex: 1;
        .info-title{
          font-size: 28px;
          font-weight: 600;
        }
        .info-num{
          color: #999;
        }
      }
      .icon-sandian{
        font-size: 40px;
        color: #999;
        line-height: 90px;
      }
    }
  }
}
</style>
