<template>
  <div class="box" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 标题板块 -->
    <div class="page title" id="title">
      <div class="contenter">
        <div class="mainBox">
          <div class="content">
            <img class="A44" :src="mainPic" alt="">
          </div>
        </div>
        <div class="btnBox" @click="clickStart">
          <div class="btnIcon"><van-icon name="arrow-up" /></div>
          <div class="btn" >上滑查看请柬</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {mainPic} from "@/assets/main";
export default {
  name: 'App',
  data() {
    return {
      mainPic:mainPic,
      startY: 0,
      endY: 0,
      threshold: 100
    }
  },
  mounted() {
    setTimeout(()=>{
      this.clickStart()
    },35000)
  },
  methods:{
    clickStart(){

      setTimeout(()=>{
        this.$emit('playAudio',true)
        this.$nextTick(()=>{
          this.$router.push('/page2')
        })

      })
    },
    handleTouchStart(event) {
      this.startY = parseInt(event.touches[0].clientY) ;
    },
    handleTouchMove(event) {
      this.endY = parseInt(event.touches[0].clientY) ;
    },
    handleTouchEnd(event) {
      if (this.startY - this.endY > this.threshold) {
       this.clickStart()
      }
    },

  }
}
</script>
<style scoped lang="scss">
.btnBox{
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100vw;
  font-size: 1rem;
  text-align: center;
  padding: 0;
  .btnIcon{
    color: #fff;
    font-weight: bold;
    height: 3rem;
    font-size: 2.5rem;
    animation-play-state: running;
    animation: topToOp 1.5s ease 0.5s infinite;
    .van-icon{
      transform: scaleX(1.4)
    }
  }
  .btn{
    margin: 0 auto;
    width: calc(90vw - 3rem);
    padding: 0;
    color: #f1f1f1;
    /* text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black; */
    text-shadow: 0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%),
    0 0 2px hsl(40, 28.57%, 28.82%);
    //animation-play-state: running;
    //box-shadow: 0 0 .5em #b4a078;
    //animation: shake-baidu 1.5s ease 0s infinite;
  }
  @keyframes topToOp {
    0% {
      transform: translateY(40%);opacity:1
    }

    100% {
      transform: translateY(-30%);opacity:0

    }
  }
  @keyframes shake-baidu {
    from {
      transform: rotate(0deg);
    }
    4% {
      transform: rotate(5deg);
    }
    12.5% {
      transform: rotate(-5deg);
    }
    21% {
      transform: rotate(5deg);
    }
    29% {
      transform: rotate(-5deg);
    }
    37.5% {
      transform: rotate(5deg);
    }
    46% {
      transform: rotate(-5deg);
    }
    50%, to {
      transform: rotate(0deg);
    }
  }

}


.contenter {
  width: 100%;
  height: calc(100vh - 4rem) ;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .mainBox {
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .3em 1em rgba(0, 0, 0, 0.12);
    font: 150%/1.6 Baskerville, Palatino, serif;
    border-radius: 6px;
    overflow: hidden;
    .content {
      color: #000;
      hyphens: auto;
      background: hsla(0, 0, 100%, .35);
      overflow: hidden;
      position: relative;
      height: calc(90vh - 3rem);

      .A44 {
        display: block;
        height: calc(90vh - 3rem);
        margin: 0 auto 1em;
      }
    }
  }
}
.box{
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
/* 分页总体 */
.page {
  width: 100%;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
