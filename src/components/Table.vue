<template>
  <div class="container">
    <button type="button" class="btn btn-default btn-circle btn-xl mt-4" 
    @click="showInsertDiv=!showInsertDiv"><i class="fa fa-plus"></i>
    </button>

    <button type="button" class="btn btn-default btn-circle btn-xl mt-4" 
    @click="showFileDiv=!showFileDiv"><i class="fa fa-file"></i>
    </button>
    <div v-if="showFileDiv">
      <br>
      <input type="file"  @change="loadTextFromFile">
    </div>

    <!-- Add row to table div -->
    <form v-if="showInsertDiv">
      <div class="form-group">
        <label for="date">Date</label>
        <input 
          type="date" 
          v-model="date"
          class="form-control"
        />
      </div>
      <div>
        <label for="time">Heure</label>
        <input
          type="time"
          v-model="time"
          class="form-control"
          step="1"
        />
      </div>
      <div class="form-group">
        <label for="value">Value</label>
        <input
          type="number"
          placeholder="Ex: 53453"
          v-model="value"
          class="form-control"
        />
      </div>
     <button type="button" @click="onSubmit" class="btn btn-dark">
        Submit
      </button>
    </form>
    
    
    
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in allScores" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ entry.ts }}</td>
          <td>{{ entry.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
    allScores: [], 
    showInsertDiv: false,
    showFileDiv: false
    }
  },
  computed: {
    // sortedList: function () {
    //   return this.allScores.sort(function (a, b) {
    //     return a.ts > b.ts;
    //   });
    // },
  },
  methods: {
    clearTable() {
      this.allScores = [];
    },

    jsonParse(json_input) {
      this.clearTable();  // Effacer les données déjà présentes
      let obj = JSON.parse(json_input);
      if (obj.success) {
        for (let i = 0; i < obj.data.length; i++) {  // Pour chaque donnée dans le JSON
          this.allScores.push({
            ts: obj.data[i].timestamp,
            value: obj.data[i].value,
          });
        }
      }

      // Trier les scores par timestamp (croissant)
      console.log(this.allScores);
      this.allScores.sort(function(a, b) {
        return (a.ts - b.ts);
      });
      console.log(this.allScores);
    },

    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
    }

  },
};
</script>

<style scoped>


.btn-circle.btn-xl {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
    margin-left: 3px;
    background-color: #10bccf;
}
</style>