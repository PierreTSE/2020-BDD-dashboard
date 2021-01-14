<template lang="html">

  <nav class="p-2 mb-1 d-none d-xl-block border-right border-info" id="sidebar-wrapper">
    <p class="h5" v-for="(s,index) in series" :key="index">{{s.name}}</p>
    <button @click="updateList">Refresh List</button>
  </nav>   

</template>

<script lang="js">
  export default  {
    name: 'MySidebar',
    props: ["series"],  // Data from parent

    mounted () {},
    
    data () {
      return {}
    },
    methods: {
      updateList(json_input) {
        /* json_input aura la forme suivante
        {
          "success" : true,
          "data" : {
            "info" : [
              {
                "name" : "MySeries",
                "type" : "int32"
              },
              {
                "name" : "CamSeries",
                "type" : "float64"
              },      
            ]
          }
        }*/

        // TODO
        console.log("json_input: ", json_input);
        // Lui passer le nouveau tableau de séries
        this.$emit('updateList', null);
      }
    },
    computed: {

    }
}
</script>

<style>
#sidebar-wrapper {
  width: 170px;  /* Meme valeur que le padding-left div#page-content */
  position: fixed;
  top: 90px;  /* Meme valeur que 'height' de MyHeader */
  left: 0;
  bottom: 0;
  margin :0;
  /*min-height: 100vh;  /* Occupe tout l'ecran */
  /*margin-bottom: -70px; /* Compense l'offset vertical a cause de l'entete */
  padding-right: 20px;
  border-width: 5px!important;
}
</style>
