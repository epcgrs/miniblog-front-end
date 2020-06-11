require('./bootstrap');

import Vue from 'vue';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

Vue.component('posts-list', require('./components/PostsList.vue').default);
Vue.component('post-single', require('./components/PostSingle.vue').default);

const app = new Vue({
    el: '#app'
});