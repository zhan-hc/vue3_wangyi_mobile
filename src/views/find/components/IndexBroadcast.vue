<template>
  <div class="broadcast-container">
    <div class="broadcast-wrapper" ref="wrapper">
      <p class="broadcast-header">{{broadcastList.uiElement.mainTitle.title}}</p>
      <div class="broadcast-content" ref="content">
        <div class="broadcast-item" v-for="(item,i) in broadcastList.resources" :key="item.resourceId" :style="{'background': randomHexColor(i)}">
          <div class="broadcast-name">{{item.uiElement.mainTitle.title}}</div>
          <div class="broadcast-desc">
            <div class="desc-type">广播</div>
            <CaretRightOutlined/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";
import { formatCount } from "@/assets/ts/common";
export default {
  name: 'IndexBroadcast',
  props: {
    data: {
      type: Object
    }
  },
  setup (props) {
    const broadcastList = reactive(props.data.creatives[0])
    const wrapper = ref(null)
    const content = ref(null)
    onMounted(() => {
      let recWidth = 170 // icon宽度
      let margin = 30 // margin-right
      let width = ((recWidth + margin) * broadcastList.resources.length)/2
      content.value.style.width = width + 'px' // 给container设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        bounce: true,
        eventPassthrough: 'vertical'
      })
    })
    function randomHexColor(i) { //随机生成十六进制颜色
      let color =  ['#FFB6C1', '#E6E6FA','#6495ED','#98FB98','#EEE8AA','#F08080','#F5F5F5']
      return color[i]
    }
    return {
      content,
      wrapper,
      broadcastList,
      formatCount,
      randomHexColor
    }
  }
}
</script>

<style scoped lang="scss">
.broadcast-container{
  font-size: 24px;
  background: #fff;
  padding: 20px 0;
  border-radius: 20px;
  margin-bottom: 20px;
  .broadcast-header{
    font-size: 36px;
    margin: 20px 30px;
    color: #fff;
  }
  .broadcast-wrapper{
    width: 690px;
    box-sizing: border-box;
    margin: 0 30px;
    padding-bottom: 20px;
    overflow: hidden;
    background: #26292b;
    border-radius: 10px;
    .broadcast-content{
      touch-action: none;
      overflow: hidden;
      padding: 10px 20px;
      .broadcast-item{
        position: relative;
        display: inline-block;
        margin-right: 30px;
        width: 160px;
        height: 160px;
        // background: olivedrab;
        vertical-align: top;
        border-radius: 10px;
        padding: 10px;
        .broadcast-name{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .broadcast-desc{
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          .desc-type{
            flex: 1;
          }
        }
        .anticon-caret-right{
          font-size: 36px;
          // position: absolute;
          // right: 20px;
          // bottom: 20px;
          color: red;
          background: #fff;
          padding: 3px;
          border-radius: 50%;
        }
      }
    }
    
  }  
}

</style>
