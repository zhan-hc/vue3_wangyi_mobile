<template>
  <div class="broadcast-container">
    <div class="broadcast-wrapper" ref="wrapper">
      <p class="broadcast-header">{{broadcastList.uiElement.mainTitle.title}}</p>
      <div class="broadcast-content" ref="content">
        <div class="broadcast-item" v-for="(item,i) in broadcastList.resources" :key="item.resourceId" :style="{'background': randomHexColor(i)}">
          <div class="broadcast-name">{{item.uiElement.mainTitle.title}}</div>
          <div class="broadcast-desc">
            <div class="desc-type">广播</div>
            <van-icon name="play" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "vue";
import { formatCount, initScroll } from "@/assets/ts/common";

export default defineComponent({
  name:'IndexBroadcast',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const broadcastList = reactive(props.data.creatives[0])
    const wrapper = ref(null)
    const content = ref(null)

    onMounted(() => {
      initScroll(200, broadcastList.resources.length, content, wrapper)
    })

    function randomHexColor(i) { //随机生成十六进制颜色
      let color =  ['#FFB6C1', '#E6E6FA','#6495ED','#98FB98','#EEE8AA','#F08080','#F5F5F5']
      return color[i]
    }
    return {
      wrapper,
      content,
      broadcastList,
      formatCount,
      randomHexColor
    }
  }
}) 
</script>

<style scoped lang="scss">
.broadcast-container{
  font-size: 14px;
  background: #fff;
  padding: .3125rem 0;
  border-radius: 10px;
  margin-bottom: .625rem;
  .broadcast-header{
    font-size: 18px;
    margin: .3125rem .3125rem;
    color: #fff;
  }
  .broadcast-wrapper{
    // width: 280px;
    box-sizing: border-box;
    margin: 0 .3125rem;
    padding-bottom: .3125rem;
    overflow: hidden;
    background: #555;
    border-radius: 10px;
    .broadcast-content{
      touch-action: none;
      overflow: hidden;
      padding: 0 .3125rem .3125rem;
      .broadcast-item{
        position: relative;
        display: inline-block;
        margin-right: .3125rem;
        width: 2rem;
        height: 2rem;
        // background: olivedrab;
        vertical-align: top;
        border-radius: 10px;
        padding: .125rem;
        .broadcast-name{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .broadcast-desc{
          font-size: 10px;
          position: absolute;
          bottom: .0625rem;
          left: .3125rem;
          right: .3125rem;
          display: flex;
          .desc-type{
            flex: 1;
          }
        }
        .van-icon-play{
          position: absolute;
          right: 0;
          bottom: .0625rem;
          color: red;
          background: #fff;
          padding: .0625rem;
          border-radius: 50%;
        }
      }
    }
    
  }  
}

</style>
