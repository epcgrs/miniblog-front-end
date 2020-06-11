<template>
    <div class="card mb-3">
        <img class="card-img-top" style="height: 350px; object-fit:cover;" :src="post.image ? post.image :  `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22304%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20304%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_172a0293a88%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_172a0293a88%22%3E%3Crect%20width%3D%22304%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22113.625%22%20y%3D%2296.6%22%3Eminiblog%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`" :alt="post.title">
        <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
            <div class="categories">
                <span v-for="category in post.categories" class="badge badge-dark px-3 py-2">{{category.title}}</span>
            </div> 
            <div class="content mt-3" v-html="post.content">
                
            </div>
            <p class="card-text"><small class="text-muted">{{post.created_at}}</small></p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                post: [],
                atumalaka: 'kkkkkk',
            }
        },
        methods: {
            getPost(id) {
                axios.get('posts/' + id).
                then(response => {
                    this.post = response.data;
                }).
                catch(error => {
                    console.log(error);
                });
            }
        },
        created() {
            console.log('criou');
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            let id = params.get('id');
            
            this.getPost(id);
        }
    }
</script>