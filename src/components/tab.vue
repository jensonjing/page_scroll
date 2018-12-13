<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/all">
      <span class="tab-link">全部</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/third">
      <span class="tab-link">排行榜</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .tab{
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    background-color: rgba(30, 30, 30, 0.5);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item .tab-link{
    padding-bottom: 5px;
    color: black;
  }
  .tab .tab-item.router-link-active .tab-link{
    color:#f00;
    border-bottom: 2px solid #f00;
  }
</style>


