<template>
  <v-app>
    <v-dialog v-model="dialog" persistent width="500">
        <template v-slot:activator="{ on }">
          <v-btn top class="mb-2" color="primary" dark v-on="on" width="150" @click="postUsers">Nuevo usuario</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="form.nombre_usuario" label="*Nombre" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="form.email" label="*Correo" hint="ejemplo: alguien@gmail.com"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*Indica todos los campos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-row justify="center">
      

      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="lighten-5 px-3"
      >
        <v-dialog v-model="dialogDel" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Está seguro de eliminar este usuario?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text >Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="delUsers">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="updateClick(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="delUsers()">
            mdi-delete
          </v-icon>
      </template>
      </v-data-table>
    </v-row>
  </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    
    name: 'Users',

    data: () => ({
      dialog: false,
      dialogDel: false,

      headers: [
          {
            text: 'Nombre',
            align: 'center',
            sortable: false,
            value: 'nombre_usuario',
          },
          { text: 'Correo', value:'email'},
          { text: 'Acciones', value: 'actions', sortable: false},
      ],
      desserts: [],

      editedIndex: -1,
      form: {
        "nombre_usuario" : "",
        "email" : "",
      },
      /*defaultForm: {
        nombre_usuario: '',
        email: '',
        id_usuario: ''
      },*/

      users: []
    }),

    computed:{
      formTitle (){
        return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
      }
    },

    watch: {
      dialog (val) {
        val || this.close
      },
      dialogDel (val) {
        val || this.close
      }
    },


    created(){
      this.getUsers();
    },
    methods:{
      getUsers(){
        axios
        .get("http://localhost/Service_Users/index.php/item")
        .then((response) => {
          console.log(response.data);
          this.users = response.data;
        })
        .catch((e) => {
          console.log(e);
          alert("--");
        });
      },

      postUsers(){
        this.nombre_usuario="";
        this.email="";
        /*axios
        .post("http://localhost/Service_Users/index.php/item/1", this.form, { "Access-Control-Allow-Origin": "*" })
        .then((data) => {
          console.log(data);
          this.users.push({
            id_usuario: + new Date(),
            nombre_usuario: this.nombre_usuario,
            email: this.email
          })
          /*this.editedIndex = this.users.indexOf(item)
          this.form = Object.assign({}, data)
          this.dialog = true
        });*/
      },
 
      putUsers(dep){
        this.formTitle="Editar usuario";
        this.nombre_usuario=dep.nombre_usuario;
        this.email=dep.email;
        /*axios
        .put("http://localhost/Service_Users/index.php/item", this.form)
        .then((response) => {
          console.log(response);
        })*/
      },

      delUsers(){
        if(!confirm("¿Estás seguro?")){
          return;
        }
        axios.delete("http://localhost/Service_Users/index.php/item/6")
        .then((response) => {
          this.getUsers();
          alert(response.data);
        })
        /*const index = this.users.indexOf(id_usuario)
        if (confirm('¿Estás seguro de eliminar este usuario?') ){
          axios
          .delete("http://localhost/Service_Users/index.php/item/1")
          .then(() => {
            this.users.splice(index, 1)
          });
        }*/
        
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.form = Object.assign({}, this.defaultForm)
          this.editedIndex = -1
        }, 300)
      },

      save(){
        /*console.log(this.post)*/
        axios.post("http://localhost/Service_Users/index.php/item?="+ this.nombre_usuario + this.email + this.form, {
          nombre_usuario: this.nombre_usuario,
          email: this.email
        })
        .then((response) => {
          this.getUsers();
          alert(response.data);
        })
        /*if (this.editedIndex > -1) {
          Object.assign(this.users[axios
        .post("http://localhost/Service_Users/index.php/item/1", this.form)], this.id_usuario)
          }
          else {
            this.users.push(this.form)
          }
          this.close()
        }
        /*axios
        .post("http://localhost/Service_Users/index.php/item/1", this.form, { "Access-Control-Allow-Origin": "*" })
        .then((response) => {
          console.log(response.data)
          if (this.editedIndex > -1) {
          Object.assign(this.users[this.response.data], this.form)
          }
          else {
            this.users.push(this.form)
          }
          this.close()
        });*/
        /*if (this.editedIndex > -1) {
          Object.assign(this.users[this.form], console.log(this.postUsers))
        }
        else {
          this.users.push(this.form)
        }
        this.close()*/

        /*this.form.id_usuario = localStorage.getItem(id_usuario);
        axios.post("http://localhost/Service_Users/index.php/item/1", this.form)
        .then(data => {
          console.log(data);
          this.make
        })*/
        
      },
      updateClick(user){
          console.log(user);
          this.dialog = true;
          this.form = user;
        }
    }
  }
</script>