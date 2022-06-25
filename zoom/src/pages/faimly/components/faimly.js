/*
 * @Author: your name
 * @Date: 2021-08-06 14:32:22
 * @LastEditTime: 2021-08-10 13:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new_agent\src\minxins\faimly.js
 */
export const getClientAjaxList = {
  data() {
    return {
      clientDataList: [],
      loading: false,
      finished: false,
      records: "",
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_FAIMLY_ALL,
        method: "post",
        data: {
          customerType: this.$route.params.id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
      });
      this.loading = false;
      if (res.code === 0 && res.content.result == "0") {
        const {
          data: { data: clientDataList, records },
        } = res.content;
        this.clientDataList = [...this.clientDataList, ...clientDataList || []]
        if (this.clientDataList.length >= records) {
          this.finished = true;
        }
        this.currentPage++
      }
    },
    clickGo(id) {
      this.$router.push({
        path: `/infoClient/${id}`
      })
    }
  }

}