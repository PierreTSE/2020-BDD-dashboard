<template lang="html">

  <nav class="p-2 mb-1 d-none d-xl-block border-right border-info" id="sidebar-wrapper">
    <p class="h5" v-for="(s,index) in series" :key="index">{{s.name}}</p>
    <p>Todo mettre en avant la série actuelle</p>
    <button @click="onRefresh">F5</button>
    <button @click="onCreate">Nouvelle série</button>
  </nav>   

</template>

<script lang="js">
  export default  {
    name: 'MySidebar',
    props: ["series", "curSerie"],  // Data from parent

    mounted () {},
    
    data () {
      return {
        possible_types: ["int32", "int64", "float32", "float64"],
      }
    },

    methods: {
      onRefresh() {
        // TODO la requete
        // La requete à la forme suivante : SHOW ALL;
        console.log("onRefresh() called");

        this.refreshList({});  // TODO parser la réponse de la requete
      },

      onCreate() {
        // TODO la requete
        // La requete à la forme suivante : CREATE <name:string> <type:string>
        // BTW, "type" peut être un des 4 types dans la variable this.possible_types
        console.log("onCreate() called");
        // Maintenant que nous avons creer une série, mettre à jour la liste
        this.onRefresh();
      },
        
      refreshList(json_data) {
        /* json_data est un json avec la forme suivante
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
        console.log("json_data", json_data);

        // Lui passer le nouveau tableau de séries
        this.$emit('updateList', null);
      },
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
