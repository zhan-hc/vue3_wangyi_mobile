import { Request } from '@/utils/request';
// 歌单详细信息
export function songList_detail (parameter: Object)  {
    return Request.axiosInstance({
        url: '/playlist/detail',
        method: 'post',
        data: parameter
    })
}