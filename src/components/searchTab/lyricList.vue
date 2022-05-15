<template>
  <div class="lyricList-wrap">
    <div
      class="lyricList-item"
      v-for="(item, i) in dataList"
      :key="item.id"
      @click="playMusicParams(item)"
    >
      <div class="item-song">
        <div class="item-info">
          <div class="info-title">
            <span v-html="highLightStr(item.name, keywords)"></span>
            <span v-if="item.album.name" class="item-desc">{{
              `（${item.album.name}）`
            }}</span>
          </div>
          <div class="info-desc">{{ getAuthor(item.artists) }}</div>
        </div>
        <i class="iconfont icon-mv"></i>
        <i class="iconfont icon-sandian"></i>
      </div>
      <div class="item-lyric">
        <div
          class="lyric-info"
          v-for="(lyric, _index) in lyricList(item.lyrics.txt).slice(
            0,
            item.expand ? lyricList(item.lyrics.txt).length : 3
          )"
          :key="_index"
          v-html="highLightStr(lyric, keywords)"
        ></div>
        <div class="lyric-expand" @click.stop="item.expand = !item.expand">
          {{ item.expand ? '收起' : '展开' }}歌词
          <van-icon :name="`arrow-${item.expand ? 'up' : 'down'}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import {
    formatCount,
    highLightStr,
    getAuthor,
    playMusic,
  } from '@/assets/ts/common'
  export default defineComponent({
    name: 'lyricList',
    props: {
      dataList: {
        type: Array,
        default: () => [],
      },
      keywords: {
        type: String,
        default: () => '',
      },
    },
    setup(props) {
      const lyricList = (str: string) => {
        return str.split('\n')
      }

      // 播放音乐
      function playMusicParams(item: any) {
        const songInfo = {
          id: item.id,
          imageUrl: item.artists.img1v1Url,
          title: item.name,
          authors: getAuthor(item.artists),
        }
        playMusic(songInfo)
      }
      return {
        getAuthor,
        formatCount,
        highLightStr,
        lyricList,
        playMusicParams,
      }
    },
  })
</script>

<style scoped lang="scss">
  .lyricList-wrap {
    .lyricList-item {
      .item-song {
        display: flex;
        align-items: center;
        height: 1.5rem;
        .item-info {
          flex: 1;
          width: 240px;
          .info-title {
            @include ellipsis;
          }
        }
        .info-desc {
          font-size: 10px;
          color: #999;
          @include ellipsis;
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

      .item-lyric {
        color: #999;
        font-size: 12px;
        padding-bottom: 0.125rem;
        border-bottom: 1px solid #ccc;
        .lyric-info {
          margin-bottom: 0.125rem;
        }
        .lyric-expand {
          color: #dcdcdc;
        }
      }
    }
  }
</style>
