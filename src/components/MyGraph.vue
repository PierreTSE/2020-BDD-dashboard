<template lang="html">
  <div id="MyGraph" class="my-4">
    <TrendChart
        v-if="x_values.length > 2"
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
        yLabels: 5,
        yLabelsTextFormatter: (val) => {return Math.round(val * 100) / 100;}
      }"
        :min="0">
    </TrendChart>
  </div>

</template>

<script lang="js">
import Vue from "vue";
import TrendChart from "vue-trend-chart";

Vue.use(TrendChart);

export default {
  name: 'MyGraph',
  props: [],
  mounted() {

  },
  data: () => ({
    x_values: [0, 0],
    y_values: [0, 0],
  }),
  methods: {
    async DEBUG_addValue() {
      this.x_values.push(this.y_values.length);
      this.y_values.push(Math.random());
    },
    setGraphValues(data) {
      this.x_values = [];
      this.y_values = [];
      data.forEach(element => {
        this.x_values.push(element.ts);
        this.y_values.push(element.value);
      });
    }
  },
  computed: {}
}
</script>

<style>
#MyGraph {
  width: 100%;
  height: 250px;
}

.fill {
  fill: #17a2b8;
  fill-opacity: 0.2;
}

.stroke {
  stroke: #17a2b8;
  stroke-width: 0.3em;
}

.points circle {
  fill: #17a2b8;
  stroke: #0008;
  r: 0.25em;
}
</style>
