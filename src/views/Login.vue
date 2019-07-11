<template>
  <div class="mt-5">
    <Alert/>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal text-center">請輸入資料登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control"
        v-model="user.username" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mb-3"
        v-model="user.password" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign in</button>
      <p class="mb-1 text-muted">&copy; 2019</p>
      <router-link class="text-muted" to="/"> &larr; 回到 Carol Shop 購物去</router-link>
    </form>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/admin/productsmanage');
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
  },
  components: {
    Alert,
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 20px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
