<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('alertMessageModules', ['messages']),
  },
  components: {
    Navbar,
    Sidebar,
    Alert,
  },
};
</script>
