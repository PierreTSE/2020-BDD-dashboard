<template>
  <div class="container">
    <h1 class="mt-4 text-center">Table</h1>
    <!-- <form>
      <div class="form-group">
        <label for="name">Timestamp</label>
        <input
          type="text"
          placeholder="Ex: Timestamp 1"
          v-model="name"
          class="form-control"
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
      <div class="form-group">
        <label for="date">Date</label>
        <input 
          type="date" 
          v-model="date"
          class="form-control"
        />
      </div>
      <div>
        <label for="time">Time</label>
        <input
          type="time"
          v-model="time"
          class="form-control"
          step="1"
        />
      </div>
     <button type="button" @click="onSubmit" class="btn btn-dark">
        Submit
      </button>
    </form> -->
    <div>
      <button class="btn btn-info" v-on:click="canEdit = !canEdit">Edit</button>
      <div>
        <table class="table table-sm mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="agr_result.name != ''">
              <th scope="row">{{agr_result.name}}</th>
              <td></td>
              <td>{{agr_result.value}}</td>
            </tr>
            <tr v-for="(entry, i) in allScores" :key="i" v-cloak>
              <th scope="row">
                <div class="view" v-if="!canEdit">
                 {{ ++i }}
                </div>
                <div class="edit" v-if="canEdit">
                  <i class="fa fa-trash" v-on:click="deleteElement(entry.ts)"></i>
                </div>
              </th>
              <td>{{ entry.ts }}</td>
              <td>{{ entry.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      allScores: [],
      agr_result: {name:"", value: 0},
      canEdit: false,
    }
  },
  methods: {

    deleteElement(time) {
      console.log("Timestamp "+time+" selected");
    },

    clearTable() {
      this.allScores = [];
      this.agr_result = {name:"", value: 0};
    },

    jsonParse(json_input) {
      this.clearTable();  // Effacer les données déjà présentes
      let obj = JSON.parse(json_input);
      if (obj.success) {
        for (let i = 0; i < obj.data.values.length; i++) {  // Pour chaque donnée dans le JSON
          this.allScores.push({
            ts: obj.data.values[i].timestamp,
            value: obj.data.values[i].value,
          });
        }

        if (obj.data.min) {
          this.agr_result = {name: "MIN", value: obj.data.min};
        }
        if (obj.data.max) {
          this.agr_result = {name: "MAX", value: obj.data.max};
        }
        if (obj.data.sum) {
          this.agr_result = {name: "SUM", value: obj.data.sum};
        }
        if (obj.data.avg) {
          this.agr_result = {name: "AVG", value: obj.data.avg};
        }
        if (obj.data.count) {
          this.agr_result = {name: "COUNT", value: obj.data.count};
        }
      }

      // Trier les scores par timestamp (croissant)
      this.allScores.sort(function(a, b) {
        return (a.ts - b.ts);
      });
    }
  },
};
</script>

<style>

</style>