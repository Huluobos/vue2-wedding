<template>
  <div class="content">
    <div class="boxImg">
      <img  width="100%" :src="map1" :alt="'囍'"/>
    </div>
    <div class="boxImg">
      <img @click.stop="clickToApp"  width="100%" :src="map2" :alt="'囍'"/>
    </div>
    <div class="boxImg">
      <img  width="100%" :src="map3" :alt="'囍'"/>
    </div>
    <div class="boxImg two">
      <img @click.stop="clickToTel('18332725321')"  width="100%" :src="map41" :alt="'囍'"/>
      <img @click.stop="clickToTel('15584264297')"  width="100%" :src="map42" :alt="'囍'"/>
    </div>
    <div class="boxImg">
      <img  width="100%" :src="map5" :alt="'囍'"/>
    </div>

    <van-popup
      safe-area-inset-bottom
      class="popup-my"
      position="bottom"
      round
      :style="{ height: '15rem' }"
      v-model="popupVisible">

      <div class="mapList">
        <div class="title">使用 App 导航</div>
<!--        <div class="title">{{ place + ': 使用 App 导航' }}</div>-->
        <div class="mapEach" @click="toGaoDe">高德地图</div>
        <div class="mapEach" @click="baidu">百度地图</div>
        <div class="mapEach" @click="tengxun">腾讯地图</div>
      </div>
    </van-popup >
  </div>
</template>
<script>

export default {
  name: 'mapPage',
  data(){
    return{
      map1:require('@/assets/map/map1.jpg'),
      map2:require('@/assets/map/map2.jpg'),
      map3:require('@/assets/map/map3.jpg'),
      map41:require('@/assets/map/map41.jpg'),
      map42:require('@/assets/map/map42.jpg'),
      map5:require('@/assets/map/map5.jpg'),

      baseType:'.jpg',
      place:"婚宴地址",
      title:"德惠市福临门饭店",
      popupVisible:false, //是否展示
      key:'79c2f45dfd0c3d2e82a74c0e86bb28d1',
      //金色B4A27E  背景黑5C5C5C 红色660000
    }
  },
  created() {
    // if( this.title === '德惠市福临门饭店'){
    //   this.place = '婚宴地址'
    // }else{
    //   this.place = '住宿地址'
    // }

    // 饭店 德惠市福临门饭店 125.710769,44.53798
      // https://restapi.amap.com/v3/staticmap?location=125.710769,44.537989&zoom=6&size=320*200&scale=2&markers=large,0xFF6700,A:125.710769,44.537989&labels=德惠市福临门饭店,2,1,25,0xFF6700,0xFFFFFF:125.710769,44.506989&key=79c2f45dfd0c3d2e82a74c0e86bb28d1
    //   酒店 塞尚商务酒店 125.709008,44.53614
    // https://restapi.amap.com/v3/staticmap?location=125.709008,44.53614&zoom=6&size=531*850&scale=2&markers=large,0xFF6700,A:125.709008,44.53614&labels=塞尚商务酒店,2,1,25,0xFF6700,0xFFFFFF:125.709008,44.53614&key=79c2f45dfd0c3d2e82a74c0e86bb28d1
  },
  methods: {
    clickToTel(phone){
      window.location.href = `tel://${phone}`;
    },
    clickToApp(){
      let ua = navigator.userAgent.toLowerCase()
      // ios
      if(ua.indexOf('like mac os x') > -1) {
        this.OS = 'IOS'
      }
      // android
      if(ua.indexOf('android') > -1) {
        this.OS = 'Android'
      }
      setTimeout(()=>{
        this.popupVisible = true
      },10)
    },
    toGaoDe() {
      // 使用地图标注功能
      if (this.OS === 'IOS') {
        location.href = this.title ==='德惠市福临门饭店' ? `https://uri.amap.com/marker?position=125.710769,44.537989&name=福临门饭店&coordinate=gaode&callnative=1`
          : `https://uri.amap.com/marker?position=125.709008,44.53614&name=塞尚商务酒店&coordinate=gaode&callnative=1`
      }
      if (this.OS === 'Android') {
        location.href = this.title ==='德惠市福临门饭店' ? `https://uri.amap.com/marker?position=125.709008,44.53614&name=福临门饭店&coordinate=gaode&callnative=1`
          : `https://uri.amap.com/marker?position=125.709008,44.53614&name=塞尚商务酒店&coordinate=gaode&callnative=1`
      }
    },
    baidu() {
      // 使用关键词搜索功能
      console.log('百度');
      // https://lbs.baidu.com/faq/api?title=webapi/uri/web
      if (this.OS === 'IOS') {
        window.location.href = this.title ==='德惠市福临门饭店' ? `http://api.map.baidu.com/marker?title=福临门饭店&location=44.543634,125.717415&content=张博一王莹莹婚礼举办地址&output=html&src=webapp.baidu.openAPIdemo"`
          : `http://api.map.baidu.com/marker?title=塞尚商务酒店&location=44.541815,125.715574&content=张博一王莹莹婚礼宾客下榻酒店地址&output=html&src=webapp.baidu.openAPIdemo"`
      }
      if (this.OS === 'Android') {
        window.location.href = this.title ==='德惠市福临门饭店' ? `http://api.map.baidu.com/marker?title=福临门饭店&location=44.543634,125.717415&content=张博一王莹莹婚礼举办地址&output=html&src=webapp.baidu.openAPIdemo`
          : `http://api.map.baidu.com/marker?title=塞尚商务酒店&location=44.541815,125.715574&content=张博一王莹莹婚礼宾客下榻酒店地址&output=html&src=webapp.baidu.openAPIdemo`
      }
    },
    tengxun() {
      // 使用周边搜索功能
      console.log('腾讯');
      // https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileMarker
      if (this.OS === 'IOS') {
        // key 的申请地址：https://lbs.qq.com/dev/console/application/mine
        location.href = this.title ==='德惠市福临门饭店' ? "https://apis.map.qq.com/uri/v1/marker?marker=coord:44.537176,125.710196;title:福临门饭店;addr:张博一王莹莹婚礼举办地址&referer=XUHBZ-SE3WM-2W76A-6ZFLH-XP3AQ-44FUP"
          : "https://apis.map.qq.com/uri/v1/marker?marker=coord:44.536167,125.708949;title:塞尚商务酒店;addr:张博一王莹莹婚礼宾客下榻酒店地址&referer=XUHBZ-SE3WM-2W76A-6ZFLH-XP3AQ-44FUP"

      }
      if (this.OS === 'Android') {
        location.href = this.title ==='德惠市福临门饭店' ? "https://apis.map.qq.com/uri/v1/marker?marker=coord:44.537176,125.710196;title:福临门饭店;addr:张博一王莹莹婚礼举办地址&referer=XUHBZ-SE3WM-2W76A-6ZFLH-XP3AQ-44FUP"
      : "https://apis.map.qq.com/uri/v1/marker?marker=coord:44.536167,125.708949;title:塞尚商务酒店;addr:张博一王莹莹婚礼宾客下榻酒店地址&referer=XUHBZ-SE3WM-2W76A-6ZFLH-XP3AQ-44FUP"
      }
    },
  },
}
</script>
<style scoped lang="scss">

 .boxImg{
   clear: both;
   width: 100vw;
   img{
     width: 100vw;
     display: block;
   }
 }
 .two{
   img{
     width: 50vw;
     display: block;
     float: left;
   }
 }

.popup-my{
  width: 100%;

  .mapList{
    text-align: center;
    font-size: 16px;
    width: 100%;
    .title{
      height: 4.5rem;
      line-height: 4.5rem;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #b4a078;
    }
    .mapEach{
      margin: 0 1em;
      height: 3.5rem;
      line-height:  3.5rem;
      border-bottom: 1px solid #b4a078;
    }
  }
}

</style>
