<template>
    <div id="feed">
        <h2>Fil d'actualité</h2>
        <!--boucle message + comments-->
        <div class="message__and__comments" v-for="post in posts" :key="post.id">
            <!--boucle messages-->
            <div class="message">
                <div class="message__informations">
                    <div class="message__username">
                        <div v-if="post.user_rights === 'user'">{{ post.username }}</div>
                        <div v-if="post.user_rights === 'admin'" class="admin">{{ post.username }} (modérateur)</div>
                    </div>
                    <div class="message__date">
                        <div v-if="post.user_rights === 'user' && post.creation_date === post.last_modified">Posté le : {{ formatCreationDate(post.creation_date) }}</div>
                        <div v-if="post.user_rights === 'user' && post.creation_date != post.last_modified">Modifié le : {{ formatCreationDate(post.last_modified) }}</div>
                        <div v-if="post.user_rights === 'admin' && post.creation_date === post.last_modified" class="admin">Posté le : {{ formatCreationDate(post.creation_date) }}</div>
                        <div v-if="post.user_rights === 'admin' && post.creation_date != post.last_modified" class="admin">Modifié le : {{ formatCreationDate(post.last_modified) }}</div>
                    </div>
                </div>
                <div class="message__text">{{ post.post }}</div>
                <img v-if="post.image != null" class="message__image" v-bind:src="post.image">
                <div class="message__buttons">
                    <div class="message__reply" @click="displayCommentForm(post.id)">Répondre</div>
                    <div class="message__modify" @click="displayModifyPostForm(post.id)" v-if="userLoggedIn === post.username || userRights === 'admin'">Modifier</div>
                    <div class="message__delete" @click="deletePost(post.id)" v-if="userLoggedIn === post.username || userRights === 'admin'">Supprimer</div>
                </div>
            </div>
            
            <div class="message__comments">
                <!--div champ textuel "commenter" - appelé au click sur bouton répondre-->
                <div v-bind:id="'new__comment__' + post.id" class="new__comment">
                    <div class="comment_form_header">Commenter le post</div>
                    <form method="post" name="new_comment" class="new__comment__form">
                        <textarea v-bind:id="'new__comment__text__' + post.id" name="commentaire" placeholder="Commentez le post !" maxlength="5000" class="new__comment__text"></textarea>
                        <input type="button" value="Envoyer !" class="comment__button send__new__comment" @click="sendNewComment(post.id)">
                    </form>
                </div>
                <!--div champ textuel "modifier le message" - appelé au click sur bouton modifier-->
                <div v-bind:id="'modify__post__' + post.id" class="message__modify__container">
                    <div class="comment_form_header">Modifier le message</div>
                    <form method="post" name="modify_message" class="message__modify__form">
                        <textarea v-bind:id="'message__modify__text__' + post.id" v-model="post.post" type="text" name="modifier" placeholder="Modifier le message" maxlength="5000" class="message__modify__text"></textarea>
                        <input type="button" value="Modifier" class="comment__button save__modifications" @click="modifyPost(post.id)">
                    </form>
                </div>                
                <!--boucle comments-->
                <div v-for="comment in commentsOfPost(post.id)" :key="comment.id">
                    <div class="comment">
                        <div class="comment__informations">
                            <div class="comment__username">
                                <div v-if="comment.user_rights === 'user'">{{ comment.username }}</div>
                                <div v-if="comment.user_rights === 'admin'" class="admin">{{ comment.username }} (modérateur)</div>
                            </div>
                            <div class="comment__date">
                                <div v-if="comment.user_rights === 'user' && comment.creation_date === comment.last_modified">Posté le : {{ formatCreationDate(comment.creation_date) }}</div>
                                <div v-if="comment.user_rights === 'user' && comment.creation_date != comment.last_modified">Modifié le : {{ formatCreationDate(comment.last_modified) }}</div>
                                <div v-if="comment.user_rights === 'admin' && comment.creation_date === comment.last_modified" class="admin">Posté le : {{ formatCreationDate(comment.creation_date) }}</div>
                                <div v-if="comment.user_rights === 'admin' && comment.creation_date != comment.last_modified" class="admin">Modifié le : {{ formatCreationDate(comment.last_modified) }}</div>
                            </div>
                        </div>
                        <div class="comment__text">{{ comment.comment }}</div>
                        <div class="comment__buttons">
                            <div class="comment__modify" @click="displayModifyCommentForm(comment.id)" v-if="userLoggedIn === comment.username || userRights === 'admin'">Modifier</div>
                            <div class="comment__delete" @click="deleteComment(comment.id)" v-if="userLoggedIn === comment.username || userRights === 'admin'">Supprimer</div>
                        </div>  
                    </div>
                    <!--div champ textuel "modifier le commentaire" - appelé au click sur bouton modifier-->
                    <div v-bind:id="'modify__comment__' + comment.id" class="comment__modify__container">
                        <div class="comment_form_header">Modifier le commentaire</div>
                        <form method="post" name="modify_message" class="message__modify__form">
                            <textarea v-bind:id="'comment__modify__text__' + comment.id" v-model="comment.comment" type="text" name="modifier" placeholder="Modifier le commentaire" maxlength="5000" class="message__modify__text"></textarea>
                            <input type="button" value="Modifier" class="comment__button save__modifications" @click="modifyComment(comment.id)">
                        </form>
                    </div>                        
                </div>                     
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'MainFeed',
  data() {
      return {
          posts: [],
          comments: [],
          userLoggedIn: '',
          userRights: ''
      }
  },
  methods: {
      displayCommentForm(id) {
          let commentFormContainer = document.getElementById('new__comment__' + id)
          if (window.getComputedStyle(commentFormContainer, null).display === 'none') {
              commentFormContainer.style.display = 'block'
          } else {
              commentFormContainer.style.display = 'none'
          }
      },
      displayModifyPostForm(id) {
          let modifyFormContainer = document.getElementById('modify__post__' + id)
          if (window.getComputedStyle(modifyFormContainer, null).display === 'none') {
              modifyFormContainer.style.display = 'block'
          } else {
              modifyFormContainer.style.display = 'none'
          }
      },      
      displayModifyCommentForm(id) {
          let modifyFormContainer = document.getElementById('modify__comment__' + id)
          if (window.getComputedStyle(modifyFormContainer, null).display === 'none') {
              modifyFormContainer.style.display = 'block'
          } else {
              modifyFormContainer.style.display = 'none'
          }
      },         
      modifyPost(id) {
          let modifiedPost = document.getElementById('message__modify__text__' + id).value
          let postId = id
          const token = window.localStorage.getItem('token')
          fetch('http://localhost:3000/api/post/modifyPost', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ modifiedPost, postId })
                  })
                  .then(function (res) {
                      if (res.ok) {
                          return res.json()
                          .then(function () {
                              window.location.reload()
                              })
                        }
                    })
      },
      modifyComment(id) {
          let modifiedComment = document.getElementById('comment__modify__text__' + id).value
          let commentId = id
          const token = window.localStorage.getItem('token')
          fetch('http://localhost:3000/api/post/modifyComment', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ modifiedComment, commentId })
                  })
                  .then(function (res) {
                      if (res.ok) {
                          return res.json()
                          .then(function () {
                              window.location.reload()
                              })
                        }
                    })
      },            
      sendNewComment(id) {
          let comment = document.getElementById('new__comment__text__' + id).value
          let commentedPostId = id
          const token = window.localStorage.getItem('token')
          fetch('http://localhost:3000/api/post/newComment', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ comment, commentedPostId })
                  })
                  .then(function (res) {
                      if (res.ok) {
                          return res.json()
                          .then(function () {
                              window.location.reload()
                              })
                        }
                    })
      },
      deletePost(id) {
          let confirmAction = confirm("Voulez-vous vraiment supprimer le message ?")
          if (confirmAction) {
              const token = window.localStorage.getItem('token');
              fetch('http://localhost:3000/api/post/deletePost', {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ id })
              })
              .then(function (res) {
                  console.log(res)
                  if (res.ok) {
                      return res.json()
                      .then(function () {
                          window.location.reload()
                      })
                  }
              })
          }
      },
      deleteComment(id) {
          let confirmAction = confirm("Voulez-vous vraiment supprimer le commentaire ?")
          if (confirmAction) {
              const token = window.localStorage.getItem('token');
              fetch('http://localhost:3000/api/post/deleteComment', {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ id })
              })
              .then(function (res) {
                  console.log(res)
                  if (res.ok) {
                      return res.json()
                      .then(function () {
                          window.location.reload()
                      })
                  }
              })
          }
      },      
      formatCreationDate(rawDate) {
          let creationDate = new Date(rawDate)
          const month = creationDate.toLocaleString('default', {month: 'long'})
          let date = creationDate.getDate() + ' ' + month + ' ' + creationDate.getFullYear()
          let time = String(creationDate.getHours()).padStart(2, '0') + ':' + String(creationDate.getMinutes()).padStart(2, '0')
          let dateAndTime = date + ' à ' + time
          return dateAndTime
      },
      commentsOfPost(postCommented) {
          return this.comments.filter(comment => comment.post_commented == postCommented)
      }
  },
    async mounted() {
    try {
        console.log('mounted')
        const token = window.localStorage.getItem('token')
        const fetchPosts = await fetch("http://localhost:3000/api/post/feed", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            })
        const allPosts = await fetchPosts.json()
        console.log(allPosts)
        this.posts = allPosts.feed
        this.userLoggedIn = allPosts.user
        this.userRights = allPosts.rights.rights
        console.table(this.posts)
        console.log(this.userRights)
        
        const fetchComments = await fetch("http://localhost:3000/api/post/getComments", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const getComments = await fetchComments.json()
        const allComments = getComments.result
        this.comments = allComments
        }
    catch (error) {
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
        margin-top: 1em;
        margin-bottom: 0.75em;
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
    .message__image {

        max-width: 80%;
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
    .new__comment, .message__modify__container, .comment__modify__container {
        margin: 1.5em;
        display: none;
    }
    .new__comment__form, .message__modify__form {
        padding: 1em;
    }
    .new__comment__text, .message__modify__text {
        max-width: 90%;
        min-width: 90%;
        min-height: 4em;
        text-align: left;
        padding: 1em;
    }
    .new__comment__text::placeholder, .message__modify__text::placeholder {
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
    .send__new__comment, .save__modifications {
        margin-right: 1em;
    }
    .send__new__comment:hover, .save__modifications:hover {
        background-color: rgb(0, 186, 0);
    }
</style>