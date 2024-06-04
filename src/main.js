import Vue from 'vue'
import router from './router'
import "@/style/main.css"
Vue.config.productionTip = false

// import Vconsole from 'vconsole';
// const vConsole =new Vconsole();
// Vue.use(vConsole);


// vant-----------------------------------------------------------------
import 'vant/lib/index.css';
import { Popup ,Field,ActionSheet,List,PullRefresh,Icon ,Button,Dialog,NoticeBar,Notify,Toast} from 'vant';
Vue.use(Toast);
Vue.use(Notify);
Vue.use(NoticeBar);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(ActionSheet);
Vue.use(Field);
Vue.use(Popup);

import App from './App.vue'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
