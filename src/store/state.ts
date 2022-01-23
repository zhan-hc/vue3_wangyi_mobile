

export const state: Object = {
  uid: sessionStorage.getItem('wangyi_uid') ?? '',
  userInfo: JSON.parse(sessionStorage.getItem('wangyi_userInfo') || '0') || {},
  level: 0,
  homeInfo: {}
}