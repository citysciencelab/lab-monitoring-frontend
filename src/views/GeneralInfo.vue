<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Anmelden</v-toolbar-title>
    </v-toolbar>
    <v-subheader>Please enter some general information about yourself. You only have to enter this once.</v-subheader>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation 
      >
        <v-col>
          <h3>About You</h3>
          <v-text-field
            v-model="user.country"
            label="Country"
            placeholder="Germany"
          ></v-text-field>

          <v-text-field
            v-model="user.plzHome"
            :rules="plzRules"
            :counter="5"
            label="PLZ Home"
            hint="If you're not German, just enter you're City's name"
          ></v-text-field>

          <v-text-field
            v-model="user.plzWork"
            :rules="plzRules"
            :counter="5"
            label="PLZ Work"
            hint="If you're not German, just enter you're City's name"
          ></v-text-field>

          <v-text-field
            v-model="user.age"
            type="number"
            label="Age"
          ></v-text-field>

          <v-radio-group
            row
            v-model="user.gender"
            label="Gender"
          >
            <v-radio
              key="F"
              label="F"
              value="F"
            ></v-radio>
            <v-radio
              key="M"
              label="M"
              value="M"
            ></v-radio>
            <v-radio
              key="D"
              label="D"
              value="D"
            ></v-radio>
          </v-radio-group>
          <v-combobox
            v-model="user.work"
            :items="defaults.work"
            label="Line of Work / Profession"
            hint="Multiple selections possible. Add your own."
            multiple
            chips
          ></v-combobox>
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on" @click="submit">OK</v-btn>
        </template>
        <span>Zur Umfrage</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Axios from 'axios'
import store from '../store'
import router from '../router'

export default Vue.extend({
  name: 'GeneralInfo',
  data: () => ({
    valid: true,
    user: {
      username: store.state.userdata.username,
      plzHome: '',
      age: '',
      gender: '',
      work: null,
      country: 'Germany'
    },
    nameRules: [
      v => !!v || 'Username is required'
    ],
    plzRules: [
      v => {
        if (this.user.country === "Germany") {
          return (!v) || (v && !isNaN(parseInt(v, 10)) && v.length === 5 || 'PLZ must consist of 5 letters');
        }
        else return true;
      }
    ],
  }),
  computed: {
    defaults () {
      return store.state.defaults;
    }
  },
  created () {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        this.submit();
      }
    });
  },
  mounted() {
    console.log(this.user.username);
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        Axios.post(process.env.VUE_APP_API_URL + '/login', this.user)
          .then(res => {
            const userid = res.data.id.toString();
            const user = {
              userid: userid,
              userdata: this.user
            }

            store.commit('user', user);
            if (store.state.cookies) {
              this.$cookies.set('user', user);
            }

            console.log(user);
            router.push('survey');
          });
      }
    }
  }
})
</script>
