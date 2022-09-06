<template>
  <div class="new-song">
    <div class="new-song__header">
      <span
        class="new-song__title"
        v-for="(tab, i) in songTab"
        :key="i"
        :class="{ active: currentTab === i }"
        @click="changeTab(i)"
        >{{ tab }}</span
      >
      <span class="new-song__more"><van-icon name="play" />更多</span>
    </div>
    <wym-scroll-view v-if="newSongList.length">
      <div class="new-song__list" v-for="(list, i) in newSongList" :key="i">
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
  import {
    ref,
    reactive,
    onMounted,
    computed,
    toRefs,
    defineComponent,
  } from 'vue'
  import { getAuthor, playMusic } from '@/assets/ts/common'
  export default defineComponent({
    name: 'IndexNewSong',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const songList = reactive(props.data.creatives)
      const songTab = Object.keys(newSongMap(songList))
      const currentTab = ref(0)
      const songheader = reactive(props.data.uiElement)

      const newSongList = computed(() => {
        return newSongMap(songList)[songTab[currentTab.value]]
      })

      // 将新歌里的数据存入map
      function newSongMap(list) {
        const songObj = {}
        list.forEach((item) => {
          const { title } = item.uiElement.mainTitle
          if (!songObj[title]) {
            songObj[title] = []
          }
          songObj[title].push(item)
        })
        return songObj
      }

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

      const changeTab = (i) => {
        currentTab.value = i
      }

      const songItemData = (item) => {
        return {
          imageUrl: `${item.uiElement.image.imageUrl}?param=50y50`,
          title: item.uiElement.mainTitle.title,
          authors: getAuthor(item?.resourceExtInfo?.artists || []),
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
        songTab,
        changeTab,
        currentTab,
        songheader,
        newSongList,
        getAuthor,
        songItemData,
        playMusic: playMusicParams,
      }
    },
  })
</script>

<style scoped lang="scss">
  .new-song {
    font-size: 14px;
    @include background_color('background_color1');
    border-radius: 10px;
    padding: 0.3125rem 0 0;
    margin-bottom: 0.3125rem;
    .new-song__header {
      position: relative;
      margin: 0.3125rem 0.5rem;
      .new-song__title {
        font-size: 18px;
        font-weight: bold;
        margin-right: 0.3125rem;
        border-right: 1px solid #ccc;
        padding-right: 0.3125rem;
        @include font_color('font_color3');
        &.active {
          @include font_color('font_color1');
        }
        &:last-child {
          border-right: none;
        }
      }
      .new-song__more {
        position: absolute;
        right: 0;
        top: 50%;
        padding: 0.0625rem 0.125rem;
        border-radius: 30px;
        border: 1px solid #ccc;
        @include background_color('background_color1');
        transform: translateY(-50%);
      }
    }
    .new-song__list {
      position: relative;
      display: inline-block;
      width: 300px;
    }
  }
</style>
