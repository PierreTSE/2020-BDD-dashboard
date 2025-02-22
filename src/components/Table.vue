<template>
  <div class="container">
    <button v-if="error == '' && !loading" class="btn btn-outline-success btn-circle btn-xl my-2 mr-1" disabled type="button">
      <i class="fa fa-check"></i>
    </button>

    <button v-if="loading" class="btn btn-outline btn-circle btn-xl my-2 mr-1" disabled type="button">
      <i class="fa fa-spinner fa-pulse"></i>
    </button>

    <button v-if="error != '' && !loading" class="btn btn-outline-danger btn-circle btn-xl my-2 mr-1" disabled type="button">
      <i class="fa fa-exclamation"></i>
    </button>

    <button class="btn btn-circle btn-xl my-2 mr-1" type="button"
            v-bind:class="{'btn-info': showInsertDiv, 'btn-outline-info': !showInsertDiv}"
            @click="showInsertDiv=!showInsertDiv; showFileDiv=false;">
      <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-circle btn-xl my-2 mr-1" type="button"
            v-bind:class="{'btn-info': showFileDiv, 'btn-outline-info': !showFileDiv}"
            @click="showFileDiv=!showFileDiv; showInsertDiv=false;">
      <i class="fa fa-file"></i>
    </button>
    <button class="btn btn-circle btn-xl my-2 mr-1" type="button" v-bind:class="{'btn-info': canEdit, 'btn-outline-info': !canEdit}"
            v-on:click="canEdit = !canEdit">
      <i class="fa fa-pencil"></i>
    </button>

    <p v-if="error != ''" class="h6 text-light p-2 bg-danger mt-1 mb-3">{{ error }}</p>

    <div v-if="showFileDiv || showInsertDiv" class="bg-info p-2 mt-2 mb-3 mx-3">
      <div v-if="showFileDiv">
        <p class="text-light h5 pb-1 border-bottom">Importer un fichier CSV</p>

        <div class="custom-file">
          <input id="file-input" accept=".csv" class="custom-file-input" type="file" @change="loadTextFromFile"/><br>
          <label class="custom-file-label" data-browse="Choisir" for="file-input">Choisissez un fichier CSV</label>
        </div>

        <button v-if="!isCsvParsed" class="btn btn-dark mt-2" disabled type="button">
          Aucun fichier chargé
        </button>
        <button v-if="isCsvParsed" class="btn btn-dark mt-2" type="button" @click="onCSVSubmit">
          Insérer les données de {{ parsedCsvFilename }}
        </button>
      </div>

      <!-- Add row to table div -->
      <form v-if="showInsertDiv" action="#">
        <p class="text-light h5 pb-1 border-bottom">Ajouter une entrée</p>
        <div class="form-group row my-2 mx-auto">
          <label class="col-3 text-light h6 col-form-label" for="date">Date</label>
          <input
              v-model="date" class="form-control col"
              required
              type="date"
          />
        </div>
        <div class="form-group row my-2 mx-auto">
          <label class="col-3 text-light h6 col-form-label" for="time">Heure</label>
          <input
              v-model="time" class="form-control col"
              required
              step="1"
              type="time"
          />
        </div>
        <div class="form-group row my-2 mx-auto">
          <label class="col-3 text-light h6 col-form-label" for="value">Valeur</label>
          <input
              v-model="value" class="form-control col"
              placeholder="Ex: 53453"
              required
              type="number"
              @keyup.enter="onEnterClicked()"/>
        </div>
        <button :disabled="date == '' || time.length < 5" class="btn btn-dark mt-2 ml-1 px-4" type="button"
                @click="onTimestampSubmit">
          Envoyer
        </button>
      </form>
    </div>

    <div>
      <table class="table table-scroll table-striped table-sm mt-0">
        <thead class="bg-info">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Timestamps</th>
          <th scope="col">Valeurs</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(a, i) in agr_result" v-cloak :key="'arg_' + i">
          <th scope="row">{{ a.name }}</th>
          <td></td>
          <td>{{ a.value }}</td>
        </tr>
        <tr v-for="(entry, i) in allScores" v-cloak :key="i">
          <th scope="row">
            <div v-if="!canEdit" class="view">
              {{ ++i }}
            </div>
            <div v-if="canEdit" class="edit">
              <i class="mon-click fa fa-trash" v-on:click="deleteElement(entry.ts)"></i>
            </div>
          </th>
          <td>{{ entry.ts }}</td>
          <td>{{ entry.value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: "Table",
  props: ["curSeries", "error", "loading"],  // Data from parent
  data() {
    return {
      allScores: [],
      showInsertDiv: false,
      showFileDiv: false,
      date: "",
      time: "00:00:00",
      value: 0,
      csvScores: [],
      isCsvParsed: false,
      parsedCsvFilename: "",
      agr_result: [],
      canEdit: false,
    }
  },
  methods: {

    deleteElement(time) {
      const query_string = "DELETE FROM " + this.curSeries.name + " WHERE TIMESTAMP == " + time + ";";
      this.$parent.sendRequest(query_string).then((res) => {
        if (!res.success) {
          return;
        }
        for (const s of this.allScores) {
          if (s.ts == time) {
            this.allScores.splice(this.allScores.indexOf(s), 1);
            break;
          }
        }

        this.$emit('updateData', this.allScores);
      });
    },

    clearTable() {
      this.allScores = [];
      this.agr_result = {name: "", value: 0};
    },

    jsonParse(json_input) {
      this.clearTable();  // Effacer les données déjà présentes
      if (json_input.success) {
        for (let i = 0; i < json_input.data.values.length; i++) {  // Pour chaque donnée dans le JSON
          this.allScores.push({
            ts: json_input.data.values[i].timestamp,
            value: json_input.data.values[i].value,
          });
        }

        // Trier les scores par timestamp (croissant)
        this.allScores.sort(function (a, b) {
          return (a.ts - b.ts);
        });

        this.$emit('updateData', this.allScores);

        this.agr_result = [];
        if ("min" in json_input.data) {
          this.agr_result.push({name: "MIN", value: json_input.data.min});
        }
        if ("max" in json_input.data) {
          this.agr_result.push({name: "MAX", value: json_input.data.max});
        }
        if ("sum" in json_input.data) {
          this.agr_result.push({name: "SUM", value: json_input.data.sum});
        }
        if ("avg" in json_input.data) {
          this.agr_result.push({name: "AVG", value: json_input.data.avg});
        }
        if ("count" in json_input.data) {
          this.agr_result.push({name: "COUNT", value: json_input.data.count});
        }
      }
    },

    loadTextFromFile(ev) {
      this.isCsvParsed = false;  // Désactive le bouton "Inserer les données"

      const file = ev.target.files[0];
      this.parsedCsvFilename = file.name;
      const reader = new FileReader();
      let self = this;

      // Verifier que c'est bien un fichier csv
      if (file.name.split(".").pop() != 'csv') {//check if file extension is csv
        alert("Veuillez sélectionner un fichier CSV", "error");
      } else {
        // Cette fonction sera appélée quand le reader aura fini de lire le csv
        reader.onload = function () {
          self.$papa.parse(file, {
            complete: function (results) {
              self.csvScores = results.data;
              self.isCsvParsed = true;  // Rends le bouton "Inserer les données" clickable
            }
          });
        };

        // Lire le fichier choisis
        reader.readAsText(file);
      }
    },

    onTimestampSubmit() {
      let bufferScores = [];
      if (this.time.length == 5) this.time += ":00";
      let timestamp = this.date + "T" + this.time + ".000Z";
      timestamp = Date.parse(timestamp) / 1000;
      let request = "INSERT INTO " + this.curSeries.name + " VALUES ((" + timestamp + ", " + this.value + "));";
      bufferScores.push({
        ts: timestamp,
        value: parseFloat(this.value),
      });

      this.$parent.sendRequest(request).then((res) => {
        if (!res.success) {  // La requete a échoué, abandonné la mission
          return;
        }

        this.allScores.push(...bufferScores);

        // Trier les scores par timestamp (croissant)
        this.allScores.sort(function (a, b) {
          return (a.ts - b.ts);
        });

        this.$emit('updateData', this.allScores);

      });
    },

    onCSVSubmit() {
      let bufferScores = [];
      let request = "INSERT INTO " + this.curSeries.name + " VALUES (";

      for (let i = 0; i <= this.csvScores.length - 1; i++) {  // Every data in the CSV
        // Check that this is valid data
        if (this.csvScores[i].length != 2 || !/^[0-9]+$/.test(this.csvScores[i][0]) || !/^[0-9]+$/.test(this.csvScores[i][1])) {
          continue;
        }
        bufferScores.push({
          ts: parseFloat(this.csvScores[i][0]),
          value: parseFloat(this.csvScores[i][1]),
        });

        request += "(" + this.csvScores[i][0] + ", " + this.csvScores[i][1] + "), ";
      }
      request = request.slice(0, -2); // Retirer la dernière virgule
      request += ");";

      this.showFileDiv = false;

      this.$parent.sendRequest(request).then((res) => {
        if (!res.success) {  // La requete a échoué, abandonné la mission
          return;
        }

        this.allScores.push(...bufferScores);

        // Trier les scores par timestamp (croissant)
        this.allScores.sort(function (a, b) {
          return (a.ts - b.ts);
        });

        this.$emit('updateData', this.allScores);
      });

    },

    onEnterClicked() {
      this.onTimestampSubmit();
    },

  },
};
</script>


<style scoped>
.table-scroll {
  width: 100%;
}

.table-scroll tbody {
  display: block;
  overflow: auto;
  height: 75vh;
}

.table-scroll thead tr {
  display: block;
}

.table-scroll thead {
  color: #fff;
}

.table-scroll th, .table-scroll td {
  padding: 5px;
  text-align: left;
  width: 200px;
}

.btn-circle.btn-xl {
  width: 40px;
  height: 40px;
  padding: 11px 11px;
  border-radius: 50%;
  font-size: 16px;
  line-height: 1;
}

.mon-click {
  cursor: pointer;
}
</style>
