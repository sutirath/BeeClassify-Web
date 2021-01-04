import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import VueRecord from '@codekraft-studio/vue-record'
Vue.use(VueRecord)

import AudioRecorder from 'vue-audio-recorder'
Vue.use(AudioRecorder)

import VueResource from "vue-resource"
Vue.use(VueResource);

const config = {
  apiKey: "AIzaSyCwiwjCabVd2nHKHIfOawsM3MM9Q1qIz6Q",
  authDomain: "bee-app-65be5.firebaseapp.com",
  databaseURL: "https://bee-app-65be5.firebaseio.com",
  projectId: "bee-app-65be5",
  storageBucket: "bee-app-65be5.appspot.com",
  messagingSenderId: "1061411177073",
  appId: "1:1061411177073:web:8c369252b3da2b3a9111d0",
  measurementId: "G-6816KL3N9B"
};

firebase.initializeApp(config);

export const db = firebase.firestore()


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
