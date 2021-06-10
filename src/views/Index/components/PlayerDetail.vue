<template>
  <div class="playerDetail-wrap">
    <div class="player-header">
      <i class="iconfont icon-bottom"></i>
      <div class="song-info">
        <div class="song-name"></div>
        <div class="song-author"></div>
      </div>
      <i class="iconfont icon-fenxiangpt"></i>
    </div>
    <div class="player-content">
      <img class="content-needle" src="@/assets/images/needle.png" alt="">
      <div class="content-disc">
        <img src="https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg" alt="">
      </div>
    </div>
    
    <div class="player-operate">
      <div class="icon-list">
        <i class="iconfont" v-for="item in iconList" :key="item.id" :class="item.icon"></i>
      </div>
      <div class="song-progress"></div>
      <div class="song-operate">
        <i class="iconfont" v-for="item in operateList" :key="item.id" :class="item.icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import { iconList, operateList } from "@/assets/ts/playerDetailData";
export default {
  name: 'PlayerDetail',
  setup (props, context) {
    return {
      iconList,
      operateList
    }
  }
}
</script>

<style scoped lang="scss">
.playerDetail-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  padding: 30px;
  color: #fff;
  font-size: 24px;
  background: #ccc;
  .player-header{
    display: flex;
    margin-bottom: 30px;
    .song-info{
      flex: 1;
    }
    .iconfont{
      font-size: 48px;
    }
  }
  .player-content{
    text-align: center;
    .content-needle{
      margin-left: 250px;
      width: 300px;
      height: 250px;
    }
    .content-disc{
      position: relative;
      background-image: url(../../../assets/images/disc.png);
      width: 500px;
      height: 500px;
      background-size: cover;
      margin: 0 auto;
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 330px;
        height: 330px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .player-operate{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .icon-list{
      display: flex;
      .iconfont{
        font-size: 48px;
        flex: 1;
        text-align: center;
        display: block;
      }
    }
    .song-operate{
      display: flex;
      height: 150px;
      line-height: 150px;
      .iconfont{
        font-size: 48px;
        flex: 1;
        display: block;
        text-align: center;
      }
      .icon-bofang3{
        font-size: 100px;
      }
    }
  }
}
</style>
