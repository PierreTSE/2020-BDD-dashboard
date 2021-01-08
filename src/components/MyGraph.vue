<template lang="html">

  <div id="MyGraph" class="my-4"> 
    <TrendChart
      :datasets="[
        {
          data: [10, 50, 20, 100, 40, 60, 80],
          smooth: true,
          fill: true
        }
      ]"
      :grid="{
        verticalLines: true,
        horizontalLines: true
      }"
      :labels="{
        xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yLabels: 5,
      }"
      :min="0">
    </TrendChart>
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
    data () {
      return {

      }
    },
    methods: {

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
