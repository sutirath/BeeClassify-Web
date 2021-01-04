<template>
  <div>
    <div>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            <i class="fas fa-bell" id="myicons"></i>
          </v-card-title>
          <v-card-text>Are You LogOut ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
            <v-btn color="green darken-1" text @click="logout">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-app-bar app color="orange darken-2" dark elevation="0">
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="toggleTheme" color="primary" class="mr-2">{{buttonText}}</v-btn> -->
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" v-on="on" icon @click="dialogTologout">
            <i class="fas fa-sign-out-alt fa-lg"></i>]
          </v-btn>
        </template>
        <span>Sign Out to Sign In Page</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
    >
      <v-list dense color="orange darken-1" dark>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu">mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <h3 class="font-weight-bold">Bee Keeper</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="toggleMini = !toggleMini">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate">{{$store.state.username}}</v-list-item-content>
        <v-btn icon small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    dialog: false,
    sidebarMenu: true,
    toggleMini: false,
    items: [
      {
        title: "หน้าแรก",
        href: "/",
        icon: "mdi-home-outline",
      },
      {
        title: "จัดการฟาร์ม",
        href: "/MagagerFarm",
        icon: "mdi-barn",
      },
      {
        title: "จัดการผู้ใช้",
        href: "/comp",
        icon: "mdi-account-search-outline",
      },
      {
        title: "จัดการกล่องผึ้ง",
        href: "/soundpredict",
        icon: "mdi-cellphone-sound",
      },
      {
        title: "ตั้งค่า",
        href: "/settings",
        icon: "mdi-cog",
      },
    ],
  }),
  methods: {
    dialogTologout() {
      this.dialog = true;
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    // buttonText() {
    //   return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    // },
  },
};
</script>


<style>
#myicons {
  color: rgb(190, 20, 20);
  text-shadow: 1px 1px 1px #ccc;
  font-size: 1.5em;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: rgb(141, 141, 141);
}

.theme--dark.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application ::-webkit-scrollbar-track {
  background: #797979;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
