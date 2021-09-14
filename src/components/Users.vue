<template>
  <v-app>
    <template>
      <v-banner single-line>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-black">Usuarios</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent width="500"> <!--Aquí se declara el dialogo de nuevo usuario-->
            <template v-slot:activator="{ on }">
              <v-btn class="mb-7" color="green" dark v-on="on" style="margin-top: 30px" width="150" @click="postUsers">Nuevo usuario</v-btn> <!--Botón-->
            </template>
            <v-card>
              <v-card-title>
                {{formTitle}} usuario
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
                <v-btn color="blue darken-1" text @click="save" :loading="loadingAPi">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-banner>
    </template>

    <template>
      <v-banner single-line>
        <v-toolbar flat>
          <v-text-field style="padding: 0;"
          v-model="search"
          dense
          clearable
          flat solo outlined hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search">
          </v-text-field>
          <v-select
          :items="headers"
          style="margin-top: 24px;"
          label="Fecha de creación"
          auto-select-first
          dense
          filled
          rounded
          solo>
          </v-select>
        </v-toolbar>
      </v-banner>
    </template>

    <v-divider ></v-divider>
    
    <v-banner>
    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :items-per-page="5"
        class="lighten-5 px-3"
      >
        <!--<v-dialog v-model="dialogDel" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Está seguro de eliminar este usuario?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text >Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="delUsers">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>-->

        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="updateClick(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="delUsers(item)">
            mdi-delete
          </v-icon>
      </template>
      </v-data-table>
    </v-row>
    </v-banner>
  </v-app>
</template>

<script>
  import axios from "axios";
  //import { set } from 'vue/types/umd';

  export default {
    
    name: 'Users',

    data: () => ({
      dialog: false,
      loadingAPi: false,
      //dialogDel: false,
      formTitle: "Nuevo",
      search: '',
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
        //userss:[],
        nombre_usuario: "",
        email: "",
      },
      defaultForm: {
        nombre_usuario: '',
        email: '',
      },

      users: []
    }),

    computed:{
      formTitles (){
        return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
      }
    },

    watch: {
     /* dialog (val, new_value) {
        val || this.close()
        /*if(!val) return
        setTimeout(() => (this.dialog = false), 4000)*-/
      }*/
    },


    created(){
      this.getUsers();
    },
    methods:{
      getUsers(){ //metodo para mostrar datos de la base de datos
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
        this.formTitle = "Nuevo";
        this.nombre_usuario="";
        this.email="";
      },
 
      putUsers(dep){
        this.nombre_usuario=dep.nombre_usuario;
        this.email=dep.email;
      },

      delUsers(){
        /*const index = this.users.indexOf(item)
        confirm('¿Estás seguro de querer eliminar?') && this.users.splice(index, 1)
        confirm('El usuario se ha eliminado exisotamente')*/
        if(!confirm("¿Estás seguro?")){
          return;
        }
          axios.delete("http://localhost/Service_Users/index.php/item/" + this.form.id_usuario)
          .then((response) => {
            this.getUsers();
           console.log(response.data);
           this.close();
        })
        /*const respuesta = confirm('¿Estás seguro?') && this.form.splice(index, 1)
        if(respuesta){
          axios.delete("http://localhost/Service_Users/index.php/item/${nombre_usuario}", this.form);
        }*/
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.form = Object.assign({}, this.defaultForm)
          this.editedIndex = -1
        }, 300);
        this.loadingAPi = false;
      },

      save(){
        this.loadingAPi = true;
        setTimeout(() => {
          this.loadingAPi = false
        },3000)

        if(this.formTitle == "Nuevo"){
          this.addUser();
        }
        if(this.formTitle == "Editar"){
          //Metodo editar
          this.modUser();
        }
      },
      addUser(){
        var bodyFormData = new FormData();
        bodyFormData.append('email', this.form.email);
        bodyFormData.append('nombre_usuario', this.form.nombre_usuario);

        axios.post("http://localhost/Service_Users/index.php/item/usuarios", bodyFormData)
        .then((response) => {
          //Validarcion
           this.getUsers();
           console.log(response.data);
           this.close();
        });
      },

      modUser(){
        axios.put("http://localhost/Service_Users/index.php/item/" + this.form.id_usuario, this.form)
        .then((response) => {
          //Validacion
           this.getUsers({data: response.data});
           console.log(response.data);
           this.close();
        });
      },

      updateClick(item){
        
        this.formTitle = "Editar";
          console.log(item);
          this.dialog = true;
          this.form = item;
        }
    }
  }
</script>