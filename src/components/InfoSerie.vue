<template lang="html">

  <div class="my-2">
    <p class="h2 mb-0">{{curSerie.name}}</p>
    <p class="text-muted h6">{{curSerie.type}}</p>
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
