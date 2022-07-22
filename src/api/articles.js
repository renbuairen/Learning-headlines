import request from '@/utils/request'

export const getArticleInfo = (id) => {
    return request({
        url: `/v1_0/articles/${id}`
    })
}

export const articleLike = (target) => {
    return request({
        url: '/v1_0/article/likings',
        method: 'post',
        data: {
            target
        }
    })
}

export const delLike = (target) => {
    return request({
        url: `/v1_0/article/likings/${target}`,
        method: 'DELETE'
    })
}

export const articleCollect = (target) => {
    return request({
        url: '/v1_0/article/collections',
        method: 'post',
        data: {
            target
        }
    })
}

export const delCollect = (target) => {
    return request({
        url: `/v1_0/article/collections/${target}`,
        method: 'DELETE'
    })
}
