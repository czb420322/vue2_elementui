import copyState from './state.js'

const mutations = {
    // 更新state
    updateState(state, list) {
        for (let params of list) {
            if (params.name.length == 1) {
                state[params.name[0]] = params.value
            } else if (params.name.length == 2) {
                state[params.name[0]][params.name[1]] = params.value
            } else if (params.name.length == 3) {
                state[params.name[0]][params.name[1]][params.name[2]] = params.value
            } else if (params.name.length == 4) {
                state[params.name[0]][params.name[1]][params.name[2]][params.name[3]] = params.value
            } else if (params.name.length == 5) {
                state[params.name[0]][params.name[1]][params.name[2]][params.name[3]][params.name[4]] = params.value
            }
        }
    },
    // 初始化
    resetState(state) {
        state = Object.assign(state, copyState())
    }
}

export default mutations