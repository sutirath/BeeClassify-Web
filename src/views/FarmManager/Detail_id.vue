<template>
  <div>
    <appbar />

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
                  <h5 class="text-truncate text-uppercase">ชื่อฟาร์ม</h5>
                  <h1>{{Name}}</h1>
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
                  <h5 class="text-truncate text-uppercase">เจ้าของฟาร์ม</h5>
                  <h1>{{Owner}}</h1>
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
                  <h1>{{this.$store.state.Beebox}}</h1>
                </div>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <br />
      <br />

      <div v-for="item in Farm" :key="item.index">
        <div>
          <v-card class="mx-auto" max-width="1000">
            <center>
              <v-row id="Mypad">
                <v-col>
                  <h1 id="he">เบอร์โทร</h1>
                  <h3>{{formatted}}</h3>
                </v-col>
                <v-col>
                  <h1 id="he">ที่อยู่</h1>
                  <h3>{{item.Address}}</h3>
                </v-col>
                <v-col>
                  <h1 id="he">พันธ์ผึ้ง</h1>
                  <h3>{{item.Species}}</h3>
                </v-col>
              </v-row>
            </center>
          </v-card>
          <br />
          <br />
        </div>
      </div>

      <BeeTable/>
    </div>
    <br />
    <br />
    <br><br><br><br>
    <Myfooter />
  </div>
</template>

<script>
import appbar from "@/components/appbar";
import { db } from "@/main";
import firebase from "firebase";
import Myfooter from "@/components/Myfooter";
import BeeTable from '@/components/BeeBoxTable';
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
  data() {
    return {
      id: this.$route.params.Detail,
      Farm: [],
      Name: "",
      Owner: "",
      sbee: ['ผึ้งพันธ์'],
      formatted:""
    };
  },

  created() {
    this.getdata();
    this.$store.state.FramId = this.$route.params.Detail
  },
  methods: {
    getdata() {
      /////////////getdata/////////////
      db.collection("Farm")
        .doc(this.id)
        .onSnapshot((doc) => {
          // console.log(doc.id, " => ", doc.data());

          this.Name = doc.data().Name;
          this.Owner =  doc.data().TitleName+doc.data().FirstName+" "+doc.data().LastName,

          this.Farm.push({
            id: doc.id,
            Location: doc.data().Location,
            Name: doc.data().Name,
            Owner: doc.data().TitleName+doc.data().FirstName+" "+doc.data().LastName,
            Species: doc.data().Species,
            Address: doc.data().Address+" "+"ต."+doc.data().district+" อ."+doc.data().amphoe+" จ."+
            doc.data().province+" "+doc.data().zipcode,
            Tel: doc.data().Tel,
          });
           var phone = doc.data().Tel;
           this.formatted = phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6,4)
        });
    },
  },

  components: {
    appbar,
    Myfooter,
    BeeTable
  },
};
</script>

<style>
#Mypad {
  padding: 20px;
}

#he {
  font-size: 30px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 10%,
    #c850c0 57%,
    #e8980b 100%
  );
}
</style>