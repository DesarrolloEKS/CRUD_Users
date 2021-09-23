<template>
  <v-app>
    <template>
      <v-card class="mx-auto" max-width="500" style="margin-top: 180px;">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <span>{{ Title }}</span>
          <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
        </v-card-title>

        <v-window v-model="step" style="width: 400px;">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field label="Email" value="john@vuetifyjs.com"></v-text-field>
              <span class="text-caption grey--text text--darken-1">
                Este es el correo que utilizarás patra acceder a tu cuenta
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="Password" type="password"></v-text-field>
              <v-text-field label="Confirm Password" type="password"></v-text-field>
              <span class="text-caption grey--text text--darken-1">
                Introduzca una contraseña
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
              <h3 class="text-h6 font-weight-light mb-2">
                Welcome to Vuetify
              </h3>
              <span class="text-caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
          :disabled="step === 1"
          text
          @click="step--"
          >
            Atrás
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
          :disabled="step === 3"
          color="light-green darken-1"
          dark
          depressed
          @click="step++"
          >
            Siguiente
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      step: 1,
    }),

    computed: {
      Title () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Crear una contraseña'
          default: return 'Account created'
        }
      },
    },
  }
</script>