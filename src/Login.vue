<template>
    <v-app>
        <v-card elevation="16" shaped class="mx-auto" max-width="500"  style="margin-top: 100px">
            <v-card-title class="text-h6 font-weight-regular justify-space-between">
                <span>Sign in</span>
            </v-card-title>
            <v-card-text>
            <v-text-field
                label="Email"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                Ingresa tu correo
            </span>
            </v-card-text>
            <v-card-text>
            <v-text-field
                label="Password"
                type="password"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                Ingresa tu contraseña
            </span>
            </v-card-text>
            <v-card-actions>
                <v-btn right top text>
                    Sign in
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>