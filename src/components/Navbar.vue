<template>
  <div class="navbar-wrap">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Carol Company</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
          // eslint-disable-next-line
          alert(response.data.message);
        }
      });
    },
  },
};
</script>
