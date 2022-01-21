export default {
  setUserLevel: (state: any, data: Object) => {
    state.level = data
  },
  setUserInfo: (state: any, data: Object) => {
    state.userInfo = data
  },
  setHomeInfo: (state: any, data: Object) => {
    state.homeInfo = data
  }
}