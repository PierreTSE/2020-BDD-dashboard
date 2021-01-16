<template lang="html">

  <div class="infoserie-wrapper">
    <div class="my-2" style="display : inline-block">
      <p class="h2 mb-0">{{curSerie.name}}</p>
      <p class="text-muted h6">{{curSerie.type}}</p>
    </div>
    <div class="drop-button-wrapper" style="display: inline-block; position: absolute; padding-left: 15px">
      <button type="button" class="btn btn-circle btn-outline-danger btn-xl mr-1" 
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
        let confirmation = confirm("Voulez-vous vraiment supprimer la série : " + this.$parent.curSerie.name + " ?");
        if (confirmation) {
          let request ="DROP " + this.$parent.curSerie.name + ";";
          this.$parent.sendRequest(request).then((res) => {
            if (!res.success) {  // La requete a échoué, abandonné la mission
              return;
            } else {
              this.$parent.curSerie.name="";
              this.$parent.$refs.mySideBar.onRefresh();
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
.btn-circle.btn-xl {
  width: 32px;
  height: 32px;
  padding: 4px 7.5px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  color: #0004;
  border-color: #0004;
  transition: border 0s, 0.15s;
  margin-top: 1em;
  margin-left: 0.2em;
}
.btn-circle.btn-xl:hover {
  border-width: 0;
  color: #fff;
  width: 40px;
  height: 40px;
  margin-top: 0.8em;
  margin-left: 0.04em;
}
</style>
