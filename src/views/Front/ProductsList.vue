<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active">
          產品列表
        </li>
        <li class="breadcrumb-item active">
          {{ select }}
        </li>
        <li class="breadcrumb-item active" v-if="filterText">
          搜尋 {{ filterText }}
        </li>
      </ol>
    </nav>

    <div class="row mb-2">
      <div class="col-lg-2 col-md-3 mb-3">
        <div class="sticky-top">
          <ul class="list-group mb-3 category">
            <li class="list-group-item list-group-item-action h6"
            v-for="(category, index) in categories" :key="index"
            :class="{'active': select == category.title}"
              @click="getCategory(category.title)">
              <i :class="category.icon"></i>
              {{ category.title }}
            </li>
          </ul>
          <form class="input-group mb-3" @submit.prevent="search">
            <input type="search" class="form-control" placeholder="search" v-model="searchText">
            <div class="input-group-append">
              <button class="input-group-text bg-light">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-10 col-md-9">
        <div class="mb-2 text-left text-muted" v-if="filterText">
          we found {{ filterProducts.length }} result for "{{ filterText }}"
        </div>

        <div class="card-columns">
          <div class="card text-primary product-card"
           v-for="product in filterProducts" :key="product.id">
            <div :style="{background: `url(${product.imageUrl}) center center no-repeat`,
            backgroundSize: 'cover', height:'200px'}">
            </div>
            <div class="favorite">
              <a class="text-danger" v-if="product.is_favorite"
               @click.prevent="removeFavorite(product, false)">
                <i class="fas fa-heart fa-lg"></i>
              </a>
              <a class="text-danger" v-else
               @click.prevent="addFavorite(product)">
                <i class="far fa-heart fa-lg"></i>
              </a>
            </div>
            <div class="card-body py-2">
              <h5 class="card-title mb-0">{{ product.title }}</h5>
              <div class="d-flex align-items-baseline">
                <p class="card-text text-secondary mb-0"
                  v-if="product.origin_price !== product.price">
                  <del> {{ product.origin_price | currency }} </del>
                </p>
                <p class="card-text ml-auto h5"
                  :class="{'text-danger': product.origin_price !== product.price}">
                  NT {{ product.price | currency }}
                </p>
              </div>
            </div>
            <div class="product-more">
              <router-link :to="`/productslist/${product.id}`">查看更多</router-link>
              <a href="#" @click.prevent="addToCart(product.id)">
                加到購物車
              </a>
            </div>
            <div class="product-soldout" v-if="!product.is_enabled">
              <button class="btn btn-danger border" disabled>Sold Out</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>-

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      select: '全部商品',
      filterText: '',
      searchText: '',
      categories: [
        { title: '全部商品', icon: 'fas fa-gift' },
        { title: '上半身', icon: 'fas fa-tshirt' },
        { title: '下半身', icon: 'fas fa-socks' },
        { title: '鞋', icon: 'fas fa-shoe-prints' },
        { title: '飾品', icon: 'fas fa-democrat' },
        { title: '配件', icon: 'fas fa-shopping-bag' },
      ],
    };
  },
  computed: {
    filterProducts() {
      const vm = this;
      if (vm.filterText) {
        vm.select = '全部商品';
        return vm.products.filter(item => item.title.indexOf(vm.filterText) !== -1);
      }
      if (vm.select !== '全部商品') {
        return vm.products.filter(item => item.category === vm.select);
      }
      return vm.products;
    },
    ...mapGetters('productsModules', ['products']),
  },
  methods: {
    addFavorite(product) {
      this.$store.dispatch('favoriteModules/addToFavorite', product);
    },
    removeFavorite(productItem, delall) {
      this.$store.dispatch('favoriteModules/removeFavorite', { favoriteItem: productItem, delall });
    },
    getParams() {
      if (this.$route.query.category) {
        this.select = this.$route.query.category;
      }
    },
    getCategory(category) {
      const vm = this;
      vm.select = category;
      if (vm.filterText) {
        vm.filterText = '';
      }
      if (this.$route.query.category) {
        vm.$router.push('/productslist');
      }
    },
    getProducts() {
      this.$store.dispatch('productsModules/getProducts', { isPagination: false });
    },
    addToCart(productId) {
      this.$store.dispatch('cartModules/addToCart', { id: productId, qty: 1 });
    },
    search() {
      const vm = this;
      vm.filterText = vm.searchText;
      vm.searchText = '';
    },
  },
  created() {
    this.getParams();
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/_custom.scss';

// category
.category {
  cursor: pointer;
}

// favorite
.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  a {
    cursor: pointer;
    font-size: 1rem;
  }
}

.product-more {
  display: flex;
  padding-top: 0.2rem;
  text-align: center;
  a {
    flex: 1;
    padding: 0.5rem 0;
    border-top: 1px solid $hot-color;
    &:first-child {
      border-right: 1px solid $hot-color;
    }
    &:hover {
      background: $hot-color;
    }
  }
}
.product-soldout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $font-family-title;
  background-color: rgba($secondary-color, .3);
}
@media (max-width: 991px) {
  .card-columns {
    column-count: 2;
  }
}
@media (max-width: 767px) {
  .card-columns {
    column-count: 1;
  }
}
</style>
