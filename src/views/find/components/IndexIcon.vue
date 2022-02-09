<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="icon-item" v-for="item in iconList" :key="item.id">
        <div class="icon-img">
          <img v-lazy="item.iconUrl" alt="icon图标">
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "vue";
import { initScroll } from "@/assets/ts/common";
export default defineComponent({
  name: 'IndexIcon',
  props:{
  iconList: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const iconList = reactive(props.iconList)
    const wrapper = ref(null)
    const content = ref(null)

    onMounted(() => {
      initScroll(130, iconList.length, content, wrapper)
    })

    return {
      iconList,
      wrapper,
      content
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper{
  font-size: 24px;
  width: 750px;
  box-sizing: border-box;
  padding: 20px 30px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  overflow: hidden;
  .content{
    touch-action: none;
    .icon-item{
      display: inline-block;
      margin-right: 30px;
      text-align: center;
      .icon-img{
        background: #FFF1F1;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}
</style>
