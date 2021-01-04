<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="Beelen"
      :search="search"
      loading-text="........"
      sort-by="num"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>จัดการกล่องเลี้ยงผึ้ง</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >เพิ่มกล่องผึ้ง</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="Name" label="ชื่อ"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="Created" label="Created"></v-text-field>
                  </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="sbee"
                        label="พันธ์ผึ้ง"
                        v-model="Species"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.id="{ item }">
        <v-icon big class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon big class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        <v-icon big class="mr-2" @click="detail(item)"
          >mdi-account-details</v-icon
        >
        <v-icon big @click="gennarateQR(item)">mdi-qrcode</v-icon>
      </template>

      <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
    </v-data-table>

    <!-- ///////////////////// -->

    <div class="text-center">
      <v-dialog v-model="dialog2" width="400">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <H3>{{ Qrtitle }}</H3>
          </v-card-title>
          <center>
            <qrcode-vue
              :value="value"
              :size="size"
              level="H"
              :class="Qrtitle"
            ></qrcode-vue>
          </center>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog2 = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import moment from "moment";
import QrcodeVue from "qrcode.vue";
export default {
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      user.getIdTokenResult().then((idTokenResult) => {
        //   console.log(idTokenResult.claims.Farm)
        this.farmID = idTokenResult.claims.Farm;
        this.getBeeBox(idTokenResult.claims.Farm)
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
  data() {
    return {
      farmID: "",
      Qrtitle: "",
      dialog2: false,
      value: "",
      size: 200,
      Beelen: [],
      search: "",
      dialog: false,
      sbee: ["ผึ้งพันธ์"],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "num",
        },
        {
          text: "ชื่อ",
          value: "Name",
        },
        {
          text: "วันที่สร้าง",
          value: "Created",
        },
        {
          text: "พันธ์ผึ้ง",
          value: "Species",
        },
        {
          text: "Actions",
          value: "id",
          sortable: false,
        },
      ],
      editedIndex: -1,

      editedItem: {
        Name: "",
        Species: "",
      },
      Name: "",
      Species: "",
      Created: "",
      editid: "",
    };
  },
  components: {
    QrcodeVue,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Box" : "Edit Box";
    },
    time() {
      return moment().format("L");
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    gennarateQR(id) {
      this.Qrtitle = id.Name;
      this.value = id.id;
      this.dialog2 = true;
    },
    getBeeBox(uid) {
      this.Beelen = [];
      db.collection("BeeBox")
        .where("Idfarm", "==" ,uid)
        .onSnapshot((snapshot) => {
          this.Beelen = [];
          snapshot.forEach((doc) => {
            this.Beelen.push({
              id: doc.id,
              Created: doc.data().Created,
              Idfarm: doc.data().Idfarm,
              Name: doc.data().Name,
              num: doc.data().num,
              Species: doc.data().Species,
            });
            this.$store.state.Beebox = this.Beelen.length;
          });
        });
    },

    editItem(item) {
      this.editedIndex = this.Beelen.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.Name = item.Name;
      this.Created = item.Created;
      this.Species = item.Species;
      this.editid = item.id;
      console.log(item.id);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editid = item.id;
      const index = this.Beelen.indexOf(item);
      confirm("Are you sure you want to delete ?") &&
        db
          .collection("BeeBox")
          .doc(this.editid)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
    },
    detail(item) {
      this.editedIndex = this.Farm.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(item.id);
      this.$router.push({
        name: "Detail",
        params: {
          Detail: item.id,
        },
      });
    },

    close() {
      this.editid = "";
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.Beelen = [];
      if (this.Name == "" || this.Species == "") {
        alert("Please complete all fields");
        this.getBeeBox(this.farmID);
        this.close();
      } else {
        if (this.editid.length == 0) {
          db.collection("BeeBox")
            .add({
              Name: this.Name,
              Created: this.time,
              Species: this.Species,
              num: this.$store.state.Beebox + 1,
              Idfarm: this.farmID,
            })
            .then(() => {
              console.log("Document successfully updated!");
              alert("Success");
              this.getBeeBox(this.farmID);
              this.close();
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
        } else {
          var updateRef = db.collection("BeeBox").doc(this.editid);
          return updateRef
            .update({
              Name: this.Name,
              Created: this.Created,
              Species: this.Species,
            })
            .then(() => {
              console.log("Document successfully updated!");
              alert("Success");
              this.editid.length == 0;
              this.close();
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
        }
      }
    },
  },
};
</script>

<style></style>
