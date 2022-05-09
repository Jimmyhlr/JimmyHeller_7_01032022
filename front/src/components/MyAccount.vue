<template>
    <div id="account__informations__container">
        <div id="account__informations" v-for="userInformation in userInformations" :key="userInformation.username">
            <div class="information">Nom d'utilisateur : {{ userInformation.username }}</div>
            <div class="information">Inscrit depuis le {{ formatCreationDate(userInformation.registered) }}</div>
            <div class="information">
                <div v-if="userInformation.rights === 'user'">Droits : utilisateur</div>
                <div v-if="userInformation.rights === 'admin'">Droits : administrateur</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data() {
      return {
          userInformations: []
      }
  },
  methods: {
      formatCreationDate(rawDate) {
          let creationDate = new Date(rawDate)
          const month = creationDate.toLocaleString('default', {month: 'long'})
          let date = creationDate.getDate() + ' ' + month + ' ' + creationDate.getFullYear()
          return date
      },
  },
    async mounted() {
    try {
        const token = window.localStorage.getItem('token')
        const fetchInfos = await fetch("http://localhost:3000/api/auth/userinfos", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            })
        const infos = await fetchInfos.json()
        console.log(infos)
        this.userInformations = infos
    } catch (error) {
        console.log(error)
        }
  }
}
</script>

<style>
    #account__informations__container {
        width: 100%;
    }
    #account__informations {
        align-content: flex-start;
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        width: 70%;
        max-width: 40em;
        margin-top: 5em;
        padding-top: 2em;
        padding-bottom: 2em;
        border-radius: 1em;
        display: inline-block;
    }
    .information {
        margin: 1em;
    }
</style>