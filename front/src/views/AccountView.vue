<template>
  <header>
    <HeaderLoggedIn />
  </header>
  <main>
    <MyAccount />
    <DeleteAccount />
  </main>
</template>

<script>
// @ is an alias to /src
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import MyAccount from '@/components/MyAccount.vue'
import DeleteAccount from '@/components/DeleteAccount.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderLoggedIn,
    MyAccount,
    DeleteAccount
  }
}
</script>