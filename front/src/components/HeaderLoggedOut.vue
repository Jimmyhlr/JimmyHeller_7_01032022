<template>
    <header>
        <div class="header__div">
            <img src="../assets/icon-left-font-monochrome-white.png" alt="logo Groupomania" id="logo__groupomania">
        </div>
    </header>
</template>

<script>
export default {
  name: 'HeaderLoggedOut'
}
</script>

<style>
    header {
        background-color: rgba(1, 10, 59, 0.89);
        height: 7em;
        margin: 0;
        overflow: hidden;
    }
    #logo__groupomania {
        position: relative;
        top: -6.5em;
        width: 20em;
        padding: 0;
        margin-left: 2em;
    }
</style>