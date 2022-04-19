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
                    const response = await fetch('http://localhost:3000/api/post/feed', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            }
                        });
                    const allPosts = await response.json();
                    const feed = allPosts.result
                    console.table(feed);
                    let postContainer = "<h2>Fil d'actualité</h2><div>";
                    feed.forEach(key => {
                        let messageId = key.id;
                        postContainer += '<div class="message__and__comments" id="' + key.id + '">'
                        + '<div class="message">'
                        + '<div class="message__informations">'
                        + '<div class="message__username">' + key.username + '</div>'
                        + '<div class="message__date">Posté le : ' + key.creation_date + '</div>'
                        + '</div>'
                        + '<div class="message__text">' + key.post + '</div>'
                        + '<div class="message__buttons" id="message__buttons__' + key.id + '">'
                        + '<div class="message__modify id="message__modify__' + key.id + '">Modifier</div>'
                        + '<div class="message__delete id="message__delete__' + key.id + '">Supprimer</div>'
                        + '</div>' 
                        + '</div>';
                        fetch('http://localhost:3000/api/post/getComments', {
                            method: 'POST',
                            Headers: {
                                Accept: 'Application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ messageId })
                        })
                        .then(function (res) {
                            console.table(res)
                        })
                        

                    });
                    document.getElementById('feed').innerHTML = postContainer + '</div>'                    
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
    .message__buttons {
        display: flex;
        justify-content: flex-end;
        padding: 1em;
    }
    .message__modify, .comment__modify {
        margin-right: 1em;
        cursor: pointer;
    }
    .message__modify:hover, .comment__modify:hover {
        color: blue;
    }
    .message__delete, .comment__delete {
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