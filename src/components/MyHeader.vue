<template lang="html">

  <header class="">
    <div class="container-fluid pos-f-t">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Dashboard</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        </nav>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"><a class="nav-link" href="#">Serie1</a></li>
            <li class="nav-item"><a class="nav-link " href="#">Serie2</a></li>
            <li class="nav-item"><a class="nav-link " href="#">Serie3</a></li>
          </ul>
        </div>
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
  height: 70px;  /* Meme valeur que 'top' de MySidebar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  border-bottom: 3px solid black;
}


</style>
