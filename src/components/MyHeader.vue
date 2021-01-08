<template lang="html">
  <header class="">
    <div>
      <b-navbar toggleable="xl" type="dark" variant="info">
        <b-navbar-brand href="#"><p class="h1">Dashboard</p></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" class="my-menu" style="width:100%">
          <b-navbar-nav >
            <b-nav-item href="#" v-for="(item,index) in series" :key="index">{{item}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script lang="js">

  export default  {
    name: 'MyHeader',
    props: ["series"],  // Data from parent
    mounted () {

    },
    data () {
      return {
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style>
header {
  height: 90px; /* Meme valeur que 'top' de MySidebar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  /* border-bottom: 3px solid black; */
}
@media only screen and (min-width: 1200px) {
  .my-menu {
    display: none;
  }
}
</style>
