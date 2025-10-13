// ProductInfo.jsx

import React, { useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination, EffectFade, Controller]);

function ProductInfo() {

  const leftSwiperRef = useRef(null);
  const rightSwiperRef = useRef(null);

  const leftInstance = useRef(null);
  const rightInstance = useRef(null);
  const mobileInstance = useRef(null);

  const mobileBackgroundImages = [
    './img/product_bg_1_m.jpg',
    './img/product_bg_2_m.jpg',
    './img/product_bg_3_m.jpg',
    './img/product_bg_4_m.jpg',
  ];

  const updateMobileBackground = useCallback((index) => {
    const bgTarget = document.querySelector('.product-section');
    if (bgTarget && mobileBackgroundImages[index]) {
      bgTarget.style.backgroundImage = `url(${mobileBackgroundImages[index]})`;
      bgTarget.style.backgroundSize = 'cover';
      bgTarget.style.backgroundPosition = 'center';
      bgTarget.style.transition = 'background-image 0.6s ease';
    }
  }, []);

  const initDesktopSwipers = useCallback(() => {
    leftInstance.current = new Swiper(leftSwiperRef.current, {
      direction: 'horizontal',
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: false,
      on: {
        reachEnd: function () {
          this.slideTo(0, 800);
        },
      },
      slidesPerView: 1,
      spaceBetween: 0,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.product-section .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.product-section .swiper-button-next',
        prevEl: '.product-section .swiper-button-prev',
      },
    });

    leftInstance.current.on('slideChange', function () {
      const index = leftInstance.current.realIndex;
      rightInstance.current.slideTo(index);
    });

    rightInstance.current = new Swiper(rightSwiperRef.current, {
      direction: 'vertical',
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 800,
      allowTouchMove: false,
    });

    leftInstance.current.controller.control = rightInstance.current;
    rightInstance.current.controller.control = leftInstance.current;
  }, []);

  const initMobileSwiper = useCallback(() => {
    mobileInstance.current = new Swiper(rightSwiperRef.current, {
      direction: 'horizontal',
      speed: 600,
      slidesPerView: 1,
      pagination: {
        el: '.product-section .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.product-section .swiper-button-next',
        prevEl: '.product-section .swiper-button-prev',
      },
      on: {
        init: function () {
          updateMobileBackground(this.realIndex);
        },
        slideChange: function () {
          updateMobileBackground(this.realIndex);
        },
      },
    });
  }, [updateMobileBackground]);

  const destroyDesktopSwipers = () => {
    if (leftInstance.current) {
      leftInstance.current.destroy();
      leftInstance.current = null;
    }
    if (rightInstance.current) {
      rightInstance.current.destroy();
      rightInstance.current = null;
    }
  };

  const destroyMobileSwiper = () => {
    if (mobileInstance.current) {
      mobileInstance.current.destroy();
      mobileInstance.current = null;
    }
  };

  const handleResponsiveSwiper = useCallback(() => {
    const isMobile = window.innerWidth <= 700;

    if (isMobile) {
      destroyDesktopSwipers();
      if (!mobileInstance.current) {
        initMobileSwiper();
      }
    } else {
      destroyMobileSwiper();
      if (!leftInstance.current && !rightInstance.current) {
        initDesktopSwipers();
      }
      const bgTarget = document.querySelector('.product-section');
      if (bgTarget) {
        bgTarget.style.backgroundImage = '';
      }
    }
  }, [initDesktopSwipers, initMobileSwiper]);

  useEffect(() => {
    handleResponsiveSwiper();
    window.addEventListener('resize', handleResponsiveSwiper);
    return () => {
      window.removeEventListener('resize', handleResponsiveSwiper);
      destroyDesktopSwipers();
      destroyMobileSwiper();
    };
  }, [handleResponsiveSwiper]);

  return (
    <section className="product-info">
      <div className="container">
        <div className="product-section">
          {/* 왼쪽 이미지 슬라이드 */}
          <div className="swiper left-swiper" ref={leftSwiperRef}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src="./img/products/pd_bg/sajo_tuna_product_bg.png" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="./img/products/pd_bg/sajo_gim_product_bg.jpg" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="./img/products/pd_bg/sajo_royalcrab_product_bg.png" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="./img/products/pd_bg/sajo_mandoo_product_bg.jpg" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="./img/products/pd_bg/sajo_tunasasimi_product_bg.jpg" alt="" />
              </div>
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>

          {/* 오른쪽 텍스트 + 이미지 그리드 */}
          <div className="swiper right-swiper" ref={rightSwiperRef}>
            <div className="swiper-wrapper">

              {/* 이 아래는 슬라이드 1~5 반복 구조라 필요한 만큼 잘라 재사용 가능 */}
              {/* 예: 제품명, 설명, 이미지 등 JSON 데이터로 추출해서 map 돌릴 수도 있음 */}

              <div className="swiper-slide">
                <div className="prod-grid">
                  <div className="prod-text">
                    <strong>사조참치</strong>
                    <p>페이지에 대한 설명을 써주세요</p>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/sajotuna_can_product_1000002397_detail_078.png" alt="사조참치" />
                    <div className="prod-overlay">사조참치 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/bluetuna_can_product_1000002399_detail_054.png" alt="마일드참치" />
                    <div className="prod-overlay">마일드참치 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/redtuna_can_product_1000002400_detail_012.png" alt="고추참치" />
                    <div className="prod-overlay">고추참치 상세 설명</div>
                  </div>
                </div>
              </div>

              {/* 슬라이드 2~5 생략 없이 다 포함돼 있음. 필요하면 분할해서 컴포넌트화 가능 */}

              <div className="swiper-slide">
                <div className="prod-grid">
                  <div className="prod-text">
                    <strong>해표</strong>
                    <p>페이지에 대한 설명을 써주세요</p>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/basakdolgim_prod_thumb.png" alt="바삭돌김" />
                    <div className="prod-overlay">사조바삭돌김 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/chamgirumgim_prod_thumb.png" alt="참기름김" />
                    <div className="prod-overlay">참기름김 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/thegosohanparaegim_prod_thumb.png" alt="파래김" style={{ width: "100%" }} />
                    <div className="prod-overlay">파래김 상세 설명</div>
                  </div>
                </div>
              </div>

              {/* 슬라이드 3 */}
              <div className="swiper-slide">
                <div className="prod-grid">
                  <div className="prod-text">
                    <strong>대림선 맛살</strong>
                    <p>페이지에 대한 설명을 써주세요</p>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/crabia_prod_thumb.png"
                      alt="크라비아"
                      style={{ width: "90%" }}
                    />
                    <div className="prod-overlay">크라비아 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/royalcrab_prod_thumb.png"
                      alt="로얄크랩"
                      style={{ width: "95%" }}
                    />
                    <div className="prod-overlay">로얄크랩 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/oyangmatsal_prod_thumb.png"
                      alt="오양맛살"
                    />
                    <div className="prod-overlay">오양맛살 상세 설명</div>
                  </div>
                </div>
              </div>

              {/* 슬라이드 4 */}
              <div className="swiper-slide">
                <div className="prod-grid">
                  <div className="prod-text">
                    <strong>대림선 만두</strong>
                    <p>페이지에 대한 설명을 써주세요</p>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/gogisonmandu_prod_thumb.png"
                      alt="고기손만두"
                    />
                    <div className="prod-overlay">고기손만두 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/gimchisonmandu_prod_thumb.png"
                      alt="김치손만두"
                    />
                    <div className="prod-overlay">김치손만두 상세 설명</div>
                  </div>
                  <div className="prod-img">
                    <img
                      src="./img/products/grid_visual/gogiwanggyoja_prod_thumb.png"
                      alt="고기왕교자"
                    />
                    <div className="prod-overlay">고기왕교자 상세 설명</div>
                  </div>
                </div>
              </div>
              {/* <!-- 슬라이드 5 --> */}
              <div className="swiper-slide">
                <div className="prod-grid">
                  <div className="prod-text">
                    <strong>사조회참치</strong>
                    <p>페이지에 대한 설명을 써주세요</p>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/sajotunasasimi_detail01.jpg" alt="눈다랑어 속살스테이크" />
                    <div className="prod-overlay">
                      <strong className="prod-name">눈다랑어 속살스테이크</strong>
                      <p className="prod-desc">
                        다랑어 중 눈이 유난히 큰 눈다랑어의 속살은<br />
                        마블링이 없어 부드러운 식감에 지방질이 적어<br />
                        담백한 풍미가 가득 담겨있는 부위
                      </p>
                    </div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/sajotunasasimi_detail02.jpg" alt="눈다랑어 대뱃살" />
                    <div className="prod-overlay">
                      <strong className="prod-name">눈다랑어 대뱃살</strong>
                      <p className="prod-desc">
                        다랑어 중 눈이 유난히 큰 눈다랑어의 뱃살은<br />
                        탐스러운 선홍빛을 띄며 하얀 마블링도 풍부해<br />
                        쫄깃한 식감과 고소함이 가득한 가성비가 뛰어난 부위
                      </p>
                    </div>
                  </div>
                  <div className="prod-img">
                    <img src="./img/products/grid_visual/sajotunasasimi-detail03.jpg" alt="참다랑어 배꼽살" />
                    <div className="prod-overlay">
                      <strong className="prod-name">참다랑어 배꼽살</strong>
                      <p className="prod-desc">
                        배꼽 모양과 닮아 배꼽살이라 부르며<br />
                        풍부한 마블링으로 고소하고<br />
                        오독오독 씹히는 식감이 일품인 고급부위
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 모바일 전용 내비게이션 */}
            <div className="mobile-swiper-controls">
              <div className="swiper-button-prev mobile-button-prev"></div>
              <div className="swiper-button-next mobile-button-next"></div>
              <div className="swiper-pagination mobile-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
