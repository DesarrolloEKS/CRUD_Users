<template>
  <v-app>
    <v-card height="550">
    <v-navigation-drawer
      absolute
      permanent
      letf
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-avatar color="pink lighten-5" size="27"> <!--color y tamaño de circulo-->
                <span class="blue-grey--text text-h6">S</span> <!--color, tamaño y texto dentro del circulo-->
              </v-avatar>
              Service
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon> <!--muestra los iconos-->
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title> <!--muestra el texto al lado de los iconos-->
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
  </v-card>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data () {
      return {
        items: [

          { title: 'Users', icon: 'mdi-account-group-outline' },
          
          
          { title: 'Help & Support', icon: 'mdi-email-outline' },
          { title: 'Settings', icon: 'mdi-cog-outline' },
          { title: 'Logout', icon: 'mdi-logout' },
        ],
      }
    },
};
</script>
