import { SetupContext } from "@vue/runtime-core";

/* 网易云音乐设置弹出框的list列表信息 */
interface setlist {
  title?: String,
  data: Array<listdata>
}
interface listdata {
  id: String,
  icon: String,
  text: String 
}
export const list: Array<setlist> = [
  {
    data: [
      {
        id: '1001',
        icon: 'icon-xinxi',
        text: '我的消息'
      },
      {
        id: '1002',
        icon: 'icon-beilei',
        text: '云贝中心'
      },
      {
        id: '1003',
        icon: 'icon-dengpao1',
        text: '创作者中心'
      }
    ]
  },
  {
    title: '音乐服务',
    data: [
      {
        id: '1004',
        icon: 'icon-yanchu',
        text: '云村有票'
      },
      {
        id: '1005',
        icon: 'icon-gouwuche',
        text: '商城'
      },
      {
        id: '1006',
        icon: 'icon-icon',
        text: '游戏中心'
      },
      {
        id: '1007',
        icon: 'icon-cailing',
        text: '口袋彩铃'
      }
    ]
  },
  {
    title: '其他',
    data: [
      {
        id: '1008',
        icon: 'icon-shezhi',
        text: '设置'
      },
      {
        id: '1009',
        icon: 'icon-yejian',
        text: '夜间模式'
      },
      {
        id: '1010',
        icon: 'icon-shizhong',
        text: '定时关闭'
      },
      {
        id: '1011',
        icon: 'icon-gexingzhuangban',
        text: '个性装扮'
      },
      {
        id: '1012',
        icon: 'icon-tingshu',
        text: '边听边存'
      },
      {
        id: '1013',
        icon: 'icon-zaixiantinggemianliuliang',
        text: '在线听歌免流量'
      },
      {
        id: '1014',
        icon: 'icon-jinzhi',
        text: '音乐黑名单'
      },
      {
        id: '1015',
        icon: 'icon-dunpai',
        text: '青少年模式'
      },
      {
        id: '1016',
        icon: 'icon-yinlenaozhong',
        text: '音乐闹钟'
      }
    ]
  },
  {
    data: [
      {
        id: '1017',
        icon: 'icon-wodedingdan',
        text: '我的订单'
      },
      {
        id: '1018',
        icon: 'icon-youhuiquan',
        text: '优惠券'
      },
      {
        id: '1019',
        icon: 'icon-wode-kefu',
        text: '我的客服'
      },
      {
        id: '1020',
        icon: 'icon-fenxiang',
        text: '分享网易云音乐'
      },
      {
        id: '1021',
        icon: 'icon-guanyu',
        text: '关于'
      }
    ]
  }
]