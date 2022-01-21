<template>
  <div class="detail-wrap">
    <div class="detail-header" ref="detailHeader">
      <i class="iconfont icon-leftarrow" @click="handleBack"></i>
      <span>歌单</span>
      <i class="iconfont icon-search"></i>
      <i class="iconfont icon-sandian"></i>
    </div>
    <div v-if="songList.tracks" class="detail-info" :style="{'background-image': `url(${songList.tracks[0].al.picUrl})`}">
      <div class="songList-img">
        <img :src="songList.coverImgUrl" alt="推荐歌单">
        <div class="songList-playCount">
          <i class="iconfont icon-bofang4"></i>
          {{formatCount(songList.playCount)}}
        </div>
      </div>
      <div class="songList-info">
        <div class="info-name">{{songList.name}}</div>
        <div class="info-creator" v-if="songList.creator" >
           <img :src="songList.creator.avatarUrl" alt="">
          <span>{{songList.creator.nickname}}</span>
          <i class="iconfont icon-plus"></i>
        </div>
        <div class="info-desc">{{songList.description}} ></div>
      </div>
    </div>
    <div class="detail-songList">
      <div class="songList-count" ref="headerCount">
        <div class="count-item">
          <i class="iconfont icon-plus1"></i>
          <span>{{formatCount(songList.subscribedCount)}}</span>
        </div>
        <div class="count-item">
          <i class="iconfont icon-pinglunpt"></i>
          <span>{{songList.shareCount ? formatCount(songList.shareCount) : '评论'}}</span>
        </div>
        <div class="count-item">
          <i class="iconfont icon-fenxiangpt"></i>
          <span>{{formatCount(songList.shareCount)}}</span>
        </div>
      </div>
      <div ref="songListHeader" :class="fixedStatus ? 'songList-header' : 'fixed-header'">
        <i class="iconfont icon-bofang5"></i>
        <div class="all">播放全部<span>(94)</span></div>
        <i class="iconfont icon-xiazaipt"></i>
        <i class="iconfont icon-duoxuanpt"></i>
      </div>
      <div class="songList-item" v-for="(item, i) in songList.tracks" :key="item.id">
        <div class="item-sort">{{i + 1}}</div>
        <div class="item-info">
          <div class="info-name">{{item.name}}</div>
          <div class="info-authors">{{getAuthor(item.ar)}} - {{item.al.name}}</div>
        </div>
        <i class="iconfont icon-mv"></i>
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
import { formatCount, getAuthor } from "@/assets/ts/common";
import { songList_detail } from "@/api/home/songList";
export default {
  name: 'songListDetail',
  components: {
  },
  setup (props, context) {
    const route = useRouter()
    const { ctx } = getCurrentInstance()
    const id = route.currentRoute.value.params.id
    const fixedStatus = ref(true)
    const songList = ref({})
    onMounted(() => {
      window.addEventListener("scroll",handleScroll)
      songList_detail({
        id: id
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          songList.value = res.data.playlist
        }
      }).catch((err) => {
        console.log('err',err)
      })
    })
    const handleBack = () => {
      route.go(-1)
    }
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 200) {
        // ctx.$refs.headerCount.style.opacity = '0'
        fixedStatus.value = false
        // 待优化
        ctx.$refs.detailHeader.style.backgroundImage = `url('${songList.value.tracks[0].al.picUrl}')`
        ctx.$refs.detailHeader.style.backgroundPosition = 'bottom'
        ctx.$refs.detailHeader.style.backgroundSize = 'cover'
      } else {
        // ctx.$refs.headerCount.style.opacity = '1'
        fixedStatus.value = true
        ctx.$refs.detailHeader.style.backgroundImage = 'none'
      }
    }
    return {
      id,
      songList,
      fixedStatus,
      handleBack,
      getAuthor,
      handleScroll,
      formatCount
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixin.scss';
@keyframes hideCount {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
@keyframes showCount {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.detail-wrap{
  font-size: 24px;
  background: #fff;
  .detail-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    color: #fff;
    display: flex;
    padding: 0 30px;
    line-height: 100px;
    z-index: 1;
    span {
      flex: 1;
      font-size: 36px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .iconfont {
      font-size: 48px;
    }
    .icon-leftarrow{
      margin-right: 20px;
    }
    .icon-search{
      margin-right: 40px;
    }
  }
  .detail-info{
    position: relative;
    display: flex;
    padding: 120px 30px 100px;
    height: 600px;
    border-radius: 0 0 80% 80% / 0 0 10% 10%;
    background-size: cover;
    .songList-img{
      position: relative;
      border-radius: 10px;
      width: 220px;
      height: 220px;
      margin-bottom: 10px;
      margin-right: 30px;
      z-index: 1;
      img{
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
      .songList-playCount{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        padding: 5px 15px;
        background: rgba($color: #000, $alpha: 0.3);
        border-radius: 30px;
        .icon-bofang4{
          font-size: 24px;
        }
      }
    }
    .songList-info{
      position: relative;
      flex: 1;
      color: #fff;
      height: 220px;
       z-index: 1;
      .info-name{
        font-size: 32px;
        margin-bottom: 20px;
        @include ellipsisBasic(2);
      }
      .info-creator{
        color: #828283;
        font-weight: 600;
        img{
          display: inline-block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }
        span{
          margin-right: 10px;
        }
        .icon-plus{
          color: #BFBDBE;
          background: #828283;
          padding: 5px 15px;
          border-radius: 20px;
        }
      }
      .info-desc{
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        color: #828283;
        font-weight: 600;
        @include ellipsis;
      }
    }
  }
  .detail-songList{
    padding: 0 30px;
    .songList-count{
      position: relative;
      width: 500px;
      height: 80px;
      display: flex;
      align-items: center;
      padding: 20px 0;
      margin: -40px auto 0;
      border-radius: 30px;
      background: #fff;
      box-shadow: 0 10px 5px #828283;
      margin-bottom: 30px;
      .count-item{
        flex: 1;
        text-align: center;
        border-right: 2px solid #ccc;
        box-sizing: border-box;
        .iconfont{
          font-size: 40px;
          margin-right: 20px;
        }
        &:last-child{
          border-right: none;
        }
      }
    }
    .songList-header,
    .fixed-header{
      display: flex;
      align-items: center;
      background: #fff;
      .all{
        flex: 1;
        font-size: 32px;
        font-weight: bold;
        span{
          margin-left: 20px;
          font-size: 24px;
          color: #999;
          font-weight: 400;
        }
      }
      .iconfont{
        font-size: 48px;
      }
      .icon-bofang5{
        margin-right: 30px;
        color: #FF4639;
      }
      .icon-xiazaipt{
        font-size: 52px;
        margin-right: 40px;
      }
    }
    .fixed-header {
      position: fixed;
      top: 100px;
      left: 30px;
      right: 30px;
    }
    .songList-item{
      display: flex;
      align-items: center;
      height: 120px;
      color: #999;
      .item-sort{
        color: #999;
        font-size: 36px;
        width: 70px;
      }
      .item-info{
        flex: 1;
        width: 450px;
        margin-right: 30px;
        .info-name{
          font-size: 28px;
          letter-spacing: 2px;
          font-weight: 600;
          color: #000;
          @include ellipsis;
        }
        .info-authors{
          font-size: 24px;
          @include ellipsis;
        }
      }
      .iconfont{
        font-size: 48px;
      }
      .icon-mv{
        margin-right: 40px;
      }
      .icon-sandian{
        font-size: 42px;
      }
    }
  }
}
</style>
