<template>
  <div id="app">
    <tab></tab>
    <v-touch @swipeleft="goRight" @swiperight="goLeft">
      <!-- 方案一:淡入淡出 -->
      <!-- <transition name="slide-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition> -->
      <!-- 方案二:左右滑动 -->
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </v-touch>
  </div>
</template>

<script>
import Tab from "./components/tab";
import VueTouch from "vue-touch";
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import { mapGetters, mapMutations } from "vuex";

Vue.use(VueTouch, { name: "v-touch" });

export default {
  name: "app",
  data() {
    return {
      pathArr: [],
      transitionName:''
    };
  },
  created(){
    //根据路由修改状态值
    let currentroute = this.$route.fullPath;
    let routes = this.$router.options.routes;
    for(var i = 0; i < routes.length;i++){
      if(currentroute == routes[i].path){
        this.setCurrentPathIndex(i);
        break;
      }
    }
  },
  computed: {
    ...mapGetters(["currentPathIndex"])
  },
  methods: {
    ...mapMutations({
      setCurrentPathIndex: "SET_CURRENT_PATH_INDEX"
    }),
    goRight() {
      let pathObj = this.$router.options.routes;
      let nextIndex = this.currentPathIndex + 1;
      this.setCurrentPathIndex(nextIndex);
      this.transitionName = 'slide-right'//方案二js，如使用方案一则注释此句
      //如果大于了最大导航数则设置状态值为最大值
      let maxLength = pathObj.length-1;
      if (nextIndex > maxLength) {
        nextIndex = maxLength;
        this.setCurrentPathIndex(maxLength);
        return;
      }
      router.push(pathObj[nextIndex]);
    },
    goLeft() {
      let pathObj = this.$router.options.routes;
      let nextIndex = this.currentPathIndex - 1;
      this.setCurrentPathIndex(nextIndex);
      this.transitionName = 'slide-left'//方案二js，如使用方案一则注释此句
      //如果小于最小值则设置状态值为最小值
      if (nextIndex <= 1) {
        nextIndex = 1;
        this.setCurrentPathIndex(1);
      }
      router.push(pathObj[nextIndex]);
    }
  },
  components: {
    Tab
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  position: relative;
}
/******************方案一*******************/
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(1px);
  opacity: 0;
}
/***************方案二********************/
.child-view {
  position: absolute;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>

