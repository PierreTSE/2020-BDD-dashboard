<template>

  <div>

    <MyHeader :series="series" />  <!-- Barre d'entete en haut -->
  
    <div class="d-flex container-fluid">
      <MySidebar :series="series" @updateList="updateList" />  <!-- Barre de navigation à gauche -->
      <div id="page-content">
        <div id="content-left">
          <InfoSerie />
          
          <div class="container-fluid bg-dark p-2">
            <div class="row mx-auto">
              <p class="col-auto mr-auto h6 text-warning my-auto">Debug:</p>
              <button class="col-auto btn btn-sm text-warning bg-transparent" v-if="!showDebug" @click="showDebug = true;">v</button>
              <button class="col-auto btn btn-sm text-warning bg-transparent" v-if="showDebug" @click="showDebug = false;">^</button>
            </div>
            <div v-if="showDebug" class="">
              <button id="DEBUG_Request" class="btn btn-warning m-1" @click="on_DEBUG_Request_press()">Show Live Request</button>
              <button id="DEBUG_Table" class="btn btn-warning m-1" @click="on_DEBUG_Table_press()">Test affichage données</button>
              <button id="DEBUG_Agreg" class="btn btn-warning m-1" @click="on_DEBUG_Agreg_press()">Test affichage agregation</button>
            </div>
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
  data() {
    return {
      series: [
        {"name": "Serie1", "type":"int64"},
        {"name": "SerieTemp", "type":"float32"},
        {"name": "SerieFun", "type":"int32"},
      ],
      showDebug: true,
    }
  },
  components: {
    RequestForm,
    MyHeader,
    MySidebar,
    MyGraph,
    InfoSerie,
    Table
  },
  methods: {
    updateList(new_list) {
      // Met a jour la liste présente dans la sidebar / header
      // Chaque élément doit avoir la forme {"name": string, "type": string}
      this.series = new_list;
    },

    // DEBUG //
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
      this.series.push("azerty");
      this.$refs.myTable.jsonParse(JSON.stringify(fake_data));
    },

    // DEBUGGING //
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
  padding-left: 170px;  /* Meme valeur que le width du Sidebar */
  min-width: 0;
  width: 100%;
}

@media only screen and (max-width: 1200px) {
  #page-content{
    padding-left: 0px;
  }
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
    /*padding-right: 400px;
    width: 100%;*/
    width: 60%;
  }
  #content-right {
    /*float: right;
    width: 400px;
    margin-left: -400px;*/
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