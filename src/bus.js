import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// vm.$bus.$emit('message:push', message, status); 向外層傳遞
// message(String): 訊息內容
// status(String): Alert的樣式
