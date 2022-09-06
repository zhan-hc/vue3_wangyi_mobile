<template>
  <div class="song-list" v-if="status">
    <div class="song-list__header" ref="detailHeader">
      <i class="iconfont icon-leftarrow" @click="handleRouterBack"></i>
      <span>歌单</span>
      <i class="iconfont icon-search"></i>
      <i class="iconfont icon-sandian"></i>
    </div>
    <div
      class="song-list__content--top"
      :style="{ 'background-image': `url(${ songList.tracks ? songList.tracks[0].al.picUrl : DEFAULT_IMAGE })` }"
    >
      <div class="song-list__img">
        <img :src="songList.coverImgUrl || DEFAULT_IMAGE" alt="推荐歌单" />
        <div class="songList-playCount" v-if="songList.playCount">
          <i class="iconfont icon-bofang4"></i>
          {{ formatCount(songList.playCount) }}
        </div>
      </div>
      <div class="song-list__info">
        <div class="song-list__name">{{ songList.name || paramsData.songName }}</div>
        <div class="song-list__creator">
          <img
            :src="paramsData.avatarUrl || songList.creator.avatarUrl"
            alt=""
          />
          <span>{{ paramsData.authorName || songList.creator.nickname }}</span>
          <i class="iconfont icon-plus"></i>
        </div>
        <div class="song-list__desc" v-if="songList.description">
          {{ songList.description }} >
        </div>
      </div>
    </div>

    <div class="song-list__content--bottom">
      <div
        class="song-list__count"
        ref="headerCount"
        v-if="songList.subscribedCount"
      >
        <div class="song-list__collect">
          <i class="iconfont icon-plus1"></i>
          <span>{{ formatCount(songList.subscribedCount) }}</span>
        </div>
        <div class="song-list__comment">
          <i class="iconfont icon-pinglunpt"></i>
          <span>{{
            songList.shareCount ? formatCount(songList.shareCount) : '评论'
          }}</span>
        </div>
        <div class="song-list__share">
          <i class="iconfont icon-fenxiangpt"></i>
          <span>{{ formatCount(songList.shareCount) }}</span>
        </div>
      </div>
      <div
        ref="songListHeader"
        :class="fixedStatus ? 'song-list__main-header' : 'song-list__main-header--fixed'"
      >
        <i class="iconfont icon-bofang5"></i>
        <div class="all">
          播放全部<span>({{ trackIds.length }})</span>
        </div>
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
          class="song-list__item van-clearfix"
          v-for="(item, i) in songListData"
          :key="item.id"
          @click="playMusicParams(item)"
        >
          <div class="song-list__item__sort">{{ i + 1 }}</div>
          <div class="song-list__item__info">
            <div class="song-list__item__name">{{ item.name }}</div>
            <div class="song-list__item__authors">
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
  import { songList_detail, song_detail } from '@/api/song'
  import useDetailScroll from '@/hooks/song/useDetailScroll'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import useSongDetail from '@/hooks/song/useSongDetail'

  const { getUrlParams, handleRouterBack } = useRouteFun()
  // 滚动固定sticky头部
  const { handleScroll } = useDetailScroll()
  // 歌单列表详情
  const { state, handleLoad, DEFAULT_IMAGE } = useSongDetail()
  const {
    songList,
    loading,
    finished,
    songListData,
    status,
    currentPage,
    pageSize,
    trackIds,
    fixedStatus,
    paramsData,
  } = toRefs(state)
  const detailHeader = ref(null)

  onUnmounted(() => {
    window.removeEventListener('scroll', () =>
      handleScroll(
        state.fixedStatus,
        detailHeader,
        state.songList.tracks[0].al.picUrl
      )
    )
  })

  onMounted(() => {
    status.status &&
      window.addEventListener('scroll', () =>
        handleScroll(
          state.fixedStatus,
          detailHeader,
          state.songList.tracks[0].al.picUrl || DEFAULT_IMAGE
        )
      )
  })

  // 播放音乐
  function playMusicParams(item) {
    const songInfo = {
      id: item.id,
      imageUrl: item.al.picUrl,
      title: item.name,
      authors: getAuthor(item.ar),
    }
    playMusic(songInfo)
  }
</script>

<style scoped lang="scss">
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
  .song-list {
    font-size: 24px;
    @include background_color('background_color1');
    padding-bottom: 1.5rem;
    // overflow: auto;
    .song-list__header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1.5rem;
      color: #fff;
      display: flex;
      padding: 0 0.3125rem;
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
        margin-right: 0.3125rem;
      }
      .icon-search {
        margin-right: 0.3125rem;
      }
    }
    .song-list__content--top {
      position: relative;
      display: flex;
      padding: 1.5rem 0.3125rem 1rem;
      height: 8rem;
      border-radius: 0 0 80% 80% / 0 0 10% 10%;
      background-size: cover;
      .song-list__img {
        position: relative;
        border-radius: 10px;
        width: 3rem;
        height: 3rem;
        margin-bottom: 0.125rem;
        margin-right: 0.3125rem;
        z-index: 1;
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
        .song-list__playCount {
          font-size: 10px;
          position: absolute;
          top: 0.125rem;
          right: 0.125rem;
          color: #fff;
          padding: 0.0625rem 0.125rem;
          background: rgba($color: #000, $alpha: 0.3);
          border-radius: 15px;
          .icon-bofang4 {
            font-size: 12px;
          }
        }
      }
      .song-list__info {
        position: relative;
        flex: 1;
        color: #fff;
        height: 4rem;
        z-index: 1;
        font-size: 16px;
        .song-list__name {
          font-size: 16px;
          margin-bottom: 0.3125rem;
          @include ellipsisBasic(2);
        }
        .song-list__creator {
          color: #828283;
          font-weight: 600;
          img {
            display: inline-block;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            margin-right: 20px;
          }
          span {
            margin-right: 0.125rem;
          }
          .icon-plus {
            color: #bfbdbe;
            background: #828283;
            padding: 0.0625rem 0.125rem;
            border-radius: 20px;
          }
        }
        .song-list__desc {
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
    .song-list__content--bottom {
      padding: 0 0.3125rem;
      .song-list__count {
        position: relative;
        width: 250px;
        height: 1.25rem;
        display: flex;
        align-items: center;
        padding: 0.3125rem 0;
        margin: -0.625rem auto 0;
        border-radius: 15px;
        @include background_color('background_color1');
        box-shadow: 0 0.3125rem 0.3125rem #828283;
        margin-bottom: 0.3125rem;
        .song-list__collect,
        .song-list__comment,
        .song-list__share {
          font-size: 12px;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #ccc;
          box-sizing: border-box;
          .iconfont {
            font-size: 20px;
            margin-right: 0.3125rem;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
      .song-list__main-header,
      .song-list__main-header--fixed{
        display: flex;
        align-items: center;
        @include background_color('background_color1');
        .all {
          flex: 1;
          font-size: 18px;
          font-weight: bold;
          span {
            margin-left: 0.3125rem;
            font-size: 12px;
            color: #999;
            font-weight: 400;
          }
        }
        .iconfont {
          font-size: 22px;
        }
        .icon-bofang5 {
          margin-right: 0.3125rem;
          color: #ff4639;
        }
        .icon-xiazaipt {
          font-size: 24px;
          margin-right: 0.3125rem;
        }
      }
      .song-list__main-header--fixed {
        position: fixed;
        top: 1rem;
        left: 0.3125rem;
        right: 0.3125rem;
      }
      .song-list__item {
        display: flex;
        align-items: center;
        height: 1.5rem;
        color: #999;
        &__sort {
          color: #999;
          font-size: 18px;
          width: 0.875rem;
        }
        &__info {
          flex: 1;
          width: 250px;
          margin-right: 0.3125rem;
          .song-list__item__name {
            font-size: 14px;
            letter-spacing: 0.0625rem;
            font-weight: 600;
            @include font_color(('font_color1'));
            @include ellipsis;
          }
          .song-list__item__authors {
            font-size: 12px;
            @include ellipsis;
          }
        }
        .iconfont {
          font-size: 24px;
        }
        .icon-mv {
          margin-right: 0.3125rem;
        }
        .icon-sandian {
          font-size: 20px;
        }
      }
    }
  }
</style>
