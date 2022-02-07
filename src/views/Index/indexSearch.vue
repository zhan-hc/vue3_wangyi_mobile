<template>
  <div class="search-wrap">
    <div class="search-header">
      <LeftOutlined class="header-icon" @click="goback" />
      <input
        v-model="keyword"
        class="search-input"
        placeholder="坏女孩 最近很火哦"
        @input="onSearch"
      />
    </div>
    <div class="search-content" v-if="keyword">
      <div v-if="searchList">
        <div class="search-item" v-for="(item, i) in searchList" :key="i">
          <van-icon name="search" />
          <span class="search-current">{{
            item.keyword.slice(0, keyword.length)
          }}</span>
          <span>{{ item.keyword.slice(keyword.length) }}</span>
        </div>
      </div>
      <div v-else>
        <div class="search-item">
          <span class="search-null">{{ `搜索 "${keyword} "` }}</span>
        </div>
      </div>
    </div>
    <div v-else>我熟else</div>
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRefs } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDebounceFn } from '@vueuse/core'
  import { search_suggest } from '@/api/search/index'
  export default defineComponent({
    name: '',
    setup() {
      const route = useRouter()
      const state = reactive({
        keyword: '',
        searchList: [],
      })
      const goback = () => {
        route.go(-1)
      }

      function onSearch() {
        state.keyword !== '' &&
          search_suggest(state.keyword).then((res) => {
            state.searchList = res.result.allMatch
          })
      }
      return {
        ...toRefs(state),
        goback,
        onSearch: useDebounceFn(onSearch, 300),
      }
    },
  })
</script>

<style scoped lang="scss">
  .search-wrap {
    padding: 20px;
    .search-header {
      display: flex;
      margin-bottom: 20px;
      .header-icon {
        margin-right: 20px;
      }
      .search-input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        font-size: 24px;
        border-bottom: 1px solid #ccc;
        font-size: 32px;
        caret-color: #cf0000;
      }
    }
    .search-content {
      font-size: 28px;
      .search-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        .search-current {
          color: #ccc;
        }
        .van-icon-search {
          margin-right: 10px;
          font-size: 32px;
        }
        .search-null {
          color: #4169e1;
        }
      }
    }
  }
</style>
