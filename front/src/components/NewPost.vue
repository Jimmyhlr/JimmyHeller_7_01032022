<template>
    <div id="new__post__container">
        <h1>Poster un nouveau message</h1>
        <form method="post" enctype="multipart/form-data" name="new_post" id="new__post__form">
            <textarea name="message" placeholder="Exprimez-vous !" maxlength="5000" id="new__post__text"></textarea>
            <div id="notEnoughCharacters"></div>
            <input type="file" name="image" accept="image/jpg, image/jpeg, image/png" id="new__post__image">
            <div id="extensionNotSupported"></div>
            <input type="button" value="Envoyer !" id="send__new__post" @click="newPost()">
        </form>
    </div>
</template>

<script>
export default {
  name: 'NewPost',
  methods: {
                newPost() {
                    const post = document.getElementById("new__post__text").value
                    const token = window.localStorage.getItem('token');                    
                    const image = document.getElementById("new__post__image").files[0]
                    console.log(image)
                    var image_extension = null
                    if (!(typeof image === 'undefined')) {
                        var a = image.name.split(".");
                        if (!(a.length === 1 || (a[0] === "" && a.length === 2))) {
                            image_extension = a.pop()
                        }
                    }
                    console.log(image)
                    if (post.length > 3 && (image_extension == 'jpg' || image_extension == 'jpeg' || image_extension == 'png')) {
                        fetch('http://localhost:3000/api/post/newPost', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                },
                            body: JSON.stringify({ post, image })
                            })
                        .then(function (res) {
                            if (res.ok) {
                                return res.json()
                                .then(function () {
                                    window.location.reload()
                                })
                            }
                        })
                    } else if (post.length > 3 && image_extension === null) {
                        console.log(token, post)
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
                                .then(function () {
                                    window.location.reload()
                                })
                            }
                        })
                    } else if (post.length <= 3) {
                        document.getElementById('notEnoughCharacters').innerHTML = 'Le message doit contenir plus de 3 caractères'
                    } else if (image_extension != null && (image_extension != 'jpg' || image_extension != 'jpeg' || image_extension != 'png')) {
                        document.getElementById('extensionNotSupported').innerHTML = "L'image sélectionnée doit être au format .jpg, .jpeg ou .png"
                    }
                }
  }
}
</script>

<style>
    #notEnoughCharacters, #extensionNotSupported {
        color: red;
    }
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
        background-color: rgb(0, 186, 0);
        transform: scale(1.03);
    }
    #new__post__image {
        margin-top: 0.5em;
        margin-left: 20%;
        margin-right: 20%;
        padding-left: 0;
        padding-right: 0;
        height: auto;
        width: auto;
        max-width: 30em;
        border-radius: 0.5em;
        border: 0.05em solid black;
        box-shadow: 0;        
    }
</style>