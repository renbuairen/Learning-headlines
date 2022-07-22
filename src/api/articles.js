import request from '@/utils/request'

export const getArticleInfo = (id) => {
    return request({
        url: `/v1_0/articles/${id}`
    })
}
