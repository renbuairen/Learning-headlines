import request from '@/utils/request'

export const getComments = (type, source, offset, limit) => {
    return request({
        url: '/v1_0/comments',
        params: {
            type,
            source,
            offset,
            limit
        }
    })
}

export const commentsLike = (target) => {
    return request({
        url: '/v1_0/comment/likings',
        method: 'POST',
        data: {
            target
        }
    })
}

export const cancelCommentsLike = (target) => {
    return request({
        url: `/v1_0/comment/likings/${target}`,
        method: 'DELETE'
    })
}

export const releaseComment = (target, content, artId) => {
    return request({
        url: '/v1_0/comments',
        method: 'POST',
        data: {
            target,
            content,
            art_id: artId
        }

    })
}
