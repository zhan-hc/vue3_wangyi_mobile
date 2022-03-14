<template>
  <div class="recommend-container">
    <div class="recommend-header">
      <span class="title">{{ recommendheader.subTitle.title }}</span>
      <span class="more">{{ recommendheader.button.text }}></span>
    </div>
    <div class="recommend-wrapper" ref="wrapper">
      <div class="recommend-content" ref="content">
        <div
          class="recommend-item"
          v-for="item in recommendList"
          :key="item.creativeId"
          @click="handleClickJump(item.resources[0].resourceId)"
        >
          <div class="recommend-img">
            <img v-lazy="item.uiElement.image.imageUrl + '?param=50y50'" alt="推荐歌单" />
          </div>
          <div class="recommend-playCount">
            <i class="iconfont icon-bofang4"></i>
            {{ formatCount(item.resources[0].resourceExtInfo.playCount) }}
          </div>
          <div class="recommend-name">
            {{ item.resources[0].uiElement.mainTitle.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, onMounted, defineComponent } from 'vue'
  import useRouteFun from '@/hooks/router/useRouteFun'
  import { formatCount, initScroll } from '@/assets/ts/common'

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
      const wrapper = ref(null)
      const content = ref(null)
      const { getUrlParams, handleRouterJump } = useRouteFun()

      onMounted(() => {
        initScroll(217, recommendList.length, content, wrapper)
      })

      // 歌单详情跳转
      const handleClickJump = (id) => {
        handleRouterJump(`/songListDetail/${id}`)
      }
      return {
        wrapper,
        content,
        recommendList,
        recommendheader,
        formatCount,
        handleClickJump,
      }
    },
  })
</script>

<style scoped lang="scss">
  .recommend-container {
    font-size: 14px;
    background: #fff;
    padding: .3125rem 0;
    margin-bottom: 20px;
    overflow: hidden;
    .recommend-header {
      position: relative;
      margin: .3125rem .5rem;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .more {
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 50%;
        padding: .0625rem .125rem;
        border-radius: 30px;
        border: 1px solid #ccc;
        background: #fff;
        transform: translateY(-50%);
      }
    }
    .recommend-wrapper {
      box-sizing: border-box;
      margin: 0 .625rem;
      padding-bottom: .4375rem;
      .recommend-content {
        touch-action: none;
        overflow-x: hidden;
        .recommend-item {
          font-size: 12px;
          position: relative;
          display: inline-block;
          margin-right: .625rem;
          width: 2.25rem;
          vertical-align: top;
          .recommend-img {
            border-radius: 10px;
            width: 2.25rem;
            height: 2.25rem;
            margin-bottom: .3125rem;
            img {
              vertical-align: middle;
              border-radius: 10px;
              width: 100%;
              height: 100%;
            }
          }
          .recommend-playCount {
            font-size: 10px;
            position: absolute;
            top: .125rem;
            right: .125rem;
            color: #fff;
            padding: .0625rem .125rem;
            background: rgba($color: #000, $alpha: 0.3);
            border-radius: 30px;
            .icon-bofang4 {
              font-size: 10px;
              // font-size: 22px;
            }
          }
          .recommend-name {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
