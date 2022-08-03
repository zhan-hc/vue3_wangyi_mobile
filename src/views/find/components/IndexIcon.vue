<template>
  <div class="wrapper">
    <wym-scroll-view>
      <div class="icon-item" v-for="item in iconList" :key="item.id">
        <div class="icon-img">
          <img v-lazy="item.iconUrl + '?param=50y50'" alt="icon图标" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </wym-scroll-view>
  </div>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  export default defineComponent({
    name: 'IndexIcon',
    props: {
      iconList: {
        type: Array,
        default: [],
      },
    },
    setup(props) {
      const iconList = reactive(props.iconList)

      return {
        iconList,
      }
    },
  })
</script>

<style scoped lang="scss">
  @import '@/assets/scss/_handle.scss';
  .wrapper {
    font-size: 14px;
    box-sizing: border-box;
    padding: 0.3125rem 0.3125rem;
    border-bottom: 1px solid #ccc;
    @include background_color('background_color1');
    .icon-item {
      display: inline-block;
      margin-right: 0.625rem;
      text-align: center;
      .icon-img {
        display: inline-block;
        @include background_color('icon_bg');
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        margin-bottom: 0.3125rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
