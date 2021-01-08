<template lang="html">

  <header class="">
    <div class="row">
            <div class="col-sm-10 col-12">
                <h1>Dashboard</h1>
            </div>
            <div class="col-sm-2 col-12 d-flex">
                <button type="button"  class="btn btn-primary ml-auto">Menu</button>
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
