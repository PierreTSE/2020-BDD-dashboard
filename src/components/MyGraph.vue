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
      :min="0">
    </TrendChart>
    <button @click="addValue()">DEBUG(add value)</button>
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
      x_values: [0,1,2],
      y_values: [0,2,1],
    }),
    methods: {
      addValue(){
        //TODO: get values from re
        this.x_values.push(Math.floor(Math.random() * 5));
        this.y_values.push(Math.floor(Math.random() * 5));
      },
      updateGraphValues(x_,y_){
        this.x_values = x_;
        this.y_values = y_;
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
