require('./bootstrap');

import Vue from 'vue';

Vue.component('posts-list', require('./components/PostsList.vue').default);
Vue.component('post-single', require('./components/PostSingle.vue').default);
Vue.component('table-posts', require('./components/admin/PostsTable.vue').default);
Vue.component('post-form', require('./components/admin/PostForm.vue').default);
Vue.component('post-form-edit', require('./components/admin/PostFormEdit.vue').default);

const app = new Vue({
    el: '#app'
});