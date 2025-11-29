// 정리된 JavaScript 코드 - script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ====== 슬라이드 기능 ======
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;
    const totalSlides = 4;
    
    const slideContainer = document.querySelector('.slide_container');
    const indicators = document.querySelectorAll('.indicator');
    const playPauseBtn = document.querySelector('.play_pause_btn');
    const textWrap = document.querySelector('.text_wrap');
    
    // 슬라이드 텍스트 데이터
    const slideTexts = [
        {
            subtitle: "Co-living House",
            title: "따로, 그리고 같이<br>생활하는 즐거움의 여행"
        },
        {
            subtitle: "Premium Space", 
            title: "나만의 공간에서<br>시작되는 새로운 일상"
        },
        {
            subtitle: "Community Life",
            title: "함께해서 더 특별한<br>매일매일의 순간들"
        },
        {
            subtitle: "Modern Living",
            title: "편안함과 자유로움이<br>공존하는 라이프스타일"
        }
    ];
    
    // 슬라이드 이동
    function goToSlide(slideIndex) {
        if (!slideContainer) return;
        
        currentSlide = slideIndex;
        slideContainer.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // 인디케이터 업데이트
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // 텍스트 변경
        if (textWrap) {
            textWrap.classList.add('fade-out');
            setTimeout(() => {
                const subtitle = document.querySelector('.subtitle');
                const mainTitle = document.querySelector('.main_title');
                
                if (subtitle) subtitle.innerHTML = slideTexts[currentSlide].subtitle;
                if (mainTitle) mainTitle.innerHTML = slideTexts[currentSlide].title;
                
                textWrap.classList.remove('fade-out');
            }, 200);
        }
    }
    
    // 다음 슬라이드
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }
    
    // 자동 슬라이드 시작/정지
    function toggleSlideShow() {
        if (isPlaying) {
            clearInterval(slideInterval);
            isPlaying = false;
            if (playPauseBtn) {
                playPauseBtn.className = 'play_pause_btn play';
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                const playIcon = playPauseBtn.querySelector('.play-icon');
                if (pauseIcon) pauseIcon.style.display = 'none';
                if (playIcon) playIcon.style.display = 'block';
            }
        } else {
            slideInterval = setInterval(nextSlide, 4000);
            isPlaying = true;
            if (playPauseBtn) {
                playPauseBtn.className = 'play_pause_btn pause';
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                const playIcon = playPauseBtn.querySelector('.play-icon');
                if (pauseIcon) pauseIcon.style.display = 'block';
                if (playIcon) playIcon.style.display = 'none';
            }
        }
    }
    
    // 슬라이드 이벤트 등록
    if (slideContainer) {
        // 인디케이터 클릭
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // 재생/정지 버튼
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', toggleSlideShow);
        }
        
        // 자동 슬라이드 시작
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    // ====== 네비게이션 스크롤 ======
    document.querySelectorAll('[data-section]').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ====== 섹션5 서비스 네비게이션 ======
    let currentService = 'workspace';
    
    function switchService(serviceName) {
        if (currentService === serviceName) return;
        
        // 네비게이션 업데이트
        document.querySelectorAll('.nav_item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNavItem = document.querySelector(`[data-service="${serviceName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // 콘텐츠 업데이트
        document.querySelectorAll('#section5 .content_item').forEach(item => {
            item.classList.remove('active');
        });
        const activeContent = document.querySelector(`[data-content="${serviceName}"]`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        currentService = serviceName;
    }
    
    // 서비스 네비게이션 클릭 이벤트
    document.querySelectorAll('.nav_item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = item.getAttribute('data-service');
            
            if (window.innerWidth <= 820) {
                // 모바일에서는 직접 전환
                switchService(serviceName);
            } else {
                // 데스크톱에서는 스크롤
                const triggerElement = document.querySelector(`[data-trigger="${serviceName}"]`);
                if (triggerElement) {
                    triggerElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // 데스크톱용 스크롤 기반 서비스 전환
    if (window.innerWidth > 820) {
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const serviceName = entry.target.getAttribute('data-trigger');
                    if (serviceName) {
                        switchService(serviceName);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        document.querySelectorAll('.service-trigger').forEach(trigger => {
            serviceObserver.observe(trigger);
        });
    }
    
    // ====== 통합 섹션 애니메이션 ======
    function createSectionObserver(sectionId, itemSelector, delay = 150) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const items = entry.target.querySelectorAll(itemSelector);
                
                if (entry.isIntersecting) {
                    items.forEach(item => item.classList.remove('visible'));
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * delay);
                    });
                } else {
                    items.forEach(item => item.classList.remove('visible'));
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -20% 0px'
        });
        
        observer.observe(section);
    }
    
    // 각 섹션 애니메이션 등록
    createSectionObserver('section2', '.content_item', 150);
    createSectionObserver('section3', '.content_item', 150);
    createSectionObserver('section4', '.room_type', 300);
    createSectionObserver('section6', '.process_item', 200);
    
    // ====== 햄버거 메뉴 ======
    const hamburger = document.getElementById('hamburger');
    const gnb = document.querySelector('.gnb');
    
    if (hamburger && gnb) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            gnb.classList.toggle('active');
            
            // 스크롤 제어
            if (gnb.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 메뉴 아이템 클릭시 닫기
        document.querySelectorAll('.gnb li:not(.language_selector)').forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 820) {
                    gnb.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // 외부 클릭시 닫기
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 820) {
                if (!gnb.contains(e.target) && !hamburger.contains(e.target) && gnb.classList.contains('active')) {
                    gnb.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
// 언어 드롭다운
const langSelector = document.querySelector('.language_selector');
const dropdown = document.querySelector('.language_dropdown');
const arrow = document.querySelector('.lang-arrow');
const currentLangText = document.getElementById('current-lang');

if (langSelector && dropdown) {
    let hoverTimeout;
    
    function isMobile() {
        return window.innerWidth <= 820;
    }
    
    function toggleDropdown() {
        dropdown.classList.toggle('show');
        if (arrow) {
            arrow.style.transform = dropdown.classList.contains('show') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    }
    
    function showDropdown() {
        clearTimeout(hoverTimeout);
        dropdown.classList.add('show');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
    
    function hideDropdown() {
        hoverTimeout = setTimeout(() => {
            dropdown.classList.remove('show');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        }, 200);
    }
    
    // 이벤트 리스너 등록
    langSelector.addEventListener('mouseenter', function() {
        if (!isMobile()) {
            showDropdown();
        }
    });
    
    langSelector.addEventListener('mouseleave', function() {
        if (!isMobile()) {
            hideDropdown();
        }
    });
    
    langSelector.addEventListener('click', function(e) {
        if (isMobile()) {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown();
        }
    });
    
    // 외부 클릭시 닫기 (모바일만)
    document.addEventListener('click', function(e) {
        if (isMobile() && !langSelector.contains(e.target)) {
            dropdown.classList.remove('show');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        }
    });
    
    // 언어 옵션 클릭
    document.querySelectorAll('.language_option').forEach(option => {
        option.addEventListener('click', function() {
            const langCode = this.getAttribute('data-lang');
            const langLabels = {
                'kr': 'KR',
                'en': 'EN',
                'jp': 'JP', 
                'cn': 'CN'
            };
            
            if (currentLangText) {
                currentLangText.textContent = langLabels[langCode];
            }
            dropdown.classList.remove('show');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    });
    
    // 리사이즈시 드롭다운 초기화
    window.addEventListener('resize', function() {
        dropdown.classList.remove('show');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        clearTimeout(hoverTimeout);
    });
}
    
});

 document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const firstSection = document.querySelector('#section1'); // 메인 섹션 ID
    let lastScrollY = window.scrollY || window.pageYOffset;
    const HIDE_START_Y = 150; // 이 정도 스크롤 내려간 이후부터만 숨김 동작

    /* ===== 1) 메인 섹션 기준으로 색/배경 바꾸기 (이전 로직 유지) ===== */
    if (firstSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // 메인 섹션이 화면에 보일 때 → 그라데이션
              header.classList.remove('scrolled');
            } else {
              // 메인 섹션 거의 안 보일 때 → 흰색 헤더
              header.classList.add('scrolled');
            }
          });
        },
        {
          threshold: 0.3
        }
      );

      observer.observe(firstSection);
    } else {
      // fallback: 단순 높이 기준
      const heroHeight = firstSection ? firstSection.offsetHeight : 200;

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > heroHeight - 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    /* ===== 2) 스크롤 방향에 따라 헤더 숨기기 / 다시 보이기 ===== */
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY || window.pageYOffset;

      // 맨 위 근처에서는 무조건 헤더 보이게
      if (currentY < 10) {
        header.classList.remove('header-hidden');
        lastScrollY = currentY;
        return;
      }

      // 아래로 스크롤 중 + 어느 정도 내려온 상태면 헤더 숨김
      if (currentY > lastScrollY && currentY > HIDE_START_Y) {
        header.classList.add('header-hidden');
      } else if (currentY < lastScrollY) {
        // 위로 스크롤 중이면 다시 보여주기
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentY;
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector(".nav");

  nav.addEventListener("mouseenter", () => {
    // 메인일 때만 hover-white 적용
    if (!header.classList.contains("scrolled")) {
      header.classList.add("hover-white");
    }
  });

  nav.addEventListener("mouseleave", () => {
    header.classList.remove("hover-white");
  });
});