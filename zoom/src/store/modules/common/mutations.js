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
      }
    }
  }
}

export default mutations