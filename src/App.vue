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
            <button id="DEBUG_Table" class="btn btn-warning mx-1" @click="on_DEBUG_Table_press()">Test Table.jsonParse()</button>
            <button id="DEBUG_Request" class="btn btn-warning mx-1" @click="on_DEBUG_Request_press()">Show Live Request</button>
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
        "data" : [
          {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
          {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
          {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
          {"timestamp": Math.floor(Math.random()*1000), "value": Math.floor(Math.random()*100)},
        ]
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
  width: 60%;
  display: inline-block;
}

#content-right {
  vertical-align: top;
  width: 40%;
  display: inline-block;
}
</style>