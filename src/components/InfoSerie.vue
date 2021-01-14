<template lang="html">

  <div class="py-4">
    <p class="h2">{{curSerie.name}}</p>
    <p>{{curSerie.type}}</p>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'InfoSerie',
    props: ["curSerie"],
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

<style scoped>

</style>
