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
     
    </form> -->
     <button type="button" @click="jsonParse" class="btn btn-dark">
        Submit
      </button>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Value</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in sortedList" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ entry.name }}</td>
          <td>{{ entry.value }}</td>
          <td>{{ entry.date }}</td>
          <td>{{ entry.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: () => ({
    name: "",
    value: "",
    allScores: [],
    date: new Date().toISOString().substr(0, 10),
    time: ""
  }),
  computed: {
    sortedList: function () {
      return this.allScores.slice().sort(function (a, b) {
        return b.value - a.value;
      });
    },
  },
  methods: {
    onSubmit() {
      this.allScores.push({
        name: this.name,
        value: this.value,
        date: this.date.split("-").join("/"),
        time: this.time
      });
      this.clearForm();
    },
    clearForm() {
      this.name = "";
      this.value = "";
      var t = new Date();
      this.date = t.getDate;
      this.time = t.getTime();
    },
    jsonParse() {
      var jsonTest = '{ "success" : true, "data" : [{"timestamp" : "125645", "value" : 15},{"timestamp" :"125646" , "value" : 10},{"timestamp" :"125647" , "value" : 19}]}';
      var obj = JSON.parse(jsonTest);
      if(obj.success){
        for (var i = 0; i < obj.data.length; i++ ){
          var t = new Date();
          this.allScores.push({
          name: "ok",
          value: obj.data[i].value,
          date: t.getDate(),
          time: obj.data[i].timestamp
          });
        }
      }
    }
  },
};
</script>