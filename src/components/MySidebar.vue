<template lang="html">

  <nav class="p-2 mb-1 d-none d-xl-block border-right border-info" id="sidebar-wrapper">
    <p class="h5" v-for="(s,index) in series" :key="index" @click="onSelect(s)" v-bind:id="s.name">{{s.name}}</p>
    <button @click="onRefresh">F5</button>
    <button @click="onCreate">Nouvelle série</button>
  </nav>   

</template>

<script lang="js">
  export default  {
    name: 'MySidebar',
    props: ["series", "curSerie"],  // Data from parent


    mounted () {
      document.getElementById(this.curSerie.name).style.setProperty('font-weight', 'bold');
    },
    
    data () {
      return {
        possible_types: ["int32", "int64", "float32", "float64"],
      }
    },

    methods: {
      onRefresh() {
        let response = this.sendRequest("SHOW ALL;");

        if (response) {
          this.refreshList(response);  
        }
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
        
        let seriesList = JSON.parse(json_data).data.info;

        // Lui passer le nouveau tableau de séries
        this.$emit('updateList', seriesList);
      },

      onSelect(serie) {
        document.getElementById(this.curSerie.name).style.setProperty('font-weight', 'normal');
        document.getElementById(serie.name).style.setProperty('font-weight', 'bold');
        this.$emit('selectSerie', serie.name);
      },

      async sendRequest(query_string) {
            console.log("REQUEST :", query_string);
            try {
                let response = await fetch("http://localhost:8080/query?query=" + query_string);
                if (response.ok) {
                    const data = await response.json();
                    console.log("RESPONSE : ", data);
                    if (data["success"] == true) {
                      console.log("Data received: ", data["data"]);
                      return response;
                    } else {
                      this.show_alert = true;
                      throw new Error("ERROR(S) : " + JSON.stringify(data["error"]));
                    }
                } else {
                  throw new Error("ERROR (BAD NETWORK RESPONSE).");
                }
            } catch (err) {
                console.error("ERROR : ", err);
                return undefined;
            }
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

.h5 {
  cursor: pointer;
}
</style>
