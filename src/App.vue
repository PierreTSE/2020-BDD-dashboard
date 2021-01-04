<template>

  <div>

    <MyHeader />  <!-- Barre d'entete en haut -->
  
    <div class="d-flex container-fluid">
      <MySidebar />  <!-- Barre de navigation à gauche -->
      <div id="page-content">
        <div id="content-left">
          <InfoSerie />
          
          <button id="DEBUG" class="btn btn-warning" @click="on_DEBUG_press()">TEST TABLE.jsonParse()</button>
          
          <RequestForm />
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
    on_DEBUG_press() {
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
  width: 60%;
  display: inline-block;
}

#content-right {
  width: 40%;
  display: inline-block;
}
</style>