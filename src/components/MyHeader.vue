<template lang="html">

  <header class="">
    <div>
   <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Dashboard</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
         <b-navbar-nav>
            <b-nav-item href="#">About</b-nav-item>
            <b-nav-item href="#" disabled>Contacts</b-nav-item>
         </b-navbar-nav>
         <!-- Right aligned nav items -->
         <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Lang" right>
               <b-dropdown-item href="#">EN</b-dropdown-item>
               <b-dropdown-item href="#">ES</b-dropdown-item>
               <b-dropdown-item href="#">RU</b-dropdown-item>
               <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right>
               <!-- Using 'button-content' slot -->
               <template v-slot:button-content>
                  <em>User</em>
               </template>
               <b-dropdown-item href="#">Profile</b-dropdown-item>
               <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
         </b-navbar-nav>
      </b-collapse>
   </b-navbar>
  
</div>
  </header>

</template>

<script lang="js">

  export default  {
    name: 'MyHeader',
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

<style>
header {
  height: 70px;  /* Meme valeur que 'top' de MySidebar */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  border-bottom: 3px solid black;
}


</style>
