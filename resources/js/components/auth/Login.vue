<template>
    <div>
        <!--begin::Content header-->
        <div class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
      <span class="font-weight-bold font-size-3 text-dark-60">
        Don't have an account yet?
      </span>
            <router-link class="font-weight-bold font-size-3 ml-2"
                         :to="{ name: 'register' }">
                Sign Up!
            </router-link>
        </div>
        <!--end::Content header-->

        <!--begin::Signin-->
        <div class="login-form login-signin">
            <div class="text-center mb-10 mb-lg-20">
                <h3 class="font-size-h1">Sign In</h3>
                <p class="text-muted font-weight-semi-bold">
                    Enter your username and password
                </p>
            </div>


            <!--begin::Form-->
            <v-form class="form" @submit.prevent="onSubmit" novalidate autocomplete="off">
                <v-layout row wrap class="display-block">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-flex xs12>
                        <v-text-field
                            label="Email*" type="text"
                            name="email"
                            v-model="loginDetail.email"
                            :error-messages="getErrorValue('email')"
                            v-validate="'required|email'"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="Password*" type="password"
                            name="password"
                            v-model="loginDetail.password"
                            :error-messages="getErrorValue('password')"
                            v-validate="'required|min:6'"
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <!--begin::Action-->
                <div class="form-group d-flex flex-wrap flex-center">
                    <a class="text-dark-60 text-hover-primary my-3 mr-2" id="kt_login_forgot" @click="forgotPasswordDialog = true">
                        Forgot Password ?
                    </a>
                    <v-btn ref="kt_login_signin_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4" type="submit" :loading="isSubmitting">
                        Submit
                    </v-btn>
<!--                    <v-btn class="btn btn-primary" type="submit" :loading="isSubmitting">{{// $getConst('BTN_SUBMIT')}}</v-btn>-->
                </div>
                <!--end::Action-->
            </v-form>
            <!--end::Form-->
        </div>
        <!--end::Signin-->
        <forgot-password-modal v-model="forgotPasswordDialog" @forget-password-email="forgotPassword"></forgot-password-modal>
        <snackbar v-model="snackbar"></snackbar>
        <permission-dialog v-model="permissionDialog"></permission-dialog>
    </div>
</template>


<script src="./login.js"></script>
