<template lang="html">

  <nav id="sidebar-wrapper" class="p-2 mb-1 d-none d-xl-block border-right border-info">
    <p v-for="(s,index) in series" v-bind:id="'side-' + s.name" :key="index" class="h5 text-break mb-3" v-bind:class="{'font-weight-bold': s.name == curSerie.name, 'font-weight-normal': s.name != curSerie.name}"
       @click="onSelect(s)">{{ s.name }}</p>


    <form class="button-wrapper" onsubmit="return false">
      <input v-if="add_mode" v-model="new_serie_name" class="form-control" type="text">
      <button v-if="!add_mode" class="btn btn-info btn-block " @click="add_mode=true;">Nouvelle série</button>
      <select v-if="add_mode" v-model="selected_type" class="form-control" style="margin-top:0.5em;">
        <option v-for="type in possible_types" :key="type" :value="type"> {{ type }}</option>
      </select>
      <div v-if="add_mode" class="form-group row mx-auto mt-2">
        <button class="col-2 btn btn-info px-1 mr-2" @click="add_mode = false; selected_type = null; new_serie_name=''"><i class="fa fa-chevron-left"></i></button>
        <button :disabled="!new_serie_name || selected_type == null || new_serie_name.includes(' ')" class="col btn btn-info"
                @click="onCreate">Ajouter série
        </button>
      </div>
      <button v-if="!add_mode" class="btn btn-info btn-block" @click="onRefresh">Rafraîchir liste</button>
    </form>

  </nav>

</template>

<script lang="js">
export default {
  name: 'MySidebar',
  props: ["series", "curSerie"],  // Data from parent

  mounted() {
  },

  data() {
    return {
      possible_types: ["int32", "int64", "float32"],
      add_mode: false,
      new_serie_name: null,
      selected_type: null,
    }
  },
  created: function () {
    this.onRefresh();  // Force a refresh on page load
  },

  methods: {
    onRefresh(select = "") {
      this.$parent.sendRequest("SHOW ALL;").then((res) => {
        if (!res.success) {  // La requete a échoué, abandonnez la mission
          return;
        }
        this.refreshList(res);
        if (select) {
          this.onSelect(select);
        }
      });
    },

    onCreate() {
      this.add_mode = false;

      let request = `CREATE ${this.new_serie_name} ${this.selected_type};`;
      this.$parent.sendRequest(request).then((res) => {
        if (!res.success) {  // La requete a échoué, abandonnez la mission
          return;
        }
        this.onRefresh({"name": this.new_serie_name, "type": this.selected_type});
        this.new_serie_name = "";
        this.selected_type = null;
      });

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
      let seriesList = json_data.data.info;

      // Lui passer le nouveau tableau de séries
      this.$emit('updateList', seriesList);
    },

    onSelect(serie) {
      this.$emit('selectSerie', serie.name);
    }
  }
}
</script>

<style>
#sidebar-wrapper {
  width: 170px; /* Meme valeur que le padding-left div#page-content */
  position: fixed;
  top: 90px; /* Meme valeur que 'height' de MyHeader */
  left: 0;
  bottom: 0;
  margin: 0;
  /*min-height: 100vh;  /* Occupe tout l'ecran */
  /*margin-bottom: -70px; /* Compense l'offset vertical a cause de l'entete */
  padding-right: 20px;
  border-width: 5px !important;
}

.button-wrapper {
  border-width: 5px;
  border-top: solid;
  border-top-color: #17a2b8 !important;
  border-top-width: 3px;
  padding-top: 13px;
  margin-top: 15px;
  width: 100%;
}

.h5 {
  cursor: pointer;
}
</style>
