<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
           @click.prevent="updatePage(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
         :class="{'active': page == pagination.current_page}">
          <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
           @click.prevent="updatePage(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  data() {
    return {
    };
  },
  methods: {
    updatePage(page) {
      this.$emit('getPage', page);
    },
  },
};
</script>
