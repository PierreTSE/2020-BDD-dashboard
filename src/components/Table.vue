<template>
  <div class="container">
    <h1 class="mt-4 text-center">Table</h1>
    <form>
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
        <label for="score">Value</label>
        <input
          type="number"
          placeholder="Ex: 53453"
          v-model="score"
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
        <tr v-for="(entry, i) in sortedList" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: () => ({ name: "", score: "", allScores: [] }),
  computed: {
    sortedList: function() {
      return this.allScores.slice().sort(function(a, b) {
        return b.score - a.score;
      });
    },
  },
  methods: {
    onSubmit() {
      this.allScores.push({ name: this.name, score: this.score });
      this.clearForm();
    },
    clearForm() {
      this.name = "";
      this.score = "";
    },
  },
};
</script>