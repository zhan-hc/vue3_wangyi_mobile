<template>
  <div class="nav-wrap">
    <div
      class="nav-item"
      v-for="(item, i) in iconList"
      :key="item.id"
      :class="{ active: i === activeTab }"
      @click="handleClick(i)"
    >
      <div class="iconfont" :class="item.icon"></div>
      <div class="item-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup>
  import { ref, inject } from 'vue'

  const activeTab = inject('activeTab')
  const iconList = ref([
    {
      id: '1001',
      icon: 'icon-wangyiyunyinyuemusic1193417easyiconnet',
      text: '发现',
    },
    {
      id: '1002',
      icon: 'icon-xinhao',
      text: '播客',
    },
    {
      id: '1003',
      icon: 'icon-music3',
      text: '我的',
    },
    {
      id: '1004',
      icon: 'icon-huatong',
      text: 'k歌',
    },
    {
      id: '1005',
      icon: 'icon-user-more',
      text: '云村',
    },
  ])

  const handleClick = (i) => {
    activeTab.value = i
  }
</script>

<style scoped lang="scss">
  .nav-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5rem;
    display: flex;
    align-items: center;
    @include background_color('player_nav_color');
    z-index: 2;
    font-size: 10px;
    border-top: 1px solid #ccc;
    .nav-item {
      flex: 1;
      text-align: center;
      color: #9a9a9a;
      .iconfont {
        font-size: 22px;
      }
      &.active {
        color: #fe3a3b;
        text-align: center;
        .iconfont {
          font-size: 22px;
          margin: 0 auto;
          width: 1rem;
          border-radius: 50%;
          @include background_image('bottom_nav_color');
          // background: linear-gradient(to top right, #fe3a3b, #ff9d9c);
          color: #fff;
        }
      }
      .iconfont {
        // font-size: 48px;
      }
    }
  }
</style>
