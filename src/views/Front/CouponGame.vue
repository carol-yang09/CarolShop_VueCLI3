<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active">
          CouponGame
        </li>
      </ol>
    </nav>

    <!-- coupon -->
    <div class="coupon py-3 mb-3 bg-light">
      <h2 class="mb-4 coupon-title">Coupon Game</h2>
      <div class="mb-4 coupon-turntable">
        <div class="coupon-turntable-bg" @click.prevent="getRandom()">
          <div class="coupon-turntable-arrow"></div>
        </div>
      </div>
    </div>

    <!-- couponModal -->
    <div class="modal fade p-0" id="couponModal" tabindex="-1" role="dialog"
     aria-labelledby="couponModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered d-flex justify-content-center" role="document">
        <div class="modal-bg"></div>
        <div class="modal-content bg-transparent border-0 text-center">
          <div class="modal-body" style="margin-top: 5rem">
            <div class="mb-md-5 pb-md-5 pb-4">
              <h3 class="mb-3">恭喜您獲得</h3>
              <h3 class="mb-3 model-text">{{ prize.name }}</h3>
              <h4><span class="badge badge-success px-5 py-2">{{ prize.coupon_code }}</span></h4>
            </div>
            <div class="text-center">
              <router-link class="btn btn-danger mr-5" to="/productslist"
               data-dismiss="modal">馬上購物去</router-link>
              <button class="btn btn-secondary" @click.prevent="resetBtn()"
               data-dismiss="modal">再轉一次</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import $ from 'jquery';
export default {
  data() {
    return {
      start: true,
      coupon: [
        {
          couponId: 1,
          name: '沒抽中也有獎，九五折優惠卷',
          coupon_code: 'carolshop95',
        },
        {
          couponId: 2,
          name: '九折優惠卷',
          coupon_code: 'carolshop9',
        },
        {
          couponId: 3,
          name: '八折優惠卷',
          coupon_code: 'carolshop8',
        },
        {
          couponId: 4,
          name: '五折優惠卷',
          coupon_code: 'carolshop5',
        },
        {
          couponId: 5,
          name: '最大獎：一折優惠卷',
          coupon_code: 'carolshop1',
        },
      ],
      deg: 0,
      prize: {
        name: '',
        coupon_code: '',
      },
    };
  },
  methods: {
    getRandom() {
      const vm = this;
      // 生成 0~8的隨機整數
      const n = Math.floor(Math.random() * 8);
      if (vm.start) {
        switch (n) {
          default:
            vm.roateTurntable(0, n);
            break;
          case 1:
            vm.roateTurntable(45, n);
            break;
          case 2:
            vm.roateTurntable(90, n);
            break;
          case 3:
            vm.roateTurntable(135, n);
            break;
          case 4:
            vm.roateTurntable(180, n);
            break;
          case 5:
            vm.roateTurntable(225, n);
            break;
          case 6:
            vm.roateTurntable(270, n);
            break;
          case 7:
            vm.roateTurntable(315, n);
            break;
        }
      } else {
        vm.resetBtn();
      }
    },
    roateTurntable(deg, n) {
      const vm = this;
      const d = Number(deg) + 1440;
      let prizeNum;
      $('.coupon-turntable-arrow').addClass('rotateStrat');
      $('.coupon-turntable-arrow').css('transform', `rotate(${d}deg)`);

      if (n === 7) {
        prizeNum = 1;
      } else if (n === 5) {
        prizeNum = 4;
      } else if (n === 3) {
        prizeNum = 3;
      } else if (n === 1) {
        prizeNum = 2;
      } else {
        prizeNum = 0;
      }
      vm.prize = vm.coupon[prizeNum];

      setTimeout(() => {
        $('#couponModal').modal('show');
      }, 5200);
      vm.start = false;
    },
    resetBtn() {
      const vm = this;
      vm.start = true;
      $('.coupon-turntable-arrow').removeClass('rotateStrat');
      $('.coupon-turntable-arrow').css('transform', 'rotate(0deg)');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_custom.scss';

// coupon
.coupon-title {
  font-family: $font-family-title;
  text-align: center;
  color: $white-color;
  font-size: 3.5rem;
  text-shadow: 0px 0px 3px $primary-color, 0px 0px 3px $primary-color, 0px 0px 3px $primary-color;
  @media (max-width: 767px) {
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
}
.coupon-turntable {
  position: relative;
}
.coupon-turntable-bg {
  width: 520px;
  height: 520px;
  margin: 0 auto;
  position: relative;
  background: url('../../../public/static/image/game-large.png') center center no-repeat;
  cursor: pointer;
  @media (max-width: 767px) {
    width: 260px;
    height: 260px;
    margin-bottom: 1rem;
    background: url('../../../public/static/image/game-small.png') center center no-repeat;
  }
}
.coupon-turntable-arrow {
  width: 270px;
  height: 115px;
  position: absolute;
  top: 203px;
  left: 203px;
  right: 0;
  background: url('../../../public/static/image/arrow-large.png') center center no-repeat;
  transform-origin: 57px 58px;
  cursor: pointer;
  @media (max-width: 767px) {
    width: 120px;
    height: 70px;
    top: 94px;
    left: 95px;
    background: url('../../../public/static/image/arrow-small.png') center center no-repeat;
    transform-origin: 34px 35px;
  }
}

// couponModel
.modal-bg {
  position: absolute;
  height: 512px;
  width: 512px;
  background: url('../../../public/static/image/envelope-big.png') center center no-repeat;
  @media (max-width: 767px) {
    width: 320px;
    height: 320px;
    background: url('../../../public/static/image/envelope-small.png') center center no-repeat;
  }
}
@media (max-width: 767px) {
  .model-text {
    font-size: 1.25rem;
  }
}
.rotateStrat {
  transition: transform 5s;
  transition-timing-function: cubic-bezier(0.1, 0.5, 0.2, 1);
}
</style>
