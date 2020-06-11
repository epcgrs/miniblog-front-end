<template>
    <div class="row"> 
        <div class="col-sm-12 col-md-6 col-lg-4 pt-3" v-for="post in posts">
            <div class="card w-100">
                <img class="card-img-top" :src="post.image ? post.image :  `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22304%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20304%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_172a0293a88%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_172a0293a88%22%3E%3Crect%20width%3D%22304%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22113.625%22%20y%3D%2296.6%22%3Eminiblog%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`" :alt="post.title">
                <div class="card-body">
                    <h5 class="card-title">{{post.title}}</h5>
                    <p class="card-text">{{post.description}}</p>
                    <a :href="`/post.html?id=${post.id}`" class="btn btn-primary float-right">Veja</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                posts: [],
                page: 1,
            }
        },
        methods: {
            getPosts() {
                axios.get('posts?page=' + this.page).
                then(response => {
                    let serializedPosts = response.data.data.map(post => {
                        let stripedContent = post.content.replace(/(<([^>]+)>)/ig,"");
                        let tinyContent = stripedContent.slice(0,60) + "...";
                        return {
                            ...post,
                            description: tinyContent
                        }
                    })
                    this.posts = serializedPosts;
                }).
                catch(error => {
                    console.log(error);
                });
            }
        },
        created() {
            this.getPosts();
        }
    }
</script>   