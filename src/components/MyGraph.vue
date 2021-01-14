<template lang="html">
  <div id="MyGraph" class="my-4"> 
    <TrendChart
      :datasets="[
        {
          data: y_values,
          smooth: true,
          fill: true,
          showPoints: true,
        }
      ]"
      :grid="{
        verticalLines: false,
        horizontalLines: true
      }"
      :labels="{
        xLabels: x_values,
        yLabels: 5,
      }"
      :min="0" 
      v-if="x_values.length > 2" >
    </TrendChart>
    <button @click="DEBUG_addValue()">DEBUG(add value)</button>
  </div>
  
</template>

<script lang="js">
  import Vue from "vue";
  import TrendChart from "vue-trend-chart";
  Vue.use(TrendChart);

  export default  {
    name: 'MyGraph',
    props: [],
    mounted () {

    },
    data: () => ({
      x_values: [0, 0],
      y_values: [0, 0],
    }),
    methods: {
      async DEBUG_addValue(){
        this.x_values.push(this.y_values.length);
        this.y_values.push(Math.random());
        console.log(this.x_values);
        console.log(this.y_values);
      },
      setGraphValues(data){
        this.x_values = this.y_values = null;
        data.forEach(element => {
          this.x_values.push(element.ts);
          this.y_values.push(element.value);
        });
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
#MyGraph {
  width: 100%;
  height: 250px;
}
</style>
