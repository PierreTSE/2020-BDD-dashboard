<template lang="html">

  <header class="">
    <h1>Dashboard</h1>
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
