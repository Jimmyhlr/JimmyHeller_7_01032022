<template>
    <div id="feed">
        <h2>Fil d'actualité</h2>

        <div class="message__and__comments" v-for="post in posts" :key="post.id">
            <div class="message">
                <div class="message__informations">
                    <div class="message__username">
                        <div>{{ post.username }}</div>
                        <div v-if="post.user_rights === 'admin'">(modérateur)</div>
                    </div>
                    <div class="message__date admin">Posté le : formatCreationDate à formatCreationTime</div>
                </div>
                <div class="message__text">{{ post.post }}</div>
                <div class="message__buttons">
                    <div class="message__reply" @click="commentPost(post.id)">Répondre</div>
                    <div class="message__modify" v-if="userLoggedIn === key.username || userRights === 'admin'">Modifier</div>
                    <div class="message__delete" v-if="userLoggedIn === key.username || userRights === 'admin'">Supprimer</div>
                </div>
            </div>
            <div class="new__comment" id="new__comment__key.id "></div>
            <div class="message__comments" id="message__comments__key.id"></div> 
        </div>

    </div>
</template>
<script>
export default {
  name: 'MainFeed',
  data() {
      return {
          posts: [],
          userLoggedIn: '',
          userRights: ''
      }
  },
  methods: {
      commentPost(id) {
          console.log('click détecté sur ' + id)
      }
  },
    mounted() {
    try {
        console.log('mounted')
        const token = window.localStorage.getItem('token')
        const fetchPost = fetch("http://localhost:3000/api/post/feed", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            })
        fetchPost.then(res => {
        const allPosts = res.json()
        console.log(res)
        allPosts.feed.forEach(post => {
            this.posts.push(post)
            console.log(post)
        })
        this.userLoggedIn = allPosts.user
        this.userRights = allPosts.rights.rights
        console.table(this.posts)
        console.log(this.userRights)           
        })
    } catch (error) {
        console.log(error)
    }
  }
}
</script>

<style>
    #feed {
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        min-width: 90%;
        margin-top: 5em;
        padding-top: 2em;
        border-radius: 1em;
        padding-bottom: 5em;
    }
    h2 {

    }
/*-----------------------------------------------------------*/
    .admin {
        color: cyan;
    }
    .message__and__comments {

    }
    .message {
        display: inline-block;
        max-width: 80%;
        min-width: 80%;
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        margin-top: 1em;
        border-radius: 1em;
        position: relative;
    }
    .message__comments {
        display: inline-block;
        max-width: 70%;
        min-width: 70%;
        background-color: rgb(241, 241, 241);
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        padding: 1em;
        margin: 0em;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }
    .comment {
        display: inline-block;
        max-width: 90%;
        min-width: 90%;
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        margin: 0em;
        margin-top: 1em;
        border-radius: 1em;
    }    
    .message__informations, .comment__informations {
        background-color: rgba(1, 10, 59, 0.89);
        color: white;
        padding: 1em;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        display: flex;
        justify-content: space-between;
    }
    .message__username, .comment__username {

    }
    .message__date, .comment__date {

    }
    .message__text, .comment__text {
        text-align: justify;
        padding: 1em;
    }
    .message__buttons, .comment__buttons {
        display: flex;
        justify-content: flex-end;
        padding: 1em;
    }
    .message__reply {
        cursor: pointer;
    }
    .message__reply:hover {
        color: blue;
    }
    .message__modify, .comment__modify {
        margin-left: 1em;
        cursor: pointer;
    }
    .message__modify:hover, .comment__modify:hover {
        color: blue;
    }
    .message__delete, .comment__delete {
        margin-left: 1em;
        cursor: pointer;
    }
    .message__delete:hover, .comment__delete:hover {
        color: red;
    }    
/*-----------------------------------------------------------*/
    h3 {

    }
    .new__comment__form {
        padding: 1em;
    }
    .new__comment__text {
        max-width: 90%;
        min-width: 90%;
        min-height: 4em;
        text-align: left;
        padding: 1em;
    }
    .new__comment__text::placeholder {
        padding-top: 1.5em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
    .comment__button {
        margin-top: 1em;
        width: 10em;
        cursor: pointer;
    }
    .send__new__comment {
        margin-right: 1em;
    }
    .send__new__comment:hover {
        background-color: rgb(0, 186, 0);
    }
    .cancel__new__comment {
        margin-left: 1em;
    }
    .cancel__new__comment:hover {
        background-color: rgba(255, 0, 0, 0.704);
    }    
</style>