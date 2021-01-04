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
    }
  },
};
</script>