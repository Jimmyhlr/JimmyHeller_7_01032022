<template>
    <div id="login__form__main">
        <form action="" method="get" id="login__form">
            <div class="login__form">
                <input type="text" autocomplete="off" name="username" placeholder="Nom d'utilisateur" id="login__form__username" required>
            </div>
            <div class="login__form">
                <input type="password" name="password" placeholder="Mot de passe" id="login__form__password" required>
            </div>
            <div class="login__form">
                <input type="button" value="Connexion" id="form__button" @click="login()">
            </div>
        </form>
        <div id="redirection">
            <p>Pas encore inscrit ?</p>
            <router-link to="/signup" id="redirection__link"><p>Inscrivez-vous !</p></router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginForm',
  methods: {
                login() {
                const username = document.getElementById("login__form__username").value;
                const password = document.getElementById("login__form__password").value;
                console.log('fonction login', username, password);
                fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        },
                    body: JSON.stringify({ username, password })
                    })
                    .then(function (res) {
                        if (res.ok) {
                            return res.json()
                            .then(function (resJson) {
                                console.log(resJson);
                                const token = resJson.token;
                                window.localStorage.setItem('token', token);
                            })
                        }/*
                        else if (res.status === 401) {
                            // ajouter message d'erreur implémenté dans le html
                        }*/
                    })
                    .then(function () {
                        window.location.replace("/home");
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
                }
}
}






</script>

<style>
    #login__form__main {
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        width: 70%;
        max-width: 40em;
        margin-top: 5em;
        padding-top: 2em;
        border-radius: 1em;
        display: inline-block;
    }
    #login__form {
        text-align: center;
        margin-top: 2.5em;
        margin-bottom: 2.5em;
    }
    .login__form {
        margin: 1em;
    }
    input {
        padding-left: 2em;
        padding-right: 2em;
        height: 3em;
        width: 50%;
        border-radius: 0.5em;
        border: 0.05em solid black;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.24);
    }
    ::placeholder {
        text-align: center;
    }
    input:focus::placeholder {
        color: transparent;
    }
    #form__button {
        color: white;
        background-color: rgb(0, 12, 78);
        width: 25%;
        min-width: 9em;
        border-radius: 0.5em;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
    }
    #form__button:hover {
        transform: scale(1.03);
    }
    #redirection {
        line-height: 0.5em;
        margin-bottom: 2em;
    }
    #redirection__link, #redirection__link:hover  {
        text-decoration: none;
        color: rgb(78, 76, 214);
    }
    #redirection__link:hover {
        font-weight: bold;
    }
</style>