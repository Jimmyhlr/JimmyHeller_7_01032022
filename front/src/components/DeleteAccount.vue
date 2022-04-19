<template>
    <div id="delete__account" @click="deleteAccount()">
        Supprimer le compte
    </div>
</template>

<script>
export default {
  name: 'DeleteAccount',
  methods: {
                deleteAccount() {
                    let confirmAction = confirm("Voulez-vous vraiment supprimer le compte ?")
                    if (confirmAction) {
                        const token = window.localStorage.getItem('token');
                        fetch('http://localhost:3000/api/auth/deleteAccount', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                        .then(function (res) {
                            if (res.ok) {
                                window.localStorage.removeItem('token');
                                window.location.replace('/');
                            }
                        })
                    }
                }
  }
}
</script>

<style>
    #delete__account {
        background-color: white;
        box-shadow: 0px 0px 22px 0px rgba(0,0,0,0.79);
        width: 30%;
        max-width: 17em;
        margin-top: 3em;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
        border-radius: 1em;
        display: inline-block;
        color: red;
        cursor: pointer;
        transition: transform 0.2s;        
    }
    #delete__account:hover {
        transform: scale(1.05);       
    }
</style>