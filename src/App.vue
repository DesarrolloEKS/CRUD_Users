<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
        absolute
        app
        permanent
        letf
        width="210px"
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
                <v-avatar color="pink lighten-5" size="27"> <!--color y tamaño de circulo-->
                  <span class="blue-grey--text text-h6">S</span> <!--color, tamaño y texto dentro del circulo-->
                </v-avatar>
                Service
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider>
        </v-divider>

        <v-list class="three">
          <v-list-item @click="openItem(Users.vue)">
            <v-list-item-icon>
              <v-icon>
                mdi-account-group-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item style="top: 390px">
            <v-list-item-icon>
              <v-icon>
                mdi-email-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Help & Support</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item style="top: 370px;">
            <v-list-item-icon>
              <v-icon>
                mdi-cog-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item style="top: 350px;">
            <v-list-item-icon>
              <v-icon >
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      
      </v-navigation-drawer>


      <v-main>
      <Users/>
    </v-main>
    </v-card>

    
  </v-app>
</template>

<script>
import Users from './components/Users.vue';

export default {
  name: 'App',

  components: {
    Users
  },
};
</script>
