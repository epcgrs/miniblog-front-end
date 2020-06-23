<template>
    <div class="row"> 
        <div class="col-md-12 pt-5 pb-5" v-if="loading">
            <p class="text-center text-info h4">Carregando...</p>
        </div>
        <div v-if="!loading" class="col-sm-12 col-md-6 col-lg-4 pt-3" v-for="post in posts" :key="post.id">
            <div class="card w-100">
                <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22304%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20304%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_172a0293a88%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_172a0293a88%22%3E%3Crect%20width%3D%22304%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22113.625%22%20y%3D%2296.6%22%3Eminiblog%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" :alt="post.title">
                <div class="card-body">
                    <h5 class="card-title">{{post.title}}</h5>
                    <p class="card-text">{{post.description}}</p>
                    <a :href="`/post.html?id=${post.id}`" class="btn btn-primary float-right">Veja</a>
                </div>
            </div>
        </div>
        <div v-if="!loading" class="col-md-12 pt-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" href="#" @click="previousPage()" tabindex="-1">Anterior</a>
                    </li>
                    <li class="page-item"><a class="page-link">{{this.page}}</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" @click="nextPage()">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                posts: [],
                page: 1,
                loading: true,
                nextPagination: null,
                prevPagination: null,
            }
        },
        methods: {
            getPosts(paginateURL) {
                if (paginateURL == null) {
                    alert('Sem paginação');
                    return;
                }

                this.loading = true;

                axios.get(paginateURL).
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
                    this.page = response.data.current_page;
                    this.nextPagination = response.data.next_page_url;
                    this.prevPagination = response.data.prev_page_url;
                    this.loading = false;
                }).
                catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            previousPage() {
                let paginateURL = this.prevPagination.replace(/^http:\/\//i, 'https://');
                this.getPosts(paginateURL);
            },
            nextPage() {
                let paginateURL = this.nextPagination.replace(/^http:\/\//i, 'https://');
                this.getPosts(paginateURL);
            },
        },
        created() {
            let paginateURL = 'https://api-miniblog.herokuapp.com/api/v1/posts?page=' + this.page;
            this.getPosts(paginateURL);
        }
    }
</script>