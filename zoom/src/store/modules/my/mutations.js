const mutations = {
    // 更新用户信息
    updataUserInfo(state, params) {
        state.UserInfo = params
    },
    // 决策单元
    mYupdataDecisionUnit(state, params) {
        state.myDecisionUnit = params
    },
    // 获取代理协议号列表
    mYupdataAgreementList(state, params) {
        state.myagreementList = params
    },
    // 获取代理协议号列表(分享专录专用)
    mYupdataList(state, params) {
        state.myShareagreementList = params
    },
    // 更新state
    updateState(state, list) {
        for (let params of list) {
            if (params.name.length == 1) {
                state[params.name[0]] = params.value
            } else if (params.name.length == 2) {
                state[params.name[0]][params.name[1]] = params.value
            } else if (params.name.length == 3) {
                state[params.name[0]][params.name[1]][params.name[2]] = params.value
            }
        }
    }
}

export default mutations