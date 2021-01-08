<template lang="html">
  <header class="">
    <div>
      <b-navbar toggleable="xl" type="dark" variant="info">
        <b-navbar-brand href="#">Dashboard</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" class="menu-test" style="width:100%">
          <b-navbar-nav>
            <b-nav-item href="#">Serie1</b-nav-item>
            <b-nav-item href="#">Serie2</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script lang="js">

  export default  {
    name: 'MyHeader',
    props: [],
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
  height: 70px; /* Meme valeur que 'top' de MySidebar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  border-bottom: 3px solid black;
}
@media only screen and (min-width: 1200px) {
  .menu-test {
    display: none;
  }
}
</style>
