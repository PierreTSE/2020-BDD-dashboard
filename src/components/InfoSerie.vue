<template lang="html">

  <div class="infoserie-wrapper">
    <div class="my-2" style="display : inline-block">
      <p class="h2 mb-0">{{curSerie.name}}</p>
      <p class="text-muted h6">{{curSerie.type}}</p>
    </div>
    <div class="drop-button-wrapper" style="display: inline-block; position: absolute; padding-left: 15px">
      <button type="button" class="btn btn-circle btn-xl my-2 mr-1" 
      v-bind:class="{'btn-info': showDeleteDiv, 'btn-outline-info': !showDeleteDiv}"
      @click="deleteSeries">
      <i class="fa fa-trash"></i>
    </button>
    </div>
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
      deleteSeries(){
        let r = confirm("Voulez-vous vraiment supprimer la série : " + this.$parent.curSerie.name + " ?");
        if (r == true) {
          let request ="DROP " + this.$parent.curSerie.name + ";";
          this.$parent.sendRequest(request).then((res) => {
                if (!res.success) {  // La requete a échoué, abandonné la mission
                  return;
                } else {
                  this.$parent.curSerie.name=null;
              }
        })
      }
    }
    },
    computed: {

    }
}


</script>

<style scoped>

</style>
