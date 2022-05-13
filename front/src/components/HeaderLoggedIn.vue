<template>
    <header>
        <div class="header__div">
            <router-link to="/home">
                <img src="../assets/icon-left-font-monochrome-white.png" alt="logo Groupomania" id="logo__groupomania">
            </router-link>
            <div id="buttons">
                <router-link to="/account">
                    <div id="myAccount__link">Mon compte</div>
                </router-link>
                <div id="logout" @click="logout()">
                    Déconnexion
                </div>          
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'HeaderLoggedIn',
  methods: {
                logout() {
                    window.localStorage.removeItem('token');
                    window.location.replace('/');
                }
  },
  async mounted () {
                    const token = window.localStorage.getItem('token');
                    const response = await fetch('http://localhost:3000/api/auth/userinfos', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            }
                        });
                    const userInformations = await response.json();
                    console.table(userInformations);
                    const username = document.getElementById('myAccount__link');
                    userInformations.forEach(key => {
                        username.innerHTML = key.username;
                    });    
  }
}
</script>

<style>
    header {
        background-color: rgba(1, 10, 59, 0.89);
        height: 7em;
        margin: 0;
        overflow: hidden;
    }
    .header__div {
        display: flex;
        justify-content: space-between;  

    }
    #logo__groupomania {
        position: relative;
        top: -6.5em;
        width: 20em;
        padding: 0;
        margin-left: 2em;
    }
    @media (max-width: 490px) {
        #logo__groupomania {
            top: -1em;
            width: 9em;
            margin-left: 1em;
            padding: 0;
        }
    }
    #buttons {
        line-height: 0;
        padding-top: 0.5em;
        padding-right: 2em;
    }
    #myAccount__link {
        text-decoration: none;
        color: white;
        display: inline-block;
        margin: 2em;
        cursor: pointer;
    }
    #myAccount__link:hover {
        color: cyan;
    }
    #logout {
        color: white;
        cursor: pointer;
    }
    #logout:hover {
        color: red;
    }
</style>