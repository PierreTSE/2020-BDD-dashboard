<template>
    <div class="py-4 border-top border-bottom">
        <h2>Critères de recherche :</h2>
        <p class="h5 bg-warning" v-if="show_request">{{ request }}</p>
        
        <div class="alert alert-danger alert-dismissible" role="alert" v-if="show_alert">
            Erreur de syntaxe dans la requete !
            <div v-on:click="show_alert = !show_alert" class="close">
                <p>&times;</p>
            </div>
        </div>

        <div> 

            <label class="container">requête manuelle
                <input type="checkbox" v-model="manual_query_enable" @change="updateCheckboxes(true)">
                <span class="checkmark"></span>
            </label>

            <form class="form-inline">

                <div class="form-check form-check-inline">
                    <label class="container">jusqu'à
                        <input type="checkbox" v-model="date_before_enable" @change="updateCheckboxes()">
                        <span class="checkmark"></span>
                    </label>
                    <label class="container" v-if="date_before_enable"> inclus
                            <input type="checkbox" v-model="include_before_enable" @change="updateCheckboxes()">
                            <span class="checkmark"></span>
                    </label>
                </div>
                
            </form>

            <form class="form-inline">

                <div class="form-check form-check-inline">
                    <label class="container">à partir de
                        <input type="checkbox" v-model="date_after_enable" @change="updateCheckboxes()">
                        <span class="checkmark"></span>
                    </label>
                    <label class="container" v-if="date_after_enable"> inclus
                            <input type="checkbox" v-model="include_after_enable" @change="updateCheckboxes()">
                            <span class="checkmark"></span>
                    </label>
                </div>
            </form>
        </div>
        
        <form class="form-group form-inline">
            <input type="date" class="form-control flex-fill mr-1" v-model="date_before" v-if="date_before_enable" @change="updateRequest()"/>
            <input type="time" class="form-control mr-2" step="1" v-model="time_before" v-if="date_before_enable" @change="updateRequest()">
            <input type="date" class="form-control flex-fill mr-1" v-model="date_after" v-if="date_after_enable" @change="updateRequest()"/>
            <input type="time" class="form-control mr-2" step="1" v-model="time_after" v-if="date_after_enable" @change="updateRequest()"/>

            <input type="date" class="form-control flex-fill" v-model="date_exact" v-if="request_mode_all" @change="updateCheckboxes()"/>
            <input type="text" class="form-control flex-fill" v-model="manual_query" v-if="manual_query_enable" @keyup="updateRequest()" @keydown="updateRequest()"/>            
            <button type="button" class="btn btn-info" @click="onRequestSubmit()">{{submit_text}}</button>
        </form>

        <form class="form-inline">

            <div class="form-check form-check-inline">

                <label class="container" id="aggregation">SUM
                    <input class="form-check-input" type="checkbox" v-model="sum_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="container" id="aggregation">COUNT
                    <input class="form-check-input" type="checkbox" v-model="count_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="container" id="aggregation">AVG
                    <input class="form-check-input" type="checkbox" v-model="avg_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="container" id="aggregation">MIN
                    <input class="form-check-input" type="checkbox" v-model="min_enable" @change="updateCheckboxes()">
                    <span class="checkmark"></span>
                </label>

                <label class="container" id="aggregation">MAX
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
        request: null,
        serie: "MySerie",
        show_request: false,
        show_alert: false,
    }),
    methods: {
        updateRequest() {
            //initialization
            let prefix = "SELECT FROM " + this.serie + " ";
            let conditions = [];
            let conditions_processed = "";

            //load conditions for the request
            if (this.request_mode_all) {
                if (this.date_exact) {
                    conditions.push("timestamp == " + Date.parse(this.date_exact)/1000);
                } else {
                    this.request =  "SELECT all FROM " + this.serie +";";
                }
            } 
            else if (this.manual_query_enable){
                this.request = this.manual_query;
            } 
            else {
                // TODO : Do we want finer controls ? like choose with hour rather than date (pls no)
                if (this.date_before_enable){
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
            if (this.sum_enable | this.count_enable | this.avg_enable | this.min_enable | this.max_enable){
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
            this.show_alert = false;  // Hide the potential leftover error message
            this.sendRequest(this.request);
            this.clearForm();
        },

        async sendRequest(query_string) {
            console.log("REQUEST :", query_string);
            try {
                let response = await fetch("http://localhost:8080/query?query=" + query_string);
                if (response.ok) {
                    const data = await response.json();
                    console.log("RESPONSE : ", data);
                    if (data["success"] == true) {
                        console.log("Data received: ", data["data"]);
                        // Send data to Table
                        this.$parent.$refs.myTable.jsonParse(JSON.stringify(data));
                    } else {
                        this.show_alert = true;
                        throw new Error("ERROR(S) : " + JSON.stringify(data["error"]));
                    }
                } else {
                    throw new Error("ERROR (BAD NETWORK RESPONSE).");
                }
            } catch (err) {
                console.error("ERROR : ", err);
            }
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
                this.submit_text = "Requete (Tout)";
            } else {
                this.submit_text = "Requete";
            }
            this.updateRequest()
        }
    },
    created(){  //execute on page load
        this.updateCheckboxes();
    },
};
</script>

<style scoped>

 /* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
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

</style>