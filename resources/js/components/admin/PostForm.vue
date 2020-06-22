<template>
    <div>
        <div class="col-md-12 pt-5 pb-5" v-if="loading">
            <p class="text-center text-info h4">Carregando...</p>
        </div>
        <form v-if="!loading" action="#" v-on:submit.prevent @submit="sendForm()" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="title">Título</label>
                    <input type="text" class="form-control" id="title" name="title" v-model="dataForm.title" placeholder="Título">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" ref="thumbnail" id="thumbnail">
                            <label class="custom-file-label" name="thumbnail" for="thumbnail">escolha o arquivo</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label>Categorias</label>
                    <div class="form-check" v-for="category in categories" :key="category.id">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" v-model="dataForm.categories" :value="category.id">
                            {{category.title}}
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label>Conteúdo</label>
                    <br>  
                    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                        <div>
                            <button type="button" class="btn btn-primary" @click="commands.undo">
                                Undo
                            </button>
                            <button type="button" class="btn btn-primary" @click="commands.redo">
                                Redo
                            </button>
                            <button type="button" :class="{ 'is-active': isActive.bold(), 'btn btn-primary': true }" @click="commands.bold">
                                Bold
                            </button>
                            <button type="button" :class="{ 'is-active': isActive.italic(), 'btn btn-primary': true }" @click="commands.italic">
                                Italic
                            </button>
                            <button type="button" :class="{ 'is-active': isActive.blockquote(), 'btn btn-primary': true }" @click="commands.blockquote">
                                Blockquote
                            </button>
                            <button type="button" :class="{ 'is-active': isActive.bullet_list(), 'btn btn-primary': true }" @click="commands.bullet_list">
                                Bullet List
                            </button>
                            <button type="button" class="btn btn-primary" @click="commands.horizontal_rule">
                                Horizontal Rule
                            </button>
                        </div>
                    </editor-menu-bar>
                    <br>  
                    <editor-content :editor="editor" />
                </div>
            </div>
          
            <button class="btn btn-primary" type="submit">Salvar</button>
        </form>
    </div>
</template>
<script>
    
    import { Editor, EditorContent, EditorMenuBar  } from 'tiptap';
    import {
        Blockquote,
        HardBreak,
        Heading,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Italic,
        Link,
        Strike,
        Underline,
        History,
        HorizontalRule 
    } from 'tiptap-extensions';

    export default {
        components: {
            EditorContent,
            EditorMenuBar
        },
        data() {
            return {
                editor:  new Editor({
                    extensions: [
                        new Blockquote(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new BulletList(),
                        new OrderedList(),
                        new ListItem(),
                        new TodoItem(),
                        new TodoList(),
                        new Bold(),
                        new Italic(),
                        new Link(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new HorizontalRule(),
                    ],
                    content: `
                    <h1>Yay Headlines!</h1>
                    <p>All these <strong>cool tags</strong> are working now.</p>
                    `,
                }),
                dataForm: {
                    title: "",
                    thumbnail: [],
                    content: "",
                    categories: [],
                },
                categories: [],
                loading: true,
            };
        },
        methods: {
            sendForm() {
                
                this.dataForm.content = this.editor.getHTML();
                this.dataForm.thumbnail = this.$refs.thumbnail.files[0];
                let cats = this.dataForm.categories.join(',');

                let formData = new FormData();
                formData.append('thumbnail', this.dataForm.thumbnail);
                formData.append('title', this.dataForm.title);
                formData.append('content', this.dataForm.content);
                formData.append('categories', cats);
      
                axios.post(
                    'posts',
                    formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data' }
                    }
                )
                .then(response => {
                    console.log(response);
                    alert("sucesso!");
                }).
                catch(error => {
                    console.log(error);
                    alert("erro!");
                });
            },
            getCategories() {
                this.loading = true;
                axios.get('categories').
                then(response => {
                    this.categories = response.data;
                    this.loading = false;
                }).
                catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
        },
        created() {
            this.getCategories();
            console.log(this.editor.commands)
        },
        beforeDestroy() {
            this.editor.destroy();
        },
    };
</script>
<style lang="scss">
    .ProseMirror {
        background-color: #fff;
        padding: 30px;
        blockquote {
            padding-left: 10px;
            border-left: 2px solid #666;
        }
    }
</style>