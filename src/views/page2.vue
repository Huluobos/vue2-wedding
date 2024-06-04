<template>
  <div class="box" ref="scroll" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 需要滚动的内容 -->
    <img class="myPic" :src="item" alt="囍" v-for="(item,index) in imageList" :id="'imgList_' + index"
         :key="index + 'qqq'">
    <map-page></map-page>
    <dropBtn :x="-1" :y="-4"></dropBtn>
  </div>
</template>
<script>
import {imageList} from "@/assets/main";
import dropBtn from "@/views/components/dropBtn";
import MapPage from "@/views/mapPage.vue";

export default {
  name: 'page2',
  components: {
    MapPage, dropBtn
  },
  data() {
    return {
      imageList: imageList,
      scrollDistance: 1, // 每次滚动的像素数

      animations: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.scrollToBottom()
    }, 1000)
  },
  methods: {
    scrollToBottom() {
      let requestID;
      const scrollToBottom = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        if (this.animations && Math.ceil(scrollTop) < maxScrollTop) {
          requestID = window.requestAnimationFrame(scrollToBottom);
          this.animations = requestID
          window.scrollTo(0, scrollTop + this.scrollDistance);
        } else {
          window.cancelAnimationFrame(requestID);
          this.animations = true
          setTimeout(() => {
            this.scrollToBottom()
          }, 3000)
          console.log("滚动结束,3s后重试向下滚动")
        }
      };
      scrollToBottom();
    },
    handleTouchStart(event) {
      this.animations = undefined
    },
    handleTouchMove(event) {

    },
    handleTouchEnd(event) {

    },
  }
}
</script>
<style scoped lang="scss">
.box {
  position: relative;
}


.myPic {
  display: block;
  max-height: 100vh;
  max-width: 100vw;
  //margin-bottom: 10px;
  margin: 0 auto;

  .imgM {
    width: 100vw;
    display: block;
  }
}
</style>
