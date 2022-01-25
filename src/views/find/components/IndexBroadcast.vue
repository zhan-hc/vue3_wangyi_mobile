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

<script setup>
import { ref, reactive, onMounted } from "vue";
import { formatCount, initScroll } from "@/assets/ts/common";

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    }
  })

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
          -webkit-line-clamp: 2;
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
