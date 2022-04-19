<template>
  <header>
    <HeaderLoggedIn />
  </header>
  <main>
    <NewPost />
    <MainFeed />
  </main>
</template>

<script>
// @ is an alias to /src
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import NewPost from '@/components/NewPost.vue'
import MainFeed from '@/components/MainFeed.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderLoggedIn,
    NewPost,
    MainFeed
  }
}
</script>


