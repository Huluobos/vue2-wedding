<template>
    <div
      @click="clickToWish"
      class="draggable-box"
      :style="{
      width: `${width}rem`,
      height: `${height}rem`,
      transform: `translate(${x}rem, ${y}rem)`,
      zIndex: zIndex,
    }"
      @mousedown.prevent="dragStart"
      @mousemove.prevent="drag"
      @mouseup.prevent="dragEnd"
    >
      <div class="btnWish" v-if="addBefore">
        点击这里为新人送上祝福
      </div>
      <van-icon style="color: red" name="like" />
    </div>
</template>

<script>
export default {
  name:"dropBtn",
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 3.5,
    },
    height: {
      type: Number,
      default: 3.5,
    },
  },
  data() {
    return {
      isDragging: false,
      startPosition: { x: 0, y: 0 },
      zIndex:1,
      addBefore:true
    };
  },
  created() {
    let session = sessionStorage.getItem('addBefore')
    if(session){
      this.addBefore = false
    }else{
      this.addBefore = true
    }
  },

  methods: {
    clickToWish(){
      sessionStorage.setItem('addBefore',true)
      this.$router.push('/wish')
    },
    dragStart(event) {
      this.isDragging = true
      this.startPosition.x = event.clientX - this.x
      this.startPosition.y = event.clientY - this.y
      this.zIndex++
    },
    drag(event) {
      if (!this.isDragging) return
      this.x = event.clientX - this.startPosition.x
      this.y = event.clientY - this.startPosition.y
    },
    dragEnd() {
      this.isDragging = false
    },
  },
};
</script>

<style lang="scss" scoped>

.draggable-box {
  position: fixed;
  right: 0;
  bottom: 0;
  cursor: move;
  box-sizing: border-box;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(180,160,120,.8);
  background-color: #b4a078;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity:.75;
  .van-icon{
    font-size: 2.6rem;
    color: #ff0000;
  }

}
.draggable-box :active {
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0));
}
.btnWish{
  position: absolute;
  left: -13.5em;
  top: 2em;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  background: #b4a078;
  box-shadow: 0px 0px 3px #b4a078;
  color: #fff;
  animation: 1s blink-normal infinite step-end;
  width: 13em;
}
.btnWish:after{
  background: #b4a078;
  width: 0.7em;
  height: 0.7em;
  content: '';
  margin: auto;
  position: absolute;
  transform: rotateZ(45deg);
  top: 0.5em;
  right: -0.3em;

}
@keyframes blink-normal {
  50% {
    color: transparent;
  }
}
@keyframes blink-alternate {
  to {
    color: transparent;
  }
}
</style>
