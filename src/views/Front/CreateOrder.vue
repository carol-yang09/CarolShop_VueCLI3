<template>
  <div>
    <ul class="mb-4 step">
      <li class="bg-light" :class="{'bg-dark text-light active': step === 1}">
        <strong>STEP</strong>
        <h3><strong>01</strong></h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 2}">
        <strong>STEP</strong>
        <h3><strong>02</strong></h3>
        <p class="h6">填寫訂購資料</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 3}">
        <strong>STEP</strong>
        <h3><strong>03</strong></h3>
        <p class="h6">付款/完成訂單</p>
      </li>
    </ul>
    <!-- step1：確認購物清單 -->
    <div class="table-responsive" v-if="step === 1">
      <table class="table mb-4">
        <thead>
          <tr>
            <th class="d-md-table-cell d-none text-center" width="20%">縮圖</th>
            <th class="text-center">商品名稱</th>
            <th class="d-sm-table-cell d-none text-center" width="20%">數量</th>
            <th class="text-center" width="15%">價格</th>
            <th class="text-center" width="15%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td class="d-md-table-cell d-none text-center">
              <div class="thumbnail"
               :style="{backgroundImage:`url(${cart.product.imageUrl})`}"></div>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success mt-2" v-if="cart.coupon">
                已套用折價卷 - [{{ cart.coupon.code }}]
              </div>
            </td>
            <td class="d-sm-table-cell d-none text-center">
              {{ cart.qty }} / {{ cart.product.unit }}
            </td>
            <td class="text-right">
              <div v-if="!cart.coupon">
                {{ cart.total | currency }}
              </div>
              <div v-else>
                <del>{{ cart.total | currency }}</del>
                <div class="text-success mt-2">
                  {{ cart.final_total | currency }}
                </div>
              </div>
            </td>
            <td class="text-center">
              <a href="#" class="text-danger" @click.prevent="removeCartItem(cart.id)">
                <i class="fas fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-light table-borderless border-top">
          <tr>
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td class="text-right">
              共 {{ cartsLength }} 件
            </td>
            <td class="text-right">
              運費
            </td>
            <td class="text-right">
              $0
            </td>
          </tr>
          <tr>
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">
              總計
            </td>
            <td class="text-right">
              {{ carts.total | currency }}
            </td>
          </tr>
          <tr class="text-success" v-if="carts.total !== carts.final_total">
            <td class="d-md-table-cell d-none"></td>
            <td class="d-sm-table-cell d-none"></td>
            <td colspan="2" class="text-right">
              折扣後金額
            </td>
            <td class="text-right">
              {{ carts.final_total | currency }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-4">
        <input type="text" class="form-control" placeholder="請輸入折價卷代碼" v-model="couponCode">
        <div class="input-group-append" @click.prevent="addCouponCode">
          <button class="btn btn-success" type="button">套用折價卷</button>
        </div>
      </div>
      <div class="mb-4 stepBtn">
        <router-link to="/productslist" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i>
          繼續購買
        </router-link>
        <a href="#" class="btn btn-danger d-inline-block" @click.prevent="step = 2">
          下一步，填寫訂購資料
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>

    <!-- step2：填寫訂購資料 -->
    <div v-if="step === 2" class="mb-4">
      <div id="accordion">
        <div class="card mb-4">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse"
               data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                購物車清單 <i class="fas fa-caret-down"></i>
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse"
           aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <td>商品</td>
                    <td width="25%">數量</td>
                    <td width="15%">價格</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts.carts" :key="cart.id">
                    <td>{{ cart.product.title }}</td>
                    <td>{{ cart.qty }} / {{ cart.product.unit }}</td>
                    <td class="text-right">{{ cart.final_total | currency }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>總計</td>
                    <td class="text-right">{{carts.final_total | currency}}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5 class="text-center">訂購資料</h5>
        <form @submit.prevent="createOrder">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control"
             :class="{'is-invalid': errors.first('email')}" v-validate="'required|email'"
             placeholder="請輸入 Email" v-model="form.user.email">
            <span class="text-danger" v-if="errors.first('email')">
              {{ errors.first('email') }}
            </span>
          </div>
          <div class="form-group">
            <label for="name">收件人姓名</label>
            <input type="text" name="name" id="name" class="form-control"
             :class="{'is-invalid': errors.has('name')}" v-validate="'required'"
             placeholder="請輸入收件人姓名" v-model="form.user.name">
            <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
          </div>
          <div class="form-group">
            <label for="tel">收件人電話</label>
            <input type="tel" name="tel" id="tel" class="form-control"
             :class="{'is-invalid': errors.has('tel')}" v-validate="'required'"
             placeholder="請輸入收寄人電話" v-model="form.user.tel">
            <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
          </div>
          <div class="form-group">
            <label for="address">收件人地址</label>
            <input type="text" name="address" id="address" class="form-control"
             :class="{'is-invalid': errors.has('address')}" v-validate="'required'"
             placeholder="請輸入收件人地址" v-model="form.user.address">
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>
          <div class="form-group mb-4">
            <label for="message">留言</label>
            <textarea name="message" id="message" class="form-control"
             cols="20" rows="5" v-model="form.message"></textarea>
          </div>
          <div class="stepBtn">
            <a href="#" class="btn btn-success" @click.prevent="step = 1">
              <i class="fas fa-arrow-left"></i>
              回上一步
            </a>
            <button class="btn btn-danger float-right">
              確認訂購 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- step3：付款/完成訂單 -->
    <div v-if="step === 3" class="mb-4">
      <form @submit.prevent="payOrder">
        <table class="table mb-3">
          <thead>
            <tr>
              <th>商品</th>
              <th width="25%">數量</th>
              <th width="15%">價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orderItem in order.products" :key="orderItem.id">
              <td>{{ orderItem.product.title }}</td>
              <td>{{ orderItem.qty }} / {{ orderItem.product.unit }}</td>
              <td class="text-right">{{ orderItem.total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-success">
              <td></td>
              <td>總計</td>
              <td class="text-right">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table mb-3">
          <tr>
            <th width="150">訂購人Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>訂購人姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>訂購人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>留言</th>
            <td>{{ order.user.message }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td v-if="!order.is_paid">尚未付款</td>
            <td class="text-success" v-else>付款成功</td>
          </tr>
        </table>
        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      step: 1,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderId: '',
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
      },
    };
  },
  computed: {
    ...mapGetters('cartModules', ['carts', 'cartsLength']),
  },
  methods: {
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id);
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponCode,
      };
      vm.$http.post(url, { data: coupon }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch('cartModules/getCart');
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$validator.validate().then((result) => {
        if (!result) {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: '欄位不完整', status: 'danger' });
        } else {
          vm.$http.post(url, { data: order }).then((response) => {
            vm.orderId = response.data.orderId;
            vm.getOrder();
            vm.step = 3;
          });
        }
      });
    },
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(url).then((response) => {
        vm.order = response.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
          vm.getOrder();
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    ...mapActions('cartModules', ['getCart']),
  },
  created() {
    this.$store.dispatch('cartModules/getCart');
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';

.step {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
  li {
    padding: 0.25rem 3rem;
    @media (max-width:767px) {
      display: none;
    }
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
  }
  @media (max-width:767px) {
    .active {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
.thumbnail {
  margin: auto;
  background-size: cover;
  width: 80px;
  height: 80px;
}
.stepBtn {
  display: flex;
  justify-content: space-between;
  @media (max-width: 414px) {
    flex-direction: column;
    a:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
