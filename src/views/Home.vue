<template>
  <div>
    <div class="container">
      <appbar />
      <v-row>
        <v-col lg="4" cols="sm" class="pb-2">
          <v-card>
            <v-row class="no-gutters">
              <div class="col-auto">
                <div class="cyan fill-height">&nbsp;</div>
              </div>
              <div class="col pa-3 py-4 cyan--text">
                <h5 class="text-truncate text-uppercase">จำนวนฟาร์ม</h5>
                <h1>{{ $store.state.Farmnumber }}</h1>
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
                <h1>{{ this.$store.state.AllBeeBox }}</h1>
              </div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-hover v-slot:default="{ hover }" open-delay="100">
              <v-card
                :elevation="hover ? 16 : 2"
                class="mx-auto"
                height="350"
                max-width="350"
              >
                <canvas id="myChart2" height="300" max-width="300"></canvas>
              </v-card>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6">
            <v-hover v-slot:default="{ hover }" close-delay="100">
              <v-card
                :elevation="hover ? 16 : 2"
                class="mx-auto"
                height="350"
                max-width="350"
              >
                <canvas id="myChart" height="300" max-width="300"></canvas>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>

      <div>
        <br />
        <br />
        <br />
        <DataTable />
      </div>
      <br />
      <br />
      <br />
    </div>
    <Myfooter />
  </div>
</template>

<script>
import firebase from "firebase";
import appbar from "../components/appbar";
import Chart from "chart.js";
import DataTable from "../components/DataTable";
import Myfooter from "../components/Myfooter";
import { db } from "@/main";

export default {
  name: "Home",
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      user.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult.claims.User)
        if (!!idTokenResult.claims.admin) {
          // Show admin UI.
          // showAdminUI();
        } else {
          // Show regular user UI.
          // showRegularUI();
        }
      });
      if (!user) {
        this.$router.replace("/");
      } else {
        var displayName = user.displayName;
        var Uid = user.uid;
        this.$store.state.username = displayName;
        this.$store.state.Uid = Uid;
      }
    });
  },
  components: {
    appbar,
    DataTable,
    Myfooter,
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
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
    getAllBeeBox() {
      db.collection("BeeBox").onSnapshot((snapshot) => {
        var BeeBox = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          BeeBox.push(doc.data());
          this.$store.state.AllBeeBox = BeeBox.length;
        });
      });
    },
  },
  created() {
    this.getdata();
    this.getAllBeeBox();
  },
  mounted() {
    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#ff0000", "#009933", "#0066ff"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Red", "Green", "Blue"],
      },
    });

    var ctx = document.getElementById("myChart2");
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#ffcc00", "#cc00ff", "#009933"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Yello", "Purple", "Green"],
      },
    });
  },
};
</script>

<style>
.myshadows {
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.16);
  margin-top: 30px;
}
</style>
