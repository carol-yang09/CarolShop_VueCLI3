<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <div class="table-responsive mt-4">
      <table class="table">
        <thead>
          <tr>
            <th class="d-md-table-cell d-none">分類</th>
            <th class="d-lg-table-cell d-none">縮圖</th>
            <th>名稱</th>
            <th class="d-lg-table-cell d-none">原價</th>
            <th class="d-sm-table-cell d-none">售價</th>
            <th class="d-lg-table-cell d-none">是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="d-md-table-cell d-none align-middle">{{ item.category }}</td>
            <td class="d-lg-table-cell d-none align-middle">
              <img :src="item.imageUrl" class="thumbnail">
            </td>
            <td class="align-middle nowrap">{{ item.title }}</td>
            <td class="d-lg-table-cell d-none align-middle">{{ item.origin_price | currency }}</td>
            <td class="d-sm-table-cell d-none align-middle">{{ item.price | currency }}</td>
            <td class="d-lg-table-cell d-none align-middle">
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm"
                @click="openDelProductModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @getPage="getProducts" v-if="pagination"/>

    <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
     aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="productModalLabel">新增產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                   v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">
                      或 上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files"
                   @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" id="title" class="form-control" placeholder="請輸入標題"
                   v-model="tempProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" id="category" class="form-control" placeholder="請輸入分類"
                       v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="unit">單位</label>
                      <input type="text" id="unit" class="form-control" placeholder="請輸入單位"
                       v-model="tempProduct.unit">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input type="text" id="origin_price" class="form-control" placeholder="請輸入原價"
                       v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="text" id="price" class="form-control" placeholder="請輸入售價"
                       v-model="tempProduct.price">
                    </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea id="description" class="form-control" placeholder="請輸入產品描述"
                   v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea id="content" class="form-control" placeholder="請輸入產品說明內容"
                   v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" id="is_enabled" class="form-check-input"
                    :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delProductModal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
     aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delProductModalLabel">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品 (刪除後將無法回復)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
    };
  },
  computed: {
    ...mapGetters(['pagination']),
    ...mapGetters('productsModules', ['products']),
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('productsModules/getProducts', { isPagination: true, page });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    openDelProductModal(item) {
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts();
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        vm.status.fileUploading = false;
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
  },
  components: {
    Pagination,
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.thumbnail {
  height: 80px;
  width: 80px;
}
.nowrap {
  white-space: nowrap;
}
</style>
