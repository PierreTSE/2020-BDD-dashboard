<template>
    <div class="py-4 border-top border-bottom">
        <h2>Critères de recherche :</h2>
        <h5 style="color: red">{{ request }}</h5>
        <form class="form-inline"> 
            <input type="checkbox" class="form-control flex-fill" v-model="manual_query_enable" @change="updateCheckboxes(true)">
            <label for ="date_after_enable">requête manuelle</label>

            <input type="checkbox" class="form-control flex-fill" v-model="date_before_enable" @change="updateCheckboxes()">
            <label for ="date_before_enable">jusqu'à</label>

            <input type="checkbox" class="form-control flex-fill" v-model="date_after_enable" @change="updateCheckboxes()">
            <label for ="date_after_enable">à partir de</label>
        </form>
        <form class="form-group form-inline">
            <input type="date" class="form-control flex-fill" v-model="date_before" v-if="date_before_enable" @change="updateRequest()"/>
            <input type="date" class="form-control flex-fill" v-model="date_after" v-if="date_after_enable" @change="updateRequest()"/>
            <input type="date" class="form-control flex-fill" v-model="date_exact" v-if="request_mode_all" @change="updateRequest()"/>
            <input type="text" class="form-control flex-fill" v-model="manual_query" v-if="manual_query_enable" @keyup="updateRequest()"/>
            <button type="button" class="btn btn-info" @click="onRequestAllSubmit()" v-if="request_mode_all">Requete (TOUT)</button>
            <button type="button" class="btn btn-info" @click="onRequestSubmit()" v-else>Requete</button>
        </form>
    </div>
</template>


<script>
export default {
    name: "RequestForm",
    data: () => ({   
        date_before_enable: false,
        date_after_enable: false,
        manual_query_enable: false,
        request_mode_all: true,
        manual_query: null,
        date_before: new Date().toISOString().substr(0, 10), 
        date_after: new Date().toISOString().substr(0, 10),
        date_exact: null,
        request: null,
        serie: "MySerie "
        
    }),
    methods: {
        updateRequest(){
            let prefix = "SELECT all FROM";
            prefix += " " + this.serie;

            if (this.request_mode_all) {
                this.request =  prefix
            } 
            else if (this.manual_query_enable){
                this.request = this.manual_query;
            } 
            else {
                let conditions = []
                // TODO : Do we want finer controls ? like choose with hour rather than date (pls no)
                if (this.date_before_enable){
                    conditions.push("timestamp < " + Date.parse(this.date_before)/1000);
                }
                if (this.date_after_enable){
                    conditions.push("timestamp > " + Date.parse(this.date_after)/1000);
                }

                let conditions_processed;
                if (conditions.length == 1) {
                    conditions_processed = "WHERE "+conditions[0];
                } else {
                    conditions_processed = "WHERE "
                    conditions.forEach(cond => {
                        conditions_processed += cond + " AND "
                    });
                    conditions_processed = conditions_processed.slice(0, -5)
                }
                this.request = prefix + conditions_processed + ";";
                // TODO : handle case where a specific date is wanted
            }
        },

        onRequestSubmit() {
            this.sendRequest(this.request);
            this.clearForm();
        },

        async sendRequest(query_string){
            console.log("REQUEST :", query_string);
            try {
                let response = await fetch("http://localhost:8080/query?query=" + query_string);
                const data = await response.json();
                if (response.ok) {
                    console.log("RESPONSE : ", data);
                } else {
                    throw new Error("ERROR (BAD RESPONSE) : " + data.code);
                }
                // TODO : send data to table
            } catch (err) {
                console.error("ERROR : ", err);
            }
        },

        clearForm() {
            this.value_min = null;
            this.value_max = null;
            this.date_before = new Date().toISOString().substr(0, 10);
            this.date_after = new Date().toISOString().substr(0, 10);
        },

        updateCheckboxes(manual_query_mode=false) {
            if (manual_query_mode) {
                this.date_before_enable = false;
                this.date_after_enable = false;
            } else {
                this.manual_query_enable = false;
            }
            this.request_mode_all = !(this.manual_query_enable | this.date_before_enable | this.date_after_enable);
            this.updateRequest()
        }
    }
};
</script>

<style scoped>
</style>