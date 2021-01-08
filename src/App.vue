<template>

  <div>

    <MyHeader />  <!-- Barre d'entete en haut -->
  
    <div class="d-flex container-fluid">
      <MySidebar />  <!-- Barre de navigation à gauche -->
      <div id="page-content">
        <div id="content-left">
          <InfoSerie />
          
          <div class="bg-dark p-2">
            <p class="h6 text-warning">Debug:</p>
            <button id="DEBUG_Request" class="btn btn-warning m-1" @click="on_DEBUG_Request_press()">Show Live Request</button>
            <button id="DEBUG_Table" class="btn btn-warning m-1" @click="on_DEBUG_Table_press()">Test affichage données</button>
            <button id="DEBUG_Agreg" class="btn btn-warning m-1" @click="on_DEBUG_Agreg_press()">Test affichage agregation</button>
          </div>
          <RequestForm ref="requestForm"/>
          <MyGraph />
        </div>
        <div id="content-right">
          <Table ref="myTable"/>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import MyHeader from "./components/MyHeader";
import RequestForm from "./components/RequestForm";
import MySidebar from "./components/MySidebar";
import MyGraph from "./components/MyGraph";
import InfoSerie from "./components/InfoSerie";
import Table from "./components/Table";


export default {
  name: "App",
  components: {
    RequestForm,
    MyHeader,
    MySidebar,
    MyGraph,
    InfoSerie,
    Table
  },
  methods: {
    on_DEBUG_Table_press() {
      // Generer des données aléatoires
      let fake_data = {
        "success" : true,
        "data" : {
          "values": [
            {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
            {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
            {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
            {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
          ]
        }
      };
      this.$refs.myTable.jsonParse(JSON.stringify(fake_data));
    },
    
    on_DEBUG_Request_press() {
      this.$refs.requestForm.show_request = !this.$refs.requestForm.show_request;
      if (this.$refs.requestForm.show_request) {
        document.getElementById("DEBUG_Request").innerText  = "Hide Live Request";
      } else {
        document.getElementById("DEBUG_Request").innerText  = "Show Live Request";
      }
    },

    on_DEBUG_Agreg_press() {
      let agr_op = ["min", "max", "avg", "sum", "count"];
      //   {"min": Math.floor(Math.random() * 100)},
      //   {"max": Math.floor(Math.random() * 100)},
      //   {"avg": Math.floor(Math.random() * 100)},
      //   {"sum": Math.floor(Math.random() * 100)},
      //   {"count": Math.floor(Math.random() * 100)}
      // ];
      let fake_data = {
        "success" : true,
        "data" : {
          "values": [],
        }
      };
      fake_data.data[agr_op[Math.floor(Math.random() * agr_op.length)]] = Math.floor(Math.random() * 100);
      
      this.$refs.myTable.jsonParse(JSON.stringify(fake_data));
    }
  }
};

// Aide pour faire communiquer 2 components : https://stackoverflow.com/a/60171060 

</script>


<style scoped>
#page-content {
  padding-top: 70px;  /* Meme valeur que le height de MyHeader */
  padding-left: 150px;  /* Meme valeur que le width du Sidebar */
  min-width: 0;
  width: 100%;
}

#content-left {
  vertical-align: top;
  display: inline-block;
}

#content-right {
  vertical-align: top;
  display: inline-block;
}

@media (min-width: 1000px) {  /* Pour grands écrans */
  #content-left {
    width: 60%;
  }
  #content-right {
    width: 40%;
  }
}

@media (max-width: 1000px) {  /* Pour petits écrans */
  #content-left {
    width: 100%;
  }
  #content-right {
    width: 100%;
  }
}

</style>