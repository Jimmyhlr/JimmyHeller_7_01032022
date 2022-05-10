<template>
    <div id="signup__form__main">
        <form action="" method="get" id="signup__form">
            <div class="signup__form">
                <input type="text" autocomplete="off" name="username" placeholder="Nom d'utilisateur" id="signup__form__username" required>
            </div>
            <div class="signup__form">
                <input type="password" name="password" placeholder="Mot de passe" id="signup__form__password" required>
            </div>
            <div class="signup__form">
                <input type="password" name="password_repeat" placeholder="Confirmation du mot de passe" id="signup__form__password_repeat" required>
            </div>
            <div class="signup__form">
                <input type="button" value="Inscription" id="form__button" @click="signup()">
            </div>
        </form>
        <div id="redirection">
            <p>Déjà inscrit ?</p>
            <router-link to="/" id="redirection__link"><p>Connectez-vous !</p></router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SignupForm',
  methods: {
                signup() {
                const username = document.getElementById("signup__form__username").value;
                const password = document.getElementById("signup__form__password").value;
                const password_repeat = document.getElementById("signup__form__password_repeat").value;
                console.log('fonction signup', username, password, password_repeat);
                    fetch("http://localhost:3000/api/auth/signup", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password, password_repeat })
                    })
                    .then(function (res) {
                        console.log(res);
                        if (res.ok) {
                            return res.json();
                        }/*
                        else if (res.status === 401) {
                            // ajouter message d'erreur implémenté dans le html
                        }*/
                    })
                    .then(function () {
                        fetch("http://localhost:3000/api/auth/login", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password })
                        })
                        .then(function (res) {
                            console.log(res);
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
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
                }
  }
}
</script>

<style>
    #signup__form__main {
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        width: 70%;
        max-width: 40em;
        margin-top: 5em;
        padding-top: 2em;
        border-radius: 1em;
        display: inline-block;
    }
    #signup__form {
        text-align: center;
        margin-top: 2.5em;
        margin-bottom: 2.5em;
    }
    .signup__form {
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