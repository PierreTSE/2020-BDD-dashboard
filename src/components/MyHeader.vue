<template lang="html">
  <header class="">
    <div>
      <b-navbar toggleable="xl" type="dark" variant="info">
        <b-navbar-brand href="#"><p class="h1">Dashboard</p></b-navbar-brand>
        <b-navbar-toggle class="custom-toggler" target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" class="my-menu" is-nav style="width:100%">
          <b-navbar-nav>
            <b-nav-item v-for="(s,index) in series" v-bind:id="'head-' + s.name" :key="index"
                        href="#"
                        v-bind:class="{'font-weight-bold': s.name == curSerie.name, 'text-white': s.name != curSerie.name}" @click="onSelect(s)">{{ s.name }}
            </b-nav-item>
          </b-navbar-nav>
          <button class="btn btn-sm btn-light rounded-circle mr-2" @click="onRefresh()"><i class="fa fa-refresh"></i></button>
          <button v-if="!create_form" class="btn btn-sm btn-light rounded-circle" @click="create_form = !create_form"><i class="fa fa-plus"></i></button>
          <button v-if="create_form" class="btn btn-sm btn-light rounded-circle" @click="create_form = !create_form"><i class="fa fa-minus"></i></button>
          <form v-if="create_form" class="mt-2" onsubmit="return false">
            <input v-model="new_serie_name" class="form-control form-control-sm" type="text">
            <select v-model="selected_type" class="form-control form-control-sm" style="margin-top:0.2em;">
              <option v-for="type in possible_types" :key="type" :value="type"> {{ type }}</option>
            </select>
            <button :disabled="!new_serie_name || selected_type == null || new_serie_name.includes(' ')" class="btn btn-sm btn-light mt-1"
                    @click="onCreate()">Ajouter série <i class="fa fa-plus"></i></button>
          </form>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script lang="js">

export default {
  name: 'MyHeader',
  props: ["series", "curSerie"],  // Data from parent

  mounted() {
  },

  data() {
    return {
      possible_types: ["int32", "int64", "float32"],
      create_form: false,
      new_serie_name: "",
      selected_type: null,
    }
  },
  methods: {
    onSelect(serie) {
      this.$parent.$refs.mySideBar.onSelect(serie);
    },

    onRefresh() {
      this.$parent.$refs.mySideBar.onRefresh();
    },

    onCreate() {
      this.$parent.$refs.mySideBar.new_serie_name = this.new_serie_name;
      this.$parent.$refs.mySideBar.selected_type = this.selected_type;
      this.$parent.$refs.mySideBar.onCreate();
      this.create_form = false;
      this.new_serie_name = "";
      this.selected_type = null;
    },
  },
  computed: {}
}
</script>

<style>
header {
  height: 90px; /* Meme valeur que 'top' de MySidebar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  z-index: 10;
}

.navbar-brand {
  cursor: default;
}

.nav-link {
  color: rgb(200, 230, 250) !important;
  word-break: break-word !important;
}

@media only screen and (min-width: 1200px) {
  #nav-collapse.my-menu {
    display: none ! important;
  }
}
</style>
