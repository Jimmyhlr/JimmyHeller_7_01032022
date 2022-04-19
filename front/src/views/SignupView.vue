<template>
  <header>
    <HeaderLoggedOut />
  </header>
  <main>
    <SignupForm />
  </main>
</template>

<script>
// @ is an alias to /src
import HeaderLoggedOut from '@/components/HeaderLoggedOut.vue'
import SignupForm from '@/components/SignupForm.vue'

export default {
  name: 'SignupView',
  components: {
    HeaderLoggedOut,
    SignupForm
  }
}
</script>