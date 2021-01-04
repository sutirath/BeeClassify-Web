<template>
<div>
    <appbar />
    <center>
        <h1>จัดการกล่องเลี้ยงผึ้ง</h1>
    </center>
    <br /><br />
    <div class="container">
        <pretable />
        <div>
            <br />
            <br />

        </div>
    </div>
    <br /><br /><br /><br /><br /><br /><br />
    <Myfooter />
</div>
</template>

<script>
import pretable from "../components/predictTable";
import rec from "@/components/rec.vue";
import axios from "axios";
import {
    db
} from "@/main";
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
    props: {
        record: {
            type: Object
        },
    },
    data() {
        return {
            audio: null,
            files: null,
            spiner: false,
            button: false,
            results: [],
            countDown: 5,
            file: null,
            headers: {
                "X-Custom-Header": "some data",
            },
        };
    },
    methods: {
        callback(data) {
            console.log(data);
        },
        countDownTimer() {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1;
                    this.countDownTimer();
                }, 1000);
            }
        },

        onResult(data) {
            this.files = [];

            let file = new File([data], Date.now() + ".wav", {
                type: "audio/wav",
                lastModified: Date.now(),
            });
            console.log(file);

            // this.predict(myFile);

            //  const audio = new FormData()
            //  audio.append('file', file,)

            //  this.files.push(audio)
            //  console.log(this.files[0])
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
    components: {
        appbar,
        Myfooter,
        pretable,
    },
};
</script>

<style></style>
