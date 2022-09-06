<template>
  <div class="song">
    <div class="song__header">
      <span class="song__title">{{ songheader.subTitle.title }}</span>
      <span class="song__more" @click="playAllMusic">
        <van-icon name="play" />{{ songheader.button.text }}
      </span>
    </div>
    <wym-scroll-view v-if="songList.length">
      <div class="song__list" v-for="(list, i) in songList" :key="i">
        {{ item }}
        <wym-song-item
          v-for="(item, j) in list.resources"
          :key="j"
          :data="songItemData(item)"
          @click="playMusic(item)"
        />
      </div>
    </wym-scroll-view>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import { getAuthor, playMusic } from '@/assets/ts/common'
  import { useStore } from 'vuex'
  export default defineComponent({
    name: 'IndexSong',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const store = useStore()
      const songList = reactive(props.data.creatives)
      const songheader = reactive(props.data.uiElement)

      // 播放音乐
      function playMusicParams(item) {
        const songInfo = {
          id: item.resourceId,
          imageUrl: item.uiElement.image.imageUrl,
          title: item.uiElement.mainTitle.title,
          authors: getAuthor(item.resourceExtInfo.artists),
        }
        playMusic(songInfo)
      }

      function playAllMusic() {
        const songLists = songList
          .map((item) => item.resources)
          .flat(Infinity)
          .map((item) => {
            return {
              id: item.resourceId,
              imageUrl: item.uiElement.image.imageUrl,
              title: item.uiElement.mainTitle.title,
              authors: getAuthor(item.resourceExtInfo.artists),
            }
          })
        store.commit('setCurrentPlayList', songLists)
        playMusic(songLists[0])
      }

      const songItemData = (item) => {
        return {
          imageUrl: `${item.uiElement.image.imageUrl}?param=50y50`,
          title: item.uiElement.mainTitle.title,
          authors: getAuthor(item.resourceExtInfo.artists),
          desc:
            item.uiElement?.subTitle?.titleType !== 'songRcmdTag'
              ? item.uiElement?.subTitle?.title
              : '',
          subTitle:
            item.uiElement?.subTitle?.titleType === 'songRcmdTag'
              ? item.uiElement?.subTitle?.title
              : '',
        }
      }

      return {
        songList,
        songheader,
        getAuthor,
        playAllMusic,
        songItemData,
        playMusic: playMusicParams,
      }
    },
  })
</script>

<style scoped lang="scss">
  .song {
    font-size: 14px;
    @include background_color('background_color1');
    border-radius: 10px;
    padding: 0.3125rem 0 0;
    margin-bottom: 0.3125rem;
    .song__header {
      position: relative;
      margin: 0.3125rem 0.5rem;
      .song__title {
        font-size: 18px;
        font-weight: bold;
      }
      .song__more {
        position: absolute;
        right: 0;
        top: 50%;
        padding: 0.0625rem 0.125rem;
        border-radius: 10px;
        border: 1px solid #ccc;
        @include background_color('background_color1');
        transform: translateY(-50%);
      }
    }
    .song__list {
      position: relative;
      display: inline-block;
      width: 300px;
    }
  }
</style>
