<template>
  <div class="header-wrapper">
    <MenuOutlined />
    <div class="header-content">
      <SearchOutlined />
    </div>
    <AudioFilled />
  </div>
</template>

<script>
export default {
  name: 'IndexHeader',
  components: {
  }
}
</script>

<style scoped lang="scss">
.header-wrapper{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #f5f5f5;
  box-sizing: border-box;
  .anticon-menu{
    font-size: 48px;
    margin-right: 20px;
  }
  .anticon-audio{
    font-size: 48px;
  }
  .header-content{
    flex: 1;
    margin-right: 10px;
    padding: 0 20px;
    background-color: #fff;
    border-radius: 40px;
    .anticon-search{
      color: #bababa;
    }
  }
}
</style>
