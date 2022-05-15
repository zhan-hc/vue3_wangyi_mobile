<template>
  <div class="singerList-wrap">
    <div class="singerList-item" v-for="item in dataList" :key="item.id">
      <div class="item-img">
        <img v-lazy="item.picUrl + '?param=50y50'" alt="用户头像" />
      </div>
      <div class="item-title">
        <span v-html="highLightStr(item.name, keywords)"></span>
        <span v-if="item.alias.length" class="item-desc">{{
          `（${item.alias[0]}）`
        }}</span>
      </div>
      <div class="follow-btn">
        <van-icon name="plus" />
        <span>关注</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { formatCount, highLightStr } from '@/assets/ts/common'
  export default defineComponent({
    name: 'singerList',
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
      return {
        formatCount,
        highLightStr,
      }
    },
  })
</script>

<style scoped lang="scss">
  .singerList-wrap {
    @include background_color('background_color1');
    @include font_color(('font_color1'));
    .singerList-item {
      display: flex;
      align-items: center;
      height: 1.25rem;
      margin-bottom: 0.3125rem;
      .item-img {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        margin-right: 0.3125rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .item-title {
        flex: 1;
        width: 160px;
        @include font_color(('font_color1'));
        @include ellipsis;
        .item-desc {
          color: #999;
        }
      }
      .follow-btn {
        color: red;
        font-size: 10px;
        border: 1px solid red;
        border-radius: 10px;
        padding: 0.0625rem 0.125rem;
        .van-icon-plus {
          margin-right: 0.0625rem;
        }
      }
    }
  }
</style>
