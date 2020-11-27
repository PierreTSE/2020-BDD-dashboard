var app = new Vue({ 
    el: '#app',
    data: {
        message: 'Hello Dashboard!',
        counter: 1
    },

    methods: {
        add_one: function(event) {
            this.counter += 1;
        }
    }
});
