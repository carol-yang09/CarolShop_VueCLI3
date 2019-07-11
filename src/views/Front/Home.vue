<template>
  <div>
    <BannerSider/>

    <!-- category -->
    <ul class="row m-0 mb-4 category">
      <li class="col-lg-2 col-md-4 col-6" v-for="(category, key) in categories" :key="key"
       @click.prevent="categoryBtn(category.title)">
        <i :class="category.icon"></i>
        <ul class="ml-3">
          <li>{{category.name}}</li>
          <li>{{category.title}}</li>
        </ul>
      </li>
    </ul>

    <!-- discount -->
    <div class="bg-light discount">
      <div class="mr-2">
        <h5>限量 Coupon 大放送</h5>
        <small class="text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          A, aliquid cumque iusto necessitatibus quasi tempora.
        </small>
      </div>
      <router-link to="/coupongame" class="btn btn-primary"> 立即領取 </router-link>
    </div>

    <CardSider/>

    <!-- news -->
    <div class="row news">
      <div class="col-md-6">
        <div class="mb-4 news-img news-img-1">
          <h3 class="mb-3">MODEL</h3>
          <h3>I'm Sophia</h3>
        </div>
        <div class="mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">Hot Sale</h3>
            <p>Popular Products</p>
            <router-link to="/productslist" class="btn btn-primary"> Go Shop </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6 news-reverse">
        <div class=" mb-4 news-content">
          <div class="news-border">
            <h3 class="mb-3">New Arrival</h3>
            <p>Summer Clothing</p>
            <router-link to="/productslist" class="btn btn-primary"> Shop Now </router-link>
          </div>
        </div>
        <div class="mb-4 news-img news-img-2">
          <h3 class="mb-3">MODEL</h3>
          <h3>I'm Jessica</h3>
        </div>
      </div>
    </div>

    <!-- joinus -->
    <div class="mb-4 joinus">
      <div class="joinus-content">
        <h3 class="mb-4">Join our mailing list for updates</h3>
        <input type="email" name="email" class="form-control" placeholder="Enter your email*"
         :class="{'is-invalid': errors.first('email')}" v-validate="'required|email'">
        <span class="text-danger" v-if="errors.first('email')">
          {{ errors.first('email') }}
        </span>
        <button type="button" class="form-control btn btn-primary mt-3"
         @click="joinusBtn">Subscribe Now</button>
      </div>
    </div>

  </div>
</template>

<script>
import BannerSider from '@/components/BannerSider.vue';
import CardSider from '@/components/CardSider.vue';

export default {
  data() {
    return {
      categories: [
        { name: 'ALL', title: '全部商品', icon: 'fas fa-gift fa-2x' },
        { name: 'TOP', title: '上半身', icon: 'fas fa-tshirt fa-2x' },
        { name: 'BOTTOM', title: '下半身', icon: 'fas fa-socks fa-2x' },
        { name: 'SHOES', title: '鞋', icon: 'fas fa-shoe-prints fa-2x' },
        { name: 'ACCESSORY', title: '飾品', icon: 'fas fa-democrat fa-2x' },
        { name: 'LIFE', title: '配件', icon: 'fas fa-shopping-bag fa-2x' },
      ],
    };
  },
  methods: {
    categoryBtn(categoryTitle) {
      const vm = this;
      vm.$router.push({ path: '/productslist', query: { category: categoryTitle } });
    },
    joinusBtn() {
      const vm = this;
      vm.$validator.validate().then((result) => {
        if (!result) {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: '請輸入正確EMAIL格式', status: 'danger' });
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: '訂閱成功', status: 'success' });
        }
      });
    },
  },
  components: {
    BannerSider,
    CardSider,
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';

//category
.category {
  >li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    transition: all 0.15s ease;
    cursor: pointer;
    text-align: center;
    color: $secondary-color;
    white-space:nowrap;
    &:hover, &:active {
      background-color: $hot-color;
      color: $primary-color;
    }
  }
  >li:not(:last-child) {
    border-right: $hot-color solid 1px;
    @media(max-width: 992px) {
      border: none;
    }
  }
}

// discount
.discount {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  @media (max-width:569px) {
    flex-direction: column;
    text-align: center;
    > div {
      margin-bottom: 1rem;
    }
  }
  .btn {
    width: 20%;
    @media (max-width:569px) {
      width: 100%;
    }
  }
}

//news
.news {
  text-align: center;
  h3 {
    font-family: $font-family-title;
  }
  p {
    font-family: $font-family-text;
  }
}
.news-img {
  padding: 10rem 0;
  color: $white-color;
  text-shadow: 1px 1px 1px $primary-color;
  @media (max-width: 414px) {
    padding: 5rem 0;
  }
}
.news-img-1 {
  background: url('../../assets/image/news-1.jpg') bottom center no-repeat;
  background-size: cover;
}
.news-img-2 {
  background: url('../../assets/image/news-2.jpg') center center no-repeat;
  background-size: cover;
}
.news-content {
  padding: 2rem;
  background-color: $hot-color;
}
.news-border {
  padding: 2.5rem 0;
  border: 2.5px $white-color solid;
}
@media (max-width: 767px) {
  .news-reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}

//joinus
.joinus {
  padding: 5rem;
  background: url('https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  text-align: center;
  @media (max-width: 767px) {
    padding: 5rem 1rem;
  }
  h3 {
    font-family: $font-family-title;
    color: $white-color;
    text-shadow: 1px 1px 1px $primary-color;
  }
}
.joinus-content {
  padding: 3rem 2rem;
  background: rgba($hot-color, 0.8);
  border-radius: 10px;
}
</style>
