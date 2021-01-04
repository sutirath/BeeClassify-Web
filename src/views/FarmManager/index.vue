<template>
  <div>
    <appbar />

    <div class="container">
      <center>
        <H1>ระบบจัดการฟาร์ม</H1>
      </center>
      <br />
      <br />

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

      <!-- <div>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col v-for="n in 3" :key="n" cols="12" md="4">
                <v-item v-slot:default="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center"
                    light
                    height="200"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div v-if="active" class="display-3 flex-grow-1 text-center">Active</div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </div> -->
      <br><br>
      <FarmTable />
    </div>
    <br><br><br>
    <Myfooter/>
  </div>
</template>

<script>
import appbar from "@/components/appbar";
import FarmTable from "@/components/FarmTable";
import Myfooter from "@/components/Myfooter";
import { db } from "@/main";
export default {
  data() {
    return {};
  },
  created() {
      db.collection("BeeBox").onSnapshot((snapshot) => {
        var BeeBox = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          BeeBox.push(doc.data());
          this.$store.state.AllBeeBox = BeeBox.length;
        });
      });
    
  },
  components: {
    appbar,
    FarmTable,
    Myfooter
  },
};
</script>

<style>
</style>