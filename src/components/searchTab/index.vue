<template>
  <!-- 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音 -->
  <van-tabs
    v-model:active="active"
    @change="handleTabChange"
    :color="isThemeDrak ? '#ee0a24' : '#000'"
    :title-active-color="isThemeDrak ? '#a7a7a7' : '#414141'"
  >
    <van-tab
      v-for="(item, i) in tabList"
      :title="item.title"
      :name="i"
      :key="i"
    >
      <component
        v-if="dataList[i] && dataList[i].length"
        :is="item.com"
        :dataList="dataList[i]"
        :keywords="keywords"
      ></component>
    </van-tab>
  </van-tabs>
</template>
<!--      :title-style="{
        background: isThemeDrak ? '#1b2531' : '#fff',
        fontColor: isThemeDrak ? '#a7a7a7' : '#414141',
      }"-->
<script>
  import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
  import { useStore } from 'vuex'
  import { search_result } from '@/api/search/index'
  import singleList from './singleList.vue'
  import albumList from './albumList.vue'
  import lyricList from './lyricList.vue'
  import singerList from './singerList.vue'
  import songList from './songList.vue'
  import userList from './userList.vue'
  import videoList from './videoList.vue'
  import voiceList from './voiceList.vue'
  export default defineComponent({
    name: 'searchResult',
    props: {
      keywords: {
        type: String,
        default: () => '',
      },
    },
    components: {
      singleList,
      albumList,
      lyricList,
      singerList,
      songList,
      userList,
      videoList,
      voiceList,
    },
    setup(props) {
      const store = useStore()
      const state = reactive({
        tabList: [
          { title: '单曲', value: '1', com: singleList, dataKey: 'songs' },
          { title: '歌单', value: '1000', com: songList, dataKey: 'playlists' },
          { title: '视频', value: '1014', com: videoList, dataKey: 'videos' },
          { title: '歌手', value: '100', com: singerList, dataKey: 'artists' },
          { title: '歌词', value: '1006', com: lyricList, dataKey: 'songs' },
          { title: '专辑', value: '10', com: albumList, dataKey: 'albums' },
          // {title: '声音', value: '2000', com: voiceList},
          {
            title: '用户',
            value: '1002',
            com: userList,
            dataKey: 'userprofiles',
          },
        ],
        dataList: [],
        active: '1',
        currentPage: 1,
        pageSize: 10,
      })
      let keywords = props.keywords
      const isThemeDrak = computed(() => store.state.setupInfo.isThemeDrak)
      onMounted(() => {
        getDataList()
      })

      const getDataList = async () => {
        const res = await search_result({
          keywords: keywords,
          type: state.tabList[state.active].value,
        })
        state.dataList[state.active] =
          res.result[state.tabList[state.active].dataKey]
      }

      const handleTabChange = (name, title) => {
        !state.dataList[state.active] && getDataList()
      }
      return {
        ...toRefs(state),
        handleTabChange,
        isThemeDrak,
      }
    },
  })
</script>

<style scoped lang="scss">
  /deep/ .van-tabs__wrap {
    margin-bottom: 0.3125rem;
    .van-tabs__nav--line {
      padding-bottom: 5px;
      background-color: transparent;
    }
  }
</style>
