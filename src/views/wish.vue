<template>
  <div class="box">
    <div class="title">
      <p class="iconT" @click="goBack">
        <van-icon name="arrow-left"/>
      </p>
      <p class="iconT centerT">婚礼祝福群</p>
      <p class="iconT" @click="changeName">
        <van-icon name="weapp-nav"/>
      </p>
    </div>
    <div class="message"  ref="vanListScroll">
<!--      :immediate-check="false"-->
      <van-list

        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <div class="each" v-for="(item,ins) in wxChatData" :key="ins + 'ss'">
<!--          v-if="timeShow(ins,item.cTime)"-->
          <p class="time" ><span v-text="item.bTime"></span></p>
          <div :class="'main' + (item.bType==1?' right':' left')">
            <!--              头像-->
            <img class="avatar" width="45" height="45" :src="getImageUrl(item.imgIndex)">
            <!-- 文本 -->
            <div class="name" v-if="item.bType==1" v-html="showName(item)"></div>
            <div class="name" v-else v-html="item.name"></div>
            <div class="text" v-html="item.content"></div>
          </div>
        </div>

      </van-list>

    </div>
    <div class="edit">

      <van-field
        style="width: calc(100vw - 5rem)"
        label-width="0"
        v-model="youMes"
        rows="1"
        size="small"
        autosize
        label=""
        type="textarea"
        placeholder=""
      />
      <van-button style="width:calc(5rem - 2rem)" size="size" type="primary" loading-type="spinner" :loading="loadingBtn" @click="sendMes">发送</van-button>
    </div>

    <van-dialog v-model="showDialog" :title="dialogTitle" show-cancel-button :before-close="beforeClose" @cancel="cancel">
      <div class="nameBox">
        <van-field
          size="large"
          maxlength="10"
          label-width="0"
          v-model="youName"
          label=""
        />
      </div>
    </van-dialog>
  </div>
</template>
<script>

import {addWish, changeNameWish, getWish} from '@/api'
import { Notify } from 'vant';
export default {
  name: 'wish',

  data() {
    return {
      youMes: '',
      youName: '',
      loadingBtn: false,

      showDialog: false,
      dialogTitle:"请先输入您的姓名或昵称",

      loading: false,
      finished: false,
      wxChatData: [],
      pageNo:1,
      pageSize:10,
      total:0,

    }
  },
  computed: {

  },
  created() {
    const name = localStorage.getItem('name') || false
    this.getUid()
    if(!name){
      this.changeName()
    }
    this.name = localStorage.getItem('name') || ''
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 显示的姓名 (本人的话 获取本地姓名、 其他人从服务器取）
    showName(item){
      if(item.type == 1){
        return localStorage.getItem('name')
      }else{
        return item.name
      }

    },
    // 拼接图片头像 url
    getImageUrl(index) {
      // return require('@/assets/icons/B' + index + '.png'); // 使用require函数确保webpack可以处理路径
      return index ? 'http://www.huluobos.com/cdn/B' + index + '.png' : 'http://www.huluobos.com/cdn/B' + this.getRandomNumber() + '.png'

    },
    // 点击更改昵称按钮
    changeName(){
      const name = localStorage.getItem('name') || false
      if(name){
        this.dialogTitle = '更改您的姓名或昵称'
        this.youName = name
        this.showDialog = true
      }else{
        this.dialogTitle = '请先输入您的姓名或昵称'
        this.youName = ''
        this.showDialog = true
      }
    },
    // 发送请求： 更改本人名称
    sendNamePost(name){
      return new Promise((resolve, reject)=>{
        const params = {
          name:name,
          uId:this.getUid()
        }
        changeNameWish(params).then(res=>{
          this.$toast({
            message: '更改成功',
            position: 'bottom',
          });
          resolve()
        }).catch(()=>{
          reject()
        })

      })

    },
    // 获取本机用户  uId 唯一码
    getUid(){
      const uId = localStorage.getItem('uId') || false
      if(!uId){
        localStorage.setItem('uId',new Date().getTime())
      }
      return localStorage.getItem('uId')
    },
    // dialog 关闭前的钩子 ，点击确定为 corform 取消为 cancel
    async beforeClose(action,done){
      if(action !=='cancel'){

        if((this.youName || this.youName ===0) && this.youName !==''){
          localStorage.setItem('name',this.youName)
          await this.sendNamePost(this.youName)
          done()
        }else{
          Notify({
            message: '请填写您的姓名或一个昵称',
            color: '#ffffff',
            background: '#b4a078',
            duration: 2500,
          });
          done(false)

        }
      }else{
        done()
      }

    },
    // 取消按钮
    cancel(){
      this.youName = ""
    },
    // 返回照片页
    goBack() {
      this.$router.push('/page2')
    },
    // 发送祝福消息
    sendMes() {
      if((this.youMes || this.youMes===0 || this.youMes===false)&& this.youMes!==''){
        let params ={
          name:localStorage.getItem('name') + '',
          content:this.youMes+'',
          uId:this.getUid(),
          type:1,
          imgIndex:undefined
        }
        if(localStorage.getItem('imgIndex')){
          params['imgIndex'] = localStorage.getItem('imgIndex')
        }else{
          let ins = this.getRandomNumber()
          localStorage.setItem('imgIndex',ins)
          params['imgIndex'] = ins + ''
        }

        addWish(params).then(res=>{
          if(res.success){
            this.getList(this.total+1,1)
            this.youMes = ''
          }
        })
      }
    },
    // 获取头像随机数
    getRandomNumber() {
      return Math.floor(Math.random() * 100) + 1 ;
    },
    // 列表依次加载函数
    onLoad() {
      this.loading = true
      this.pageNo++
      this.getList(this.pageNo)
    },
    // 获取祝福列表函数
    getList(pageNo,pageSize){
      // 有pageNo 是表示是第一次
      const params ={
        //   是否分页？？
        pageNo:(pageNo || pageNo ===0) ? pageNo : this.pageNo,
        pageSize:(pageSize || pageSize ===0) ? pageSize : this.pageSize
      }
      getWish(params).then(res=>{
        this.loading = false
        this.total = res.total
        let list= [... this.wxChatData]
        if ( res.data.length ===0 ) {
          this.finished = true
          if(pageNo || pageNo ===0){this.pageNo--}

        }else{
          let arr = res.data
          if(pageNo || pageNo ===0){
            list = [...this.wxChatData,...arr]
          }else{
            list = arr
          }
        }
        // 处理数据
        list.map((val,ins)=>{
          // 针对时间的处理
          if(ins>1){
            var nowStr = val?.cTime.toString().substring(0, 15)
            var before = list[ins-1]?.cTime?.substring(0, 15) || ''
            console.log(nowStr === before)
            if(nowStr === before){
              val['bTime'] = ''
            }else{
              val['bTime'] = val?.cTime.toString().substring(0, 16)
            }
          }else{
            val['bTime'] = val?.cTime.toString().substring(0, 16)
          }
          // 针对type的处理
          const myuId = this.getUid()
          if(myuId === val.uId){
            val['bType'] = 1
          }else{
            val['bType'] = 2
          }

          return val
        })
        this.wxChatData = list

        this.$nextTick(() => {
          let middle= this.$refs["vanListScroll"];
          middle.scrollTop = middle.scrollHeight;
        })
      })
    },
  },
}
</script>

<style scoped lang="scss">
.box {
  font-family: '微软雅黑', Arial, sans-serif;
  webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  position: relative;
  box-shadow: 1px 1px 20px -5px #000;
  background: #EDEDED;
  overflow-y: scroll;
  padding: 0;

  .title {
    border-bottom: 1px solid #E7E7E7;
    //color:#000;
    color: #fff;
    background: #000;
    //background: #EDEDED;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      color: #fff;
    }

    .iconT {
      color: #fff;
      display: block;
      height: 50px;
      line-height: 50px;
      margin: 0 .5rem;
      font-size: 1rem;
      width: 2rem;
    }

    .centerT {
      width: calc(100vw - 8rem);
      font-size: 0.90rem;
      font-weight: 600;
      letter-spacing: 1.5px;
    }
  }

  .message {
    height: calc(100vh - 105px);
    padding: 10px 15px;
    overflow-y: scroll;
    background-color: #F5F5F5;
  .each{
    margin-top: .6rem;

  }
    .time {
      margin-bottom:10px;
      text-align: center;
    }

    .text {
      display: inline-block;
      position: relative;
      max-width: calc(100% - 75px);
      min-height: 35px;
      line-height: 1.5;
      font-size: 15px;
      padding: 6px 10px;
      text-align: left;
      word-break: break-all;
      background-color: #fff;
      color: #000;
      border-radius: 4px;
      box-shadow: 0px 1px 7px -5px #000;
    }

    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      background: #fff;
    }
    .name{
      font-size: 13px;
      margin-bottom: 2px;
    }

    .time > span {
      display: inline-block;
      padding: 0 5px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #DADADA;
    }

    .system > span {
      padding: 4px 9px;
      text-align: left;
    }

    .text:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fff;
    }

    .right {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }

      .text {
        background-color: #9EEA6A;
      }

      .text:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #9EEA6A;
      }

    }

    .left {
      text-align: left;
    }

    .image {
      max-width: 200px;
    }

  }

  .edit {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    clear: both;
    padding: 10px;
    background-color: #e5e5e5;
    text-align: left;
    ::v-deep .van-cell {
      display: inline-block;
      padding: 4px 6px;

      //float: left;
    }

    ::v-deep .van-button {
      display: inline-block;
      float: right;

      height: 32px;
      font-size: 12px;
      color: #fff;
    }
  }

  .an-move-left {
    left: 0;
    animation: moveLeft .7s ease;
    -webkit-animation: moveLeft .7s ease;
  }

  .an-move-right {
    left: 0;
    animation: moveRight .7s ease;
    -webkit-animation: moveRight .7s ease;
  }

  .bgnone {
    background: none;
  }

  @keyframes moveRight {
    0% {
      left: -20px;
      opacity: 0
    }
    100% {
      left: 0;
      opacity: 1
    }
  }

  @-webkit-keyframes moveRight {
    0% {
      left: -20px;
      opacity: 0
    }
    100% {
      left: 0px;
      opacity: 1
    }
  }
  @keyframes moveLeft {
    0% {
      left: 20px;
      opacity: 0
    }
    100% {
      left: 0px;
      opacity: 1
    }
  }

  @-webkit-keyframes moveLeft {
    0% {
      left: 20px;
      opacity: 0
    }
    100% {
      left: 0px;
      opacity: 1
    }
  }

  @media (max-width: 367px) {
    .fzDInfo {
      width: 82%;
    }
  }

  img.static-emotion-gif, img.static-emotion {
    vertical-align: middle !important;
  }
  .nameBox{
    margin: .5rem;
    ::v-deep .van-field__body {
      border:1px solid #b4a078;
      border-radius: 3px;

      .van-field__control{
        text-align: center;
        padding: .3rem 0;
        font-size: 1rem;
      }
    }

  }


}

</style>
