<template>
    <div class="container">
        <form class="form-inline">
            <input class="form-control" type="text" placeholder="Timestamp">
            <button class="btn btn-info" @click="onRequestSubmit">Request</button>
        </form>
    </div>
</template>


<script>
export default {
    name: "RequestForm",
    methods: {
        async onRequestSubmit() {
            let queryStr = "SELECT ";
            try {
                let response = await fetch("http://localhost:8080/query?query=" + queryStr);
                const data = await response.json();
                if (response.ok) {
                    console.log("Response : ", data);
                } else {
                    throw new Error("Soucis de reponse. Code reçu : " + data.code);
                }
            } catch (err) {
                console.error("Huston, nous avons un problème! ", err);
            }
            
            this.clearForm();
        },

        clearForm() {
            this.name = "";
            this.score = "";
        },
    }
};
</script>