<template>
    <div id="feed">
        <h2>Fil d'actualité</h2>
        <!--

        <div class="message__and__comments">
            <div class="message">
                <div class="message__informations">
                    <div class="message__username">
                        Saervietsky
                    </div>
                    <div hidden class="message__id">
                        5
                    </div>
                    <div class="message__date">
                        Posté le : 19/04/2022 10:42
                    </div>
                </div>
                <div class="message__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div class="message__buttons">
                    <div class="message__modify">
                        Modifier
                    </div>
                    <div class="message__delete">
                        Supprimer
                    </div>
                </div> 
            </div>   



            <div class="message__comments">
                <div class="comment">
                    <div class="comment__informations">
                        <div class="comment__username">
                            Saervietsky
                        </div>
                        <div hidden class="comment__id">
                            5
                        </div>
                        <div class="comment__date">
                            Posté le : 19/04/2022 10:42
                        </div>
                    </div>
                    <div class="comment__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div class="buttons">
                        <div class="comment__modify">
                            Modifier
                        </div>
                        <div class="comment__delete">
                            Supprimer
                        </div>
                    </div> 
                </div> 

                <div class="new__comment">
                    <h3>Commenter le post</h3>
                    <form method="post" name="new_comment" id="new__comment__form">
                        <textarea name="commentaire" placeholder="Commentez le post !" maxlength="5000" id="new__comment__text"></textarea>
                        <input type="button" value="Envoyer !" id="send__new__comment">
                    </form>
                </div>  
            </div>     
        </div>
        -->
    </div>
</template>

<script>
export default {
  name: 'MainFeed',
  methods: {

  },
  async mounted () {
                    const token = window.localStorage.getItem('token');
                    const messagesResponse = await fetch('http://localhost:3000/api/post/feed', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            }
                        });
                    const allPosts = await messagesResponse.json();
                    const feed = allPosts.result
                    console.table(feed);
                    const userLoggedIn = allPosts.user.username
                    let postContainer = "<h2>Fil d'actualité</h2><div>";
                    feed.forEach(key => {
                        let creationDate = new Date(key.creation_date)
                        const month = creationDate.toLocaleString('default', {month: 'long'})
                        let formatCreationDate = creationDate.getDate() + ' ' + month + ' ' + creationDate.getFullYear()
                        let formatCreationTime = creationDate.getHours() + ':' + creationDate.getMinutes()
                        if (userLoggedIn === key.username) {
                            postContainer += '<div class="message__and__comments" id="' + key.id + '">'
                            + '<div class="message">'
                            + '<div class="message__informations">'
                            + '<div class="message__username">' + key.username + '</div>'
                            + '<div class="message__date">Posté le : ' + formatCreationDate + ' à ' + formatCreationTime + '</div>'
                            + '</div>'
                            + '<div class="message__text">' + key.post + '</div>'
                            + '<div class="message__buttons" id="message__buttons__' + key.id + '">'
                            + '<div class="message__reply id="message__reply__' + key.id + '" @click="commentPost(' + key.id + ')">Répondre</div>'
                            + '<div class="message__modify id="message__modify__' + key.id + '">Modifier</div>'
                            + '<div class="message__delete id="message__delete__' + key.id + '">Supprimer</div>'
                            + '</div>' 
                            + '</div>'
                            + '<div class="message__comments" id="message__comments__' + key.id + '">'
                            + '<div class="new__comment">'
                            + '<form method="post" name="new_comment" id="new__comment__form">'
                            + '<textarea name="commentaire" placeholder="Commentez le post !" maxlength="5000" id="new__comment__text"></textarea>'
                            + '<input type="button" value="Envoyer !" class="comment__button send__new__comment">'
                            + '<input type="button" value="Annuler" class="comment__button cancel__new__comment">'
                            + '</form>'
                            + '</div>'
                            + '</div>'; 
                        } else {
                            postContainer += '<div class="message__and__comments" id="' + key.id + '">'
                            + '<div class="message">'
                            + '<div class="message__informations">'
                            + '<div class="message__username">' + key.username + '</div>'
                            + '<div class="message__date">Posté le : ' + formatCreationDate + ' à ' + formatCreationTime + '</div>'
                            + '</div>'
                            + '<div class="message__text">' + key.post + '</div>'
                            + '<div class="message__buttons" id="message__buttons__' + key.id + '">'
                            + '<div class="message__reply id="message__reply__' + key.id + '" @click="commentPost(' + key.id + ')">Répondre</div>'
                            + '</div>' 
                            + '</div>'
                            + '<div class="message__comments" id="message__comments__' + key.id + '"></div>';
                        }   
                    });
                    document.getElementById('feed').innerHTML = postContainer + '</div>'                    
                    /**********************************************************************************/
                    const commentsResponse = await fetch('http://localhost:3000/api/post/getComments', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            }
                        });
                    const allComments = await commentsResponse.json();
                    const comments = allComments.result
                    console.table(comments);
                    let commentsContainer = '<div>'
                    comments.forEach(key => {
                        let creationDate = new Date(key.creation_date)
                        const month = creationDate.toLocaleString('default', {month: 'long'})
                        let formatCreationDate = creationDate.getDate() + ' ' + month + ' ' + creationDate.getFullYear()
                        let formatCreationTime = creationDate.getHours() + ':' + creationDate.getMinutes()
                        if (userLoggedIn === key.username) {
                            commentsContainer += '<div class="comment">'
                            + '<div class="comment__informations">'
                            + '<div class="comment__username">' + key.username + '</div>'
                            + '<div hidden class="comment__id">' + key.id + '</div>'
                            + '<div class="comment__date">Posté le : ' + formatCreationDate + ' à ' + formatCreationTime + '</div>'
                            + '</div>'
                            + '<div class="comment__text">' + key.comment + '</div>'
                            + '<div class="comment__buttons" id="comment__buttons__' + key.id + '">'
                            + '<div class="comment__modify" id="comment__modify__' + key.id + '">Modifier</div>'
                            + '<div class="comment__delete" id="comment__delete__' + key.id + '">Supprimer</div>'
                            + '</div>'
                            + '</div>'
                        } else {
                            commentsContainer += '<div class="comment">'
                            + '<div class="comment__informations">'
                            + '<div class="comment__username">' + key.username + '</div>'
                            + '<div hidden class="comment__id">' + key.id + '</div>'
                            + '<div class="comment__date">Posté le : ' + formatCreationDate + ' à ' + formatCreationTime + '</div>'
                            + '</div>'
                            + '<div class="comment__text">' + key.comment + '</div>'
                            + '<div class="comment__buttons" id="comment__buttons__' + key.id + '">'
                            + '</div>'
                            + '</div>'
                        }
                        let postCommented = document.getElementById('message__comments__' + key.post_commented);
                        postCommented.innerHTML += commentsContainer
                    });
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
    #new__comment__form {
        padding: 1em;
    }
    #new__comment__text {
        max-width: 90%;
        min-width: 90%;
        min-height: 4em;
        text-align: left;
        padding: 1em;
    }
    #new__comment__text::placeholder {
        padding-top: 1.5em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
    #send__new__comment {
        margin-top: 1em;
        width: 10em;
        cursor: pointer;
        transition: transform 0.3s;
    }
    #send__new__comment:hover {
        transform: scale(1.03);
    }
</style>