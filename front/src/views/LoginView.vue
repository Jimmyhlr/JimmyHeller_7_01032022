<template>
  <header>
    <HeaderLoggedOut />
  </header>
  <main>
    <LoginForm />
  </main>
</template>

<script>
// @ is an alias to /src
import HeaderLoggedOut from '@/components/HeaderLoggedOut.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderLoggedOut,
    LoginForm
  }
}
</script>