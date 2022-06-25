<template>
  <div class="items-content">
    <van-image class="left-pictures" width="70" height="70" :src="itemObj.imgUrl" />
    <div class="items-content-info">
      <van-cell :title="itemObj.activityName" is-link @click="goDetail(itemObj.activityId)" />
      <div class="items-content-info-right">
        <div class="picCounts">
          <van-image v-for="(item, index) in avatarList" :key="index" class="pictures" width="20" height="20" :src="item" round />
        </div>
        <div class="counts">等{{avatarListLength}}人来访</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myGuestItem",
  props: {
    itemObj: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      avatarList: [],
      avatarListLength: 0
    }
  },
  created() {
    this.avatarListLength = this.itemObj.avatarList.length
    this.avatarList = this.avatarListLength > 6 ? this.itemObj.avatarList.slice(0, 6) : this.itemObj.avatarList
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: `/myGuestDetail/${id}`
      })
    }
  },
};
</script>
<style scoped lang="less">
.items-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .6rem;
  width: 92%;
  margin-left: 4%;
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.7rem 0.5rem;
  .left-pictures {
    flex-shrink: 0;
    border-radius: 5px;
    overflow: hidden;
  }
  &-info {
    flex: 1;
    margin-left: 0.95rem;
    /deep/.van-cell.van-cell--clickable {
      padding: 0 0.625rem 1.25rem 0;
      font-size: 0.9rem;
    }
    /deep/.van-cell::after {
      border: none;
    }
    &-right {
      display: flex;
      .picCounts {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .pictures:not(:nth-of-type(1)) {
          margin-left: -5px;
        }
      }
      .counts {
        flex-shrink: 0;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>