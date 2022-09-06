<template>
  <div class="broadcast">
    <div class="broadcast__wrapper">
      <p class="broadcast__header">
        {{ broadcastList.uiElement.mainTitle.title }}
      </p>
      <wym-scroll-view>
        <div
          class="broadcast__item"
          v-for="(item, i) in broadcastList.resources"
          :key="item.resourceId"
          :style="{ background: randomHexColor(i) }"
        >
          <div class="broadcast__item__name">{{ item.uiElement.mainTitle.title }}</div>
          <div class="broadcast__item__desc">
            <div class="broadcast__item__type">广播</div>
            <van-icon name="play" />
          </div>
        </div>
      </wym-scroll-view>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import { formatCount } from '@/assets/ts/common'

  export default defineComponent({
    name: 'IndexBroadcast',
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    setup(props) {
      const broadcastList = reactive(props.data.creatives[0])

      function randomHexColor(i) {
        //随机生成十六进制颜色
        let color = [
          '#FFB6C1',
          '#E6E6FA',
          '#6495ED',
          '#98FB98',
          '#EEE8AA',
          '#F08080',
          '#F5F5F5',
        ]
        return color[i]
      }
      return {
        broadcastList,
        formatCount,
        randomHexColor,
      }
    },
  })
</script>

<style scoped lang="scss">
  .broadcast {
    font-size: 14px;
    @include background_color('background_color1');
    padding: 0.4375rem 0;
    border-radius: 10px;
    margin-bottom: 0.3125rem;
    .broadcast__header {
      font-size: 18px;
      margin: 0.3125rem 0.3125rem;
      @include font_color('font_color1');
    }
    .broadcast__wrapper {
      box-sizing: border-box;
      margin: 0 0.3125rem;
      padding-bottom: 0.3125rem;
      overflow: hidden;
      @include background_color('background_color2');
      border-radius: 10px;
      .broadcast__item {
        position: relative;
        display: inline-block;
        margin-right: 0.3125rem;
        width: 2rem;
        height: 2rem;
        // background: olivedrab;
        vertical-align: top;
        border-radius: 10px;
        padding: 0.125rem;
        .broadcast__item__name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          white-space: normal;
        }
        .broadcast__item__desc {
          font-size: 10px;
          position: absolute;
          bottom: 0.0625rem;
          left: 0.3125rem;
          right: 0.3125rem;
          display: flex;
          .broadcast__item__type {
            flex: 1;
          }
        }
        .van-icon-play {
          position: absolute;
          right: 0;
          bottom: 0.0625rem;
          color: red;
          background: #fff;
          padding: 0.0625rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
