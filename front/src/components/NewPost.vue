<template>
    <div id="new__post__container">
        <h1>Poster un nouveau message</h1>
        <form method="post" name="new_post" id="new__post__form">
            <textarea name="message" placeholder="Exprimez-vous !" maxlength="5000" id="new__post__text"></textarea>
            <input type="button" value="Envoyer !" id="send__new__post" @click="newPost()">
        </form>
    </div>
</template>

<script>
export default {
  name: 'NewPost',
  methods: {
                newPost() {
                    const post = document.getElementById("new__post__text").value;
                    const token = window.localStorage.getItem('token');
                    fetch('http://localhost:3000/api/post/newPost', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            },
                        body: JSON.stringify({ post })
                        })
                    .then(function (res) {
                        if (res.ok) {
                            return res.json()
                            .then (function (resJson) {
                                window.alert(resJson.message)
                            })
                        }
                    })
                }
  }
}
</script>

<style>
    #new__post__container {
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        width: 70%;
        max-width: 40em;
        margin-top: 5em;
        padding-top: 2em;
        border-radius: 1em;
        display: inline-block;
    }
    h1 {
        font-size: 1.2em;
        font-weight: normal;
    }
    #new__post__form {
        padding: 1em;
    }
    #new__post__text {
        max-width: 90%;
        min-width: 90%;
        min-height: 4em;
        text-align: left;
        padding: 1em;
    }
    #new__post__text::placeholder {
        padding-top: 1.5em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
    #send__new__post {
        margin-top: 1em;
        width: 10em;
        cursor: pointer;
        transition: transform 0.3s;
    }
    #send__new__post:hover {
        transform: scale(1.03);
    }
</style>