<template>
    <div class="py-4 border-top border-bottom">
        <h2>Critères de recherche :</h2>
        <p id="requestDebug" class="h6 bg-warning p-1" v-if="show_request">{{ request }}</p>
        
        <div> 

            <label class="my-container">requête manuelle
                <input type="checkbox" v-model="manual_query_enable" @change="updateCheckboxes(true)">
                <span class="checkmark"></span>
            </label>

            <form class="form-inline">

                <div class="form-check form-check-inline">
                    <label class="my-container">jusqu'à
                        <input type="checkbox" v-model="date_before_enable" @change="updateCheckboxes()">
                        <span class="checkmark"></span>
                    </label>
                    <label class="my-container" v-if="date_before_enable"> inclus
                            <input type="checkbox" v-model="include_before_enable" @change="updateCheckboxes()">
                            <span class="checkmark"></span>
                    </label>
                </div>
                
            </form>

            <form class="form-inline">

                <div class="form-check form-check-inline">
                    <label class="my-container">à partir de
                        <input type="checkbox" v-model="date_after_enable" @change="updateCheckboxes()">
                        <span class="checkmark"></span>
                    </label>
                    <label class="my-container" v-if="date_after_enable"> inclus
                            <input type="checkbox" v-model="include_after_enable" @change="updateCheckboxes()">
                            <span class="checkmark"></span>
                    </label>
                </div>
            </form>
        </div>
        
        <form class="form-group">
            <div v-if="date_before_enable" class="form-row">
                <div class="col-5"><input type="date" class="form-control flex-fill" v-model="date_before" v-if="date_before_enable" @change="updateRequest()"/></div>
                <div class="col-3"><input type="time" class="form-control" step="1" v-model="time_before" v-if="date_before_enable" @change="updateRequest()"/></div>
                <div class="col"><button v-if="!date_after_enable" type="button" class="btn btn-info btn-block" @click="onRequestSubmit()">
                    {{submit_text}} <i class="fa fa-chevron-right"></i>
                </button></div>
            </div>
            <div v-if="date_after_enable" class="form-row">
                <div class="col-5"><input type="date" class="form-control flex-fill" v-model="date_after" v-if="date_after_enable" @change="updateRequest()"/></div>
                <div class="col-3"><input type="time" class="form-control" step="1" v-model="time_after" v-if="date_after_enable" @change="updateRequest()"/></div>
                <div class="col"><button type="button" class="btn btn-info btn-block" @click="onRequestSubmit()">
                    {{submit_text}} <i class="fa fa-chevron-right"></i>
                </button></div>
            </div>
            <div v-if="request_mode_all" class="form-row">
                <div class="col-5"><input type="date" class="form-control flex-fill mr-1" v-model="date_exact" v-if="request_mode_all" @change="updateCheckboxes()"/></div>
                <div class="col-3"><input type="time" class="form-control" step="1" v-model="time_exact" v-if="request_mode_all" @change="updateCheckboxes()"/></div>
                <div class="col"><button type="button" class="btn btn-info btn-block" @click="onRequestSubmit()">
                    {{submit_text}} <i class="fa fa-chevron-right"></i>
                </button></div>
            </div>
            <div v-if="manual_query_enable" class="form-row">
                <div class="col-8"><input type="text" class="form-control flex-fill" v-model="manual_query" v-if="manual_query_enable" @keyup="updateRequest()" @keydown="updateRequest()"/></div>
                <div class="col"><button type="button" class="btn btn-info btn-block" @click="onRequestSubmit()">
                    {{submit_text}} <i class="fa fa-chevron-right"></i>
                </button></div>
            </div>
            
        </form>
        <form class="form-inline">
            <div class="form-check form-check-inline container row mx-auto">

                <label class="my-container col-4 col-sm-2" id="aggregation1">SUM
                    <input class="form-check-input" type="checkbox" v-model="sum_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="my-container col-4 col-sm-2" id="aggregation2">COUNT
                    <input class="form-check-input" type="checkbox" v-model="count_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="my-container col-4 col-sm-2" id="aggregation3">AVG
                    <input class="form-check-input" type="checkbox" v-model="avg_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="my-container col-4 col-sm-2" id="aggregation4">MIN
                    <input class="form-check-input" type="checkbox" v-model="min_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="my-container col-4 col-sm-2" id="aggregation5">MAX
                    <input class="form-check-input" type="checkbox" v-model="max_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label> 
            </div>
        </form>
    </div>
</template>


<script>
export default {
    name: "RequestForm",
    props: ["serie"],
    data: () => ({   
        submit_text: null,
        date_before_enable: false,
        include_before_enable: false,
        date_after_enable: false,
        include_after_enable: false,
        manual_query_enable: false,
        sum_enable: false,
        count_enable: false,
        avg_enable: false,
        min_enable: false,
        max_enable: false,
        request_mode_all: true,
        manual_query: null,
        date_before: new Date().toISOString().substr(0, 10), 
        date_after: new Date().toISOString().substr(0, 10),
        time_before: "00:00:00",
        time_after: "00:00:00",
        date_exact: null,
        time_exact: "00:00:00",
        request: "",
        show_request: false,
    }),
    created: function() {
        this.updateCheckboxes();
    },
    methods: {
        updateRequest() {
            // Initialization
            let prefix = "SELECT ALL FROM " + this.serie + " ";
            let conditions = [];
            let conditions_processed = "";

            // Load conditions for the request
            if (this.request_mode_all) {
                if (this.date_exact) {
                    if (this.time_exact.length == 5) this.time_exact += ":00";
                    let timestamp = this.date_exact + "T" + this.time_exact + ".000Z";
                    conditions.push("timestamp <= " + Date.parse(timestamp)/1000);
                } else {
                    this.request =  "SELECT ALL FROM " + this.serie +";";
                }
            } 
            else if (this.manual_query_enable){
                this.request = this.manual_query;
            } 
            else {
                if (this.date_before_enable){
                    if (this.time_before.length == 5) this.time_before += ":00";
                    if (this.include_before_enable){
                        let timestamp = this.date_before + "T" + this.time_before + ".000Z";
                        conditions.push("timestamp <= " + Date.parse(timestamp)/1000);
                    }
                    else {
                        let timestamp = this.date_before + "T" + this.time_before + ".000Z";
                        conditions.push("timestamp < " + Date.parse(timestamp)/1000);
                    }
                }
                if (this.date_after_enable){
                    if (this.time_after.length == 5) this.time_after += ":00";
                    if (this.include_after_enable) {
                        let timestamp = this.date_after + "T" + this.time_after + ".000Z";
                        conditions.push("timestamp >= " + Date.parse(timestamp)/1000);
                    }
                    else {
                        let timestamp = this.date_after + "T" + this.time_after + ".000Z";
                        conditions.push("timestamp > " + Date.parse(timestamp)/1000);
                    }
                }
            }
            
            // Apply conditions to request if needed (WHERE clause)
            if (conditions.length > 0) {
                conditions_processed = "WHERE ";
                conditions.forEach(cond => {
                    conditions_processed += cond + " AND ";
                });
                conditions_processed = conditions_processed.slice(0, -5);
                
                this.request = prefix + conditions_processed + ";";
            }

            // Insert aggregation functions
            if (!this.manual_query_enable) {
                let agg_prefix = "";
                if (this.sum_enable){
                    agg_prefix += "SUM ";
                }
                if (this.count_enable){
                    agg_prefix += "COUNT ";
                }
                if (this.avg_enable){
                    agg_prefix += "AVG ";
                }
                if (this.min_enable){
                    agg_prefix += "MIN ";
                }
                if (this.max_enable){
                    agg_prefix += "MAX ";
                }
                let new_request = [this.request.slice(0, 7), agg_prefix, this.request.slice(7)].join('');
                this.request = new_request;
            }
        },

        onRequestSubmit() {
            this.updateRequest();
            this.$parent.sendRequest(this.request).then((res) => {
                if (!res.success) {  // La requete a échoué, abandonné la mission
                    return;
                }
                this.$parent.$refs.myTable.jsonParse(res);
                
            });
            this.clearForm();
        },

        clearForm() {
            this.value_min = null;
            this.value_max = null;
            this.date_before = new Date().toISOString().substr(0, 10);
            this.date_after = new Date().toISOString().substr(0, 10);
            this.time_before = "00:00:00";
            this.time_after = "00:00:00";
            this.date_exact = null;
            this.manual_query = null;
            this.updateCheckboxes();
        },

        updateCheckboxes(manual_query_mode=false) {
            if (manual_query_mode) {
                this.date_before_enable = false;
                this.date_after_enable = false;
            } else {
                this.manual_query_enable = false;
            }
            this.request_mode_all = !(this.manual_query_enable | this.date_before_enable | this.date_after_enable);
            if (this.request_mode_all & !this.date_exact) {
                this.submit_text = "Requête (Tout)";
            } else {
                this.submit_text = "Requête";
            }
            this.updateRequest()
        }
    },

};
</script>

<style scoped>

 /* Customize the label (the container) */
.my-container {
  display: block;
  position: relative;
  padding-left: 31px;
  margin-bottom: 12px;
  margin-right: 16px;
  cursor: pointer;
  font-size: 1.3em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
}

/* Hide the browser's default checkbox */
.my-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 20%;
}

/* On mouse-over, add a grey background color */
.my-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.my-container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.my-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.my-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
} 

#requestDebug {
    min-height: 27px;
}

.request-btn-margin {
    margin-right: 153px; /* meme que request-bt (width + marginleft)*/
}

.request-btn {
    margin-left: 8px;
    width: 145px;  /* meme que la margin right que request-btn-margin - la margin left ici*/
}

</style>