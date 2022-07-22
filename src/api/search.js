import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索建议的关键字
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
    return request({
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

export const getSearchResults = (q, page, perPage) => {
    return request({
        url: '/v1_0/search',
        params: {
            q,
            page,
            per_page: perPage
        }
    })
}
