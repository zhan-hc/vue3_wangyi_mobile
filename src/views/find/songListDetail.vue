<template>
  <div class="detail-wrap" v-if="status">
    <div class="detail-header" ref="detailHeader">
      <i class="iconfont icon-leftarrow" @click="handleRouterBack"></i>
      <span>歌单</span>
      <i class="iconfont icon-search"></i>
      <i class="iconfont icon-sandian"></i>
    </div>
    <div
      class="detail-info"
      :style="{ 'background-image': `url(${songList.tracks? songList.tracks[0].al.picUrl : DEFAULT_IMAGE})` }"
    >
      <div class="songList-img">
        <img :src="songList.coverImgUrl || DEFAULT_IMAGE" alt="推荐歌单" />
        <div class="songList-playCount" v-if="songList.playCount">
          <i class="iconfont icon-bofang4"></i>
          {{ formatCount(songList.playCount) }}
        </div>
      </div>
      <div class="songList-info" >
        <div class="info-name" >{{ songList.name || paramsData.songName}}</div>
        <div class="info-creator">
          <img :src="paramsData.avatarUrl || songList.creator.avatarUrl" alt="" />
          <span>{{ paramsData.authorName || songList.creator.nickname }}</span>
          <i class="iconfont icon-plus"></i>
        </div>
        <div class="info-desc" v-if="songList.description">{{ songList.description}} ></div>
      </div>
    </div>

    <div class="detail-songList">
      <div class="songList-count" ref="headerCount" v-if="songList.subscribedCount">
        <div class="count-item">
          <i class="iconfont icon-plus1"></i>
          <span>{{ formatCount(songList.subscribedCount) }}</span>
        </div>
        <div class="count-item">
          <i class="iconfont icon-pinglunpt"></i>
          <span>{{
            songList.shareCount ? formatCount(songList.shareCount) : '评论'
          }}</span>
        </div>
        <div class="count-item">
          <i class="iconfont icon-fenxiangpt"></i>
          <span>{{ formatCount(songList.shareCount) }}</span>
        </div>
      </div>
      <div
        ref="songListHeader"
        :class="fixedStatus ? 'songList-header' : 'fixed-header'"
      >
        <i class="iconfont icon-bofang5"></i>
        <div class="all">播放全部<span>({{trackIds.length}})</span></div>
        <i class="iconfont icon-xiazaipt"></i>
        <i class="iconfont icon-duoxuanpt"></i>
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="handleLoad"
      >
        <div
          class="songList-item van-clearfix"
          v-for="(item, i) in songListData"
          :key="item.id"
          @click="playMusicParams(item)"
        >
          <div class="item-sort">{{ i + 1 }}</div>
          <div class="item-info">
            <div class="info-name">{{ item.name }}</div>
            <div class="info-authors">
              {{ getAuthor(item.ar) }} - {{ item.al.name }}
            </div>
          </div>
          <i class="iconfont icon-mv"></i>
          <i class="iconfont icon-sandian"></i>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, onUnmounted, toRefs } from 'vue'
  import { formatCount, getAuthor, playMusic } from '@/assets/ts/common'
  import { songList_detail,song_detail } from '@/api/song'
  import useDetailScroll from '@/hooks/song/useDetailScroll'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import useSongDetail from '@/hooks/song/useSongDetail'

  const {getUrlParams, handleRouterBack} = useRouteFun()
  // 滚动固定sticky头部
  const {handleScroll} = useDetailScroll()
  // 歌单列表详情
  const {state, handleLoad, DEFAULT_IMAGE} = useSongDetail()
  const { songList, loading, finished, songListData, status, currentPage, pageSize, trackIds, fixedStatus, paramsData } = toRefs(state)
  const detailHeader = ref(null)

  onUnmounted(() => {
    window.removeEventListener('scroll', () => handleScroll(state.fixedStatus, detailHeader, state.songList.tracks[0].al.picUrl))
  })

  onMounted(() => {
    status.status && window.addEventListener('scroll', () => handleScroll(state.fixedStatus, detailHeader, state.songList.tracks[0].al.picUrl || DEFAULT_IMAGE))
  })


  // 播放音乐
  function playMusicParams(item) {
    const songInfo = {
      id: item.id,
      imageUrl: item.al.picUrl,
      title: item.name,
      authors: getAuthor(item.ar)
    }
    playMusic(songInfo)
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/mixin.scss';
  @keyframes hideCount {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes showCount {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .detail-wrap {
    font-size: 24px;
    background: #fff;
    padding-bottom: 1.5rem;
    // overflow: auto;
    .detail-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1.5rem;
      color: #fff;
      display: flex;
      padding: 0 .3125rem;
      line-height: 1.5rem;
      z-index: 1;
      span {
        flex: 1;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 2px;
      }
      .iconfont {
        font-size: 20px;
      }
      .icon-leftarrow {
        margin-right: .3125rem;
      }
      .icon-search {
        margin-right: .3125rem;
      }
    }
    .detail-info {
      position: relative;
      display: flex;
      padding: 1.5rem .3125rem 1rem;
      height: 8rem;
      border-radius: 0 0 80% 80% / 0 0 10% 10%;
      background-size: cover;
      .songList-img {
        position: relative;
        border-radius: 10px;
        width: 3rem;
        height: 3rem;
        margin-bottom: .125rem;
        margin-right: .3125rem;
        z-index: 1;
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
        .songList-playCount {
          font-size: 10px;
          position: absolute;
          top: .125rem;
          right: .125rem;
          color: #fff;
          padding: .0625rem .125rem;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 15px;
          .icon-bofang4 {
            font-size: 12px;
          }
        }
      }
      .songList-info {
        position: relative;
        flex: 1;
        color: #fff;
        height: 4rem;
        z-index: 1;
        font-size: 16px;
        .info-name {
          font-size: 16px;
          margin-bottom: .3125rem;
          @include ellipsisBasic(2);
        }
        .info-creator {
          color: #828283;
          font-weight: 600;
          img {
            display: inline-block;
            width: .75rem;
            height: .75rem;
            border-radius: 50%;
            margin-right: 20px;
          }
          span {
            margin-right: .125rem;
          }
          .icon-plus {
            color: #bfbdbe;
            background: #828283;
            padding: .0625rem .125rem;
            border-radius: 20px;
          }
        }
        .info-desc {
          position: absolute;
          // bottom: 10px;
          left: 0;
          right: 0;
          color: #828283;
          font-weight: 600;
          @include ellipsisBasic(2);
        }
      }
    }
    .detail-songList {
      padding: 0 .3125rem;
      .songList-count {
        position: relative;
        width: 250px;
        height: 1.25rem;
        display: flex;
        align-items: center;
        padding: .3125rem 0;
        margin: -0.625rem auto 0;
        border-radius: 15px;
        background: #fff;
        box-shadow: 0 .3125rem .3125rem #828283;
        margin-bottom: .3125rem;
        .count-item {
          font-size: 12px;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #ccc;
          box-sizing: border-box;
          .iconfont {
            font-size: 20px;
            margin-right: .3125rem;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
      .songList-header,
      .fixed-header {
        display: flex;
        align-items: center;
        background: #fff;
        .all {
          flex: 1;
          font-size: 18px;
          font-weight: bold;
          span {
            margin-left: .3125rem;
            font-size: 12px;
            color: #999;
            font-weight: 400;
          }
        }
        .iconfont {
          font-size: 22px;
        }
        .icon-bofang5 {
          margin-right: .3125rem;
          color: #ff4639;
        }
        .icon-xiazaipt {
          font-size: 24px;
          margin-right: .3125rem;
        }
      }
      .fixed-header {
        position: fixed;
        top: 1rem;
        left: .3125rem;
        right: .3125rem;
      }
      .songList-item {
        display: flex;
        align-items: center;
        height: 1.5rem;
        color: #999;
        .item-sort {
          color: #999;
          font-size: 18px;
          width: .875rem;
        }
        .item-info {
          flex: 1;
          width: 250px;
          margin-right: .3125rem;
          .info-name {
            font-size: 14px;
            letter-spacing: .0625rem;
            font-weight: 600;
            color: #000;
            @include ellipsis;
          }
          .info-authors {
            font-size: 12px;
            @include ellipsis;
          }
        }
        .iconfont {
          font-size: 24px;
        }
        .icon-mv {
          margin-right: .3125rem;
        }
        .icon-sandian {
          font-size: 20px;
        }
      }
    }
  }
</style>
