import Vue from "nativescript-vue";
// import Contacts from 'nativescript-contacts';
import Home from "./components/Home";

// Vue.registerElement('Contacts', () => { require('nativescript-contacts').Contacts })

new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
