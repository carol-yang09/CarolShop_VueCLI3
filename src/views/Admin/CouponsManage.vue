<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠卷
      </button>
    </div>
    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>名稱</th>
            <th class="d-sm-table-cell d-none">折扣百分比</th>
            <th class="d-sm-table-cell d-none">到期日</th>
            <th class="d-sm-table-cell d-none">是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td> {{ item.title }} </td>
            <td class="d-sm-table-cell d-none"> {{ item.percent }} % </td>
            <td class="d-sm-table-cell d-none"> {{ item.due_date | date }} </td>
            <td class="d-sm-table-cell d-none">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span class="text-muted" v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm"
                 @click="openCouponModal(false, item)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @getPage="getCoupons"/>

      <!-- couponModal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
     aria-labelledby="couponModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModalLabel">折價卷</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" id="title" class="form-control" placeholder="請輸入標題"
               v-model="tempCoupon.title">
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" id="code" class="form-control" placeholder="請輸入優惠碼"
               v-model="tempCoupon.code">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" id="due_date" class="form-control" placeholder="請輸入到期日"
               v-model="due_date">
            </div>
            <div class="form-group">
              <label for="percent">打折百分比</label>
              <input type="number" id="percent" class="form-control" placeholder="請輸入打折百分比"
               v-model="tempCoupon.percent">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="is_enabled"
                  :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠卷</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delCouponModal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
     aria-labelledby="delCouponModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delCouponModalLabel">刪除折價卷</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 折價卷 (刪除後將無法回復)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      due_date: new Date(),
      isNew: false,
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    openCouponModal(isNew, item) {
      const vm = this;
      vm.isNew = isNew;
      $('#couponModal').modal('show');
      if (vm.isNew) {
        vm.tempCoupon = {};
        vm.due_date = 0;
      } else {
        vm.tempCoupon = Object.assign({}, item);
        const dateTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        // vm.due_date = dateTime[0];
        [vm.date] = dateTime;
      }
    },
    updateCoupon() {
      const vm = this;
      if (vm.isNew) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        vm.$http.post(url, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            this.getCoupons();
            vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
          }
        });
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
        vm.$http.put(url, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            this.getCoupons();
            vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
          }
        });
      }
    },
    openDelCouponModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },
    delCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          this.getCoupons();
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}
</style>
