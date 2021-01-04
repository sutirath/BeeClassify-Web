<template>
  <div>
      <appbar />
      <center><h1>ตั้งค่าระบบ</h1></center>
      <div class="container">
        <div>
        <v-row>
          <v-col lg="4" cols="sm" class="pb-2">
            <v-card>
              <v-row class="no-gutters">
                <div class="col-auto">
                  <div class="cyan fill-height">&nbsp;</div>
                </div>
                <div class="col pa-3 py-4 cyan--text">
                  <h5 class="text-truncate text-uppercase">จำนวนฟาร์ม</h5>
                  <h1>{{$store.state.Farmnumber}}</h1>
                </div>
              </v-row>
            </v-card>
          </v-col>
          <v-col lg="4" cols="sm" class="pb-2">
            <v-card>
              <v-row class="no-gutters">
                <div class="col-auto">
                  <div class="primary fill-height">&nbsp;</div>
                </div>
                <div class="col pa-3 py-4 primary--text">
                  <h5 class="text-truncate text-uppercase">จำนวนผู้ใช้งาน</h5>
                  <h1>23</h1>
                </div>
              </v-row>
            </v-card>
          </v-col>
          <v-col lg="4" cols="sm" class="pb-2">
            <v-card>
              <v-row class="no-gutters">
                <div class="col-auto">
                  <div class="success fill-height">&nbsp;</div>
                </div>
                <div class="col pa-3 py-4 success--text">
                  <h5 class="text-truncate text-uppercase">จำนวนกล่องผึ้ง</h5>
                  <h1>{{this.$store.state.AllBeeBox }}</h1>
                </div>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>




      </div>    

    <Myfooter />
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import appbar from "@/components/appbar";
import Myfooter from "@/components/Myfooter";
export default {
   beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.replace("/");
      } else {
        var displayName = user.displayName;
        this.$store.state.username = displayName;
      }
    });
  },
   methods: {
    getdata() {
      db.collection("Farm").onSnapshot((snapshot) => {
        var Farm = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          Farm.push(doc.data());
          this.$store.state.Farmnumber = Farm.length;
        });
      });
    },
    getAllBeeBox(){
      db.collection("BeeBox").onSnapshot((snapshot) => {
        var BeeBox = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          BeeBox.push(doc.data());
          this.$store.state.AllBeeBox = BeeBox.length;
        });
      });
    }
  },
  created() {
    this.getdata();
    this.getAllBeeBox();
  },
components: {
    appbar,
    Myfooter,
  },
}
</script>

<style>

</style>