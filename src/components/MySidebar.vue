<template lang="html">

  <nav class="p-1" id="sidebar-wrapper">
    <p>Serie</p>
    <p>Seri2</p>
    <p>Seri3</p>
  </nav>

</template>

<script lang="js">
  export default  {
    name: 'MySidebar',
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
#sidebar-wrapper {
  width: 150px;  /* Meme valeur que le padding-left div#page-content */
  position: fixed;
  top: 70px;  /* Meme valeur que 'height' de MyHeader */
  left: 0;
  bottom: 0;
  margin :0;
  /*min-height: 100vh;  /* Occupe tout l'ecran */
  /*margin-bottom: -70px; /* Compense l'offset vertical a cause de l'entete */
  padding-right: 20px;
  border-right: 3px solid black;
}
</style>
