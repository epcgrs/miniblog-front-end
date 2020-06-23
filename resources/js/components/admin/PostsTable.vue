<template>
    <div class="table-wrapper">
        <div class="col-md-12 pt-5 pb-5" v-if="loading">
            <p class="text-center text-info h4">Carregando...</p>
        </div>
        <table v-if="!loading" class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <th scope="row">{{post.id}}</th>
                    <td>{{post.title}}</td>
                    <td>
                        <a :href="`/post.html?id=${post.id}`" target="_blank" class="btn btn-primary">Ver</a>
                        <a :href="`/admin/post-form-edit.html?id=${post.id}`" class="btn btn-info">Editar</a>
                        <a href="#" @click="deletePost(post.id)" class="btn btn-danger">Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>
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
                let paginateURL = this.prevPagination;
                this.getPosts(paginateURL);
            },
            nextPage() {
                let paginateURL = this.nextPagination;
                this.getPosts(paginateURL);
            },
            deletePost(id) {
                if (!confirm("Tem certeza que deseja deletar este post?")) {
                    return; 
                }

                axios.delete('posts/' + id)
                .then(response => {
                    alert("sucesso ao excluir registro");
                    location.reload();
                })
                .catch(error => {
                    alert("algo deu errado");
                });
            }
        },
        created() {
            let paginateURL = 'posts?page=' + this.page;
            this.getPosts(paginateURL);
        }
    }
</script>