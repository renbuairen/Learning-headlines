class Storage {
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
    }

    get(key) {
        const value = localStorage.getItem(key)
        // 如果parse的是一个JSON格式字符串, return JSON. parse()
        // 不是呢? return原数据
        try {
            return JSON.parse(value)
        } catch (err) {
            return value
        }
    }

    remove(key) {
        localStorage.removeItem(key)
    }
}

export default new Storage()
