<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/productslist">產品列表</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{path: '/productsList', query: {category: product.category}}"
           class="text-primary">{{ product.category }}</router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-4 mb-3">
        <div class="sticky-top clearfix" style="top: 10px">
          <h1 class="h3"> {{ product.title }} </h1>
          <div class="d-flex align-items-baseline" v-if="product.origin_price !== product.price">
            <del class="text-muted">售價：{{ product.origin_price | currency }}</del>
            <div class="ml-auto mb-0 h5 text-danger">
              <small>特價：</small>
              <strong>{{ product.price | currency }}</strong>
            </div>
          </div>
          <div class="d-flex align-items-baseline" v-if="product.origin_price == product.price">
            <div class="ml-auto mb-0 h5">
              <small>售價：</small>
              <strong>{{ product.price | currency }}</strong>
            </div>
          </div>
          <hr>
          <ul class="product-summary">
            <li>
              <button type="button" class="btn btn-link p-0"
               data-toggle="modal" data-target="#sizeModalCenter">
                <i class="fas fa-ruler-horizontal"></i> 尺寸
              </button>
            </li>
            <li>
              <button type="button" class="btn btn-link p-0"
               data-toggle="modal" data-target="#tryonModalCenter">
                <i class="fas fa-tshirt"></i> 試穿報告
              </button>
            </li>
            <li>
              <a href="#" class="btn btn-link p-0" :class="{'d-none': isFavorite}"
               @click.prevent="addFavorite(product)">
                <i class="fas fa-heart"></i> 收藏商品
              </a>
              <a href="#" class="btn btn-link p-0" :class="{'d-none': !isFavorite}"
               @click.prevent="removeFavorite(product, false)">
                <i class="fas fa-heart-broken"></i> 取消收藏
              </a>
            </li>
          </ul>
          <hr>

          <div class="input-group addcart">
            <select class="form-control" v-model="qty">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 15" :key="num">
                {{ num }} {{ product.unit }}
              </option>
            </select>
            <button class="btn btn-primary" @click.prevent="addToCart(qty)">
              <i class="fas fa-plus"></i>
              加入購物車
            </button>
          </div>

          <router-link to="/coupongame" class="badge badge-warning float-right">
            折價卷適用
          </router-link>
        </div>
      </div>
      <div class="col-md-8 product-content">
        <img class="img-fluid" :src="product.imageUrl">
        <h3>商品介紹</h3>
        <p>{{ product.description }}</p>
        <img class="img-fluid" src="../../assets/image/product-1.jpg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur doloribus, laudantium hic perferendis necessitatibus dolorem ipsam
        </p>
        <img class="img-fluid" src="../../assets/image/product-2.jpg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam rem sed vitae facilis modi maxime veniam similique eveniet.
        </p>
      </div>
    </div>

    <!-- sizeModal -->
    <div class="modal fade" id="sizeModalCenter" tabindex="-1" role="dialog"
     aria-labelledby="sizeModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header pb-0 border-0">
            <button type="button" class="close p-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0 text-center">
            <h5 class="mb-4">產品尺寸</h5>
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="table-responsive">
                  <div class="table d-table">
                    <thead>
                      <tr>
                        <th>尺碼</th>
                        <th>胸寬</th>
                        <th>腰寬</th>
                        <th>全長</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>S</th>
                        <td>40.5</td>
                        <td>43</td>
                        <td>54</td>
                      </tr>
                      <tr>
                        <th>M</th>
                        <td>42.5</td>
                        <td>45.5</td>
                        <td>55.5</td>
                      </tr>
                      <tr>
                        <th>L</th>
                        <td>45</td>
                        <td>48</td>
                        <td>57</td>
                      </tr>
                    </tbody>
                  </div>
                </div>
                <p>*單位：cm</p>
              </div>
              <div class="col-lg-6 col-12">
                <img src="../../assets/image/size.jpg" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- tryonModal -->
    <div class="modal fade" id="tryonModalCenter" tabindex="-1" role="dialog"
     aria-labelledby="tryonModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header pb-0 border-0">
            <button type="button" class="close p-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0 text-center">
            <h5 class="mb-4">試穿報告</h5>
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="table-responsive">
                  <div class="table d-table">
                    <thead>
                      <tr>
                        <th>試穿人員</th>
                        <th>身高(cm)</th>
                        <th>體重(kg)</th>
                        <th>適合尺碼</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Model</th>
                        <td>165</td>
                        <td>45</td>
                        <td>S</td>
                      </tr>
                      <tr>
                        <th>A</th>
                        <td>151</td>
                        <td>45</td>
                        <td>S</td>
                      </tr>
                      <tr>
                        <th>B</th>
                        <td>155</td>
                        <td>50</td>
                        <td>M</td>
                      </tr>
                      <tr>
                        <th>C</th>
                        <td>160</td>
                        <td>70</td>
                        <td>XL</td>
                      </tr>
                      <tr>
                        <th>D</th>
                        <td>165</td>
                        <td>50</td>
                        <td>M</td>
                      </tr>
                      <tr>
                        <th>E</th>
                        <td>170</td>
                        <td>55</td>
                        <td>L</td>
                      </tr>
                    </tbody>
                  </div>
                </div>
                <p>*個人比例條件不同，僅供參考</p>
              </div>
              <div class="col-lg-6 col-12">
                <img src="../../assets/image/tryon.jpg" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      productId: '',
      product: [],
      qty: 0,
      isFavorite: false,
    };
  },
  computed: {
    ...mapGetters('favoriteModules', ['favorites']),
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          // 若已在 vm.favorites 中則 vm.isFavorite = true
          vm.favorites.forEach((item) => {
            if (vm.product.id === item.id) {
              vm.isFavorite = true;
            }
          });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: '找不到此商品', status: 'danger' });
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addToCart(qty) {
      if (qty === 0) {
        this.$store.dispatch('alertMessageModules/updateMessage', { message: '請選擇數量', status: 'danger' });
      } else {
        this.$store.dispatch('cartModules/addToCart', { id: this.productId, qty });
      }
    },
    addFavorite(product) {
      this.$store.dispatch('favoriteModules/addToFavorite', product);
      this.isFavorite = true;
    },
    removeFavorite(productItem, delall) {
      this.$store.dispatch('favoriteModules/removeFavorite', { favoriteItem: productItem, delall });
      this.isFavorite = false;
    },
  },
  watch: {
    // 監聽 Layout.vue 我的最愛選單 當路由改變，頁面重新渲染
    $route() {
      this.productId = this.$route.params.productId;
      this.getProduct();
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_custom.scss';

.product-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1rem;
  @media (max-width: 991px) {
    flex-direction: column;
    li {
      padding: 0.5rem;
    }
  }
  @media (max-width: 767px) {
    flex-direction: row;
    li {
      padding: 0rem;
    }
  }
}
.addcart {
  display: flex;
  margin-bottom: 0.5rem;
  button {
    margin-left: 0.5rem;
  }
  @media (max-width: 991px) {
    display: block;
    select {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    button {
      width: 100%;
      margin-left: 0;
    }
  }
  @media (max-width: 767px) {
    display: flex;
    select {
      width: auto;
      margin-bottom: 0;
    }
    button {
      width: auto;
      margin-left: 0.5rem;
    }
  }
}
.product-content {
  text-align: center;
  img, p {
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.25rem;
  }
}
</style>
