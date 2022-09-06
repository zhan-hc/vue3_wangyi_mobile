<template>
  <div class="recommend">
    <div class="recommend__header">
      <span class="recommend__title">{{ recommendheader.subTitle.title }}</span>
      <span class="recommend__more">{{ recommendheader.button.text }}></span>
    </div>
    <wym-scroll-view>
      <wym-song-sheet
        class="songSheet"
        v-for="item in recommendList"
        :key="item.creativeId"
        @click="handleClickJump(item.resources[0].resourceId)"
        :data="{
          playCount: item.resources[0].resourceExtInfo.playCount,
          imageUrl: item.uiElement.image.imageUrl + '?param=100y100',
          title: item.resources[0].uiElement.mainTitle.title,
        }"
      />
    </wym-scroll-view>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import { formatCount } from '@/assets/ts/common'

  export default defineComponent({
    name: 'IndexRecommend',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const recommendList = reactive(props.data.creatives)
      const recommendheader = reactive(props.data.uiElement)
      const { getUrlParams, handleRouterJump } = useRouteFun()

      // 歌单详情跳转
      const handleClickJump = (id) => {
        handleRouterJump(`/songListDetail/${id}`)
      }
      return {
        // wrapper,
        // content,
        recommendList,
        recommendheader,
        formatCount,
        handleClickJump,
      }
    },
  })
</script>

<style scoped lang="scss">
  .recommend {
    font-size: 14px;
    @include background_color('background_color1');
    padding: 0.3125rem 0;
    margin-bottom: 0.3125rem;
    overflow: hidden;
    .recommend__header {
      position: relative;
      margin: 0.3125rem 0.5rem;
      .recommend__title {
        font-size: 18px;
        font-weight: bold;
      }
      .recommend__more {
        font-size: 12px;
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
    .songSheet {
      margin-right: 0.3125rem;
    }
  }
</style>
