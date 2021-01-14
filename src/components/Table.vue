<template>
  <div class="container">
     <button v-if="!loading" type="button" class="btn btn-outline-success btn-circle btn-xl mt-4" disabled>
       <i class="fa fa-check"></i>
    </button>

     <button v-if="loading" type="button" class="btn btn-outline-warn btn-circle btn-xl mt-4" disabled>
       <i class="fa fa-spinner fa-pulse"></i>
    </button>

    <button type="button" class="btn btn-info btn-circle btn-xl mt-4" 
    @click="showInsertDiv=!showInsertDiv; showFileDiv=false;"><i class="fa fa-plus"></i>
    </button>

    <button type="button" class="btn btn-info btn-circle btn-xl mt-4" 
    @click="showFileDiv=!showFileDiv; showInsertDiv=false;"><i class="fa fa-file"></i>
    </button>


    <div v-if="showFileDiv || showInsertDiv" class="bg-info p-2 mt-2 mx-3">
      <div v-if="showFileDiv">
        <br>
        <input type="file" accept=".csv" @change="loadTextFromFile" style="margin-bottom : 5px"/><br>
        <button :disabled="!isCsvParsed" type="button" @click="onCSVSubmit" class="btn btn-dark mt-2">
          Insérer les données
        </button>
      </div>

      <!-- Add row to table div -->
      <form v-if="showInsertDiv" action="#">
        <div class="form-group">
          <label for="date" class="text-light h5">Date</label>
          <input 
            type="date" 
            v-model="date"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="time" class="text-light h5">Heure</label>
          <input
            type="time"
            v-model="time"
            class="form-control"
            step="1"
          />
        </div>
        <div class="form-group">
          <label for="value" class="text-light h5">Value</label>
          <input
            type="number"
            placeholder="Ex: 53453"
            v-model="value"
            class="form-control"
          @keyup.enter="onEnterClicked()"/>
        </div>
      <button type="button" @click="onTimestampSubmit" class="btn btn-dark">
          Submit
        </button>
      </form>    
    </div>
    
    <table class="table table-scroll table-sm mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="agr_result.name != ''">
          <th scope="row" >{{agr_result.name}}</th>
          <td></td>
          <td>{{agr_result.value}}</td>
        </tr>
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
  props: ["curSeries"],  // Data from parent
  data() {
    return {
      allScores: [], 
      showInsertDiv: false,
      showFileDiv: false,
      date: new Date(),
      time: "00:00:00",
      value: 0,
      csvScores: [],
      isCsvParsed: false,
      agr_result: {name:"", value: 0},
      loading: false,
    }
  },
  methods: {
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

        // Trier les scores par timestamp (croissant)
        this.allScores.sort(function(a, b) {
          return (a.ts - b.ts);
        });
        // console.log(this.allScores);

        this.$emit('updateData', this.allScores);

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
    },

    loadTextFromFile(ev) {
      this.isCsvParsed = false;  // Désactive le bouton "Inserer les données"

      const file = ev.target.files[0];
      console.log(file.name);
      const reader = new FileReader();
      let self = this;

      // Verifier que c'est bien un fichier csv
      if(file.name.split(".").pop() != 'csv'){//check if file extension is csv
        alert( "Veuillez sélectionner un fichier CSV", "error");
      } else {
        // Cette fonction sera appélée quand le reader aura fini de lire le csv
        reader.onload = function() {
        self.$papa.parse(file, {
            complete: function(results) {
              self.csvScores = results.data;
              console.log(self.csvScores);
              self.isCsvParsed = true;  // Rends le bouton "Inserer les données" clickable
            }
          });
        };
        
        // Lire le fichier choisis
        reader.readAsText(file);
      }
    },

    onTimestampSubmit() {
      let timestamp = this.date + "T" + this.time + ".000Z";
      timestamp = Date.parse(timestamp)/1000;
      let request = "INSERT INTO " + this.curSeries.name + " VALUES (("+ timestamp +", " + this.value+"));";
      console.log(request);
      this.allScores.push({
        ts: timestamp,
        value: parseInt(this.value),
      });

      // Trier les scores par timestamp (croissant)
      this.allScores.sort(function(a, b) {
        return (a.ts - b.ts);
      });

      this.$emit('updateData', this.allScores);

      this.sendRequest(request);
    },

    onCSVSubmit() {
      let bufferScores = [];
      let request = "INSERT INTO " + this.curSeries.name + " VALUES (";

      for (let i = 0; i <= this.csvScores.length-1; i++) {  // Every data in the CSV
        // Check that this is valid data
        if (this.csvScores[i].length != 2 || !/^[0-9]+$/.test(this.csvScores[i][0]) || !/^[0-9]+$/.test(this.csvScores[i][1])) {
          continue;
        } 

        bufferScores.push({
          ts: parseInt(this.csvScores[i][0]),
          value: parseInt(this.csvScores[i][1]),
        });

        request += "("+ this.csvScores[i][0] +", " + this.csvScores[i][1]+")," ;
      }
      request += ");";

      // Trier les scores par timestamp (croissant)
      this.allScores.sort(function(a, b) {
        return (a.ts - b.ts);
      });

      this.loading = true;
      this.sendRequest(request).then((res) => {
        this.loading = false;
        console.log('res', res);
      });

      this.$emit('updateData', this.allScores);
    },

    onEnterClicked(){
      this.onTimestampSubmit();
    },
    
    async sendRequest(query_string) {
      console.log("REQUEST :", query_string);
      try {
        let response = await fetch(this.$apiurl + query_string);
        if (response.ok) {
          const data = await response.json();
          console.log("RESPONSE : ", data);
          if (data["success"] == true) {
            console.log("Data received: ", data["data"]);
            return data;
          } else {
            this.show_alert = true;
            throw new Error("ERROR(S) : " + JSON.stringify(data["error"]));
          }
        } else {
          throw new Error("ERROR (BAD NETWORK RESPONSE).");
        }
      } catch (err) {
        console.error("ERROR : ", err);
        return {"success": false, "error": err};
      }
    },

  },
};
</script>

<style scoped>
.table-scroll{
  width: 100%;
}
.table-scroll tbody{
  display: block;
  overflow: auto;
  height: 330px;
}

.table-scroll thead tr {
   display: block;
}

.table-scroll thead {
  background: #10bccf;
  color:#fff;
}

.table-scroll th, .table-scroll td {
  padding: 5px;
  text-align: left;
  width: 200px;
}

.btn-circle.btn-xl {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
    margin-left: 3px;
    /* background-color: #10bccf; */
}
</style>