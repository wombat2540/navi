// 전체 JavaScript 코드 - script.js

document.addEventListener('DOMContentLoaded', function() {

    
    
    // ====== 섹션1 슬라이드 기능 ======
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
    
    // 슬라이드 이동 함수
    function goToSlide(slideIndex) {
        if (!slideContainer) return;
        
        currentSlide = slideIndex;
        slideContainer.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // 인디케이터 업데이트
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // 텍스트 변경 애니메이션
        if (textWrap) {
            textWrap.classList.add('fade-out');
            
            setTimeout(() => {
                const subtitle = document.querySelector('.subtitle');
                const mainTitle = document.querySelector('.main_title');
                
                if (subtitle) subtitle.innerHTML = slideTexts[currentSlide].subtitle;
                if (mainTitle) mainTitle.innerHTML = slideTexts[currentSlide].title;
                
                textWrap.classList.remove('fade-out');
                textWrap.classList.add('fade-in');
                
                setTimeout(() => {
                    textWrap.classList.remove('fade-in');
                }, 400);
            }, 200);
        }
    }
    
    // 다음 슬라이드 함수
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }
    
    // 자동 슬라이드 시작
    function startSlideShow() {
        if (!playPauseBtn) return;
        
        slideInterval = setInterval(nextSlide, 4000);
        isPlaying = true;
        playPauseBtn.className = 'play_pause_btn pause';
        playPauseBtn.title = '일시정지';
        
        // 아이콘 변경
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const playIcon = playPauseBtn.querySelector('.play-icon');
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (playIcon) playIcon.style.display = 'none';
    }
    
    // 자동 슬라이드 정지
    function stopSlideShow() {
        if (!playPauseBtn) return;
        
        clearInterval(slideInterval);
        isPlaying = false;
        playPauseBtn.className = 'play_pause_btn play';
        playPauseBtn.title = '재생';
        
        // 아이콘 변경
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const playIcon = playPauseBtn.querySelector('.play-icon');
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'block';
    }
    
    // 인디케이터 클릭 이벤트
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isPlaying) {
                stopSlideShow();
                setTimeout(startSlideShow, 100);
            }
            goToSlide(index);
        });
    });
    
    // 재생/정지 버튼 클릭 이벤트
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                stopSlideShow();
            } else {
                startSlideShow();
            }
        });
    }
    
    // 초기 슬라이드 시작
    if (slideContainer) {
        startSlideShow();
    }
    
    // ====== 네비게이션 스크롤 효과 ======
    document.querySelectorAll('[data-section]').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====== CTA 버튼 이벤트 ======
    const ctaButton = document.querySelector('.cta_button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('입주 신청 페이지로 이동합니다!');
        });
    }
    
    });
    
// 기존 섹션5 관련 변수들과 함수들 모두 삭제하고 새로 추가

// 새로운 섹션5 스크롤 기반 시스템
let currentService = 'workspace';
let isTransitioning = false;
const services = ['workspace', 'kitchen', 'lounge', 'fitness', 'laundry'];

function switchService(serviceName) {
    if (currentService === serviceName || isTransitioning) return;
    
    isTransitioning = true;
    
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
    
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

// Intersection Observer로 서비스 전환 감지
const observerOptions = {
    threshold: 0.5,
    rootMargin: '-20% 0px -20% 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const serviceName = entry.target.getAttribute('data-trigger');
            if (serviceName) {
                switchService(serviceName);
            }
        }
    });
}, observerOptions);

// 트리거 영역들을 관찰
document.querySelectorAll('.service-trigger').forEach(trigger => {
    serviceObserver.observe(trigger);
});

// 네비게이션 클릭 이벤트 (기존과 동일)
document.querySelectorAll('.nav_item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = item.getAttribute('data-service');
        
        // 해당 서비스의 트리거 영역으로 스크롤
        const triggerElement = document.querySelector(`[data-trigger="${serviceName}"]`);
        if (triggerElement) {
            triggerElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});


// 애니메이션 초기화 함수
function resetAnimation(elements, animationClass = 'visible') {
    elements.forEach(element => {
        element.classList.remove(animationClass);
    });
}

// 섹션2 애니메이션 (재실행 가능)
const section2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const contentItems = entry.target.querySelectorAll('.content_item');
            
            // 기존 애니메이션 초기화
            resetAnimation(contentItems);
            
            // 새로운 애니메이션 실행
            contentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            });
        } else {
            // 섹션이 화면에서 벗어나면 애니메이션 초기화
            const contentItems = entry.target.querySelectorAll('.content_item');
            resetAnimation(contentItems);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -20% 0px'
});

// 섹션3 애니메이션 (재실행 가능)
const section3Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const contentItems = entry.target.querySelectorAll('.content_item');
            
            // 기존 애니메이션 초기화
            resetAnimation(contentItems);
            
            // 새로운 애니메이션 실행
            contentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            });
        } else {
            // 섹션이 화면에서 벗어나면 애니메이션 초기화
            const contentItems = entry.target.querySelectorAll('.content_item');
            resetAnimation(contentItems);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -20% 0px'
});

// 섹션4 애니메이션 (재실행 가능)
const section4Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const roomTypes = entry.target.querySelectorAll('.room_type');
            
            // 기존 애니메이션 초기화
            resetAnimation(roomTypes);
            
            // 새로운 애니메이션 실행
            roomTypes.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 300);
            });
        } else {
            // 섹션이 화면에서 벗어나면 애니메이션 초기화
            const roomTypes = entry.target.querySelectorAll('.room_type');
            resetAnimation(roomTypes);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -20% 0px'
});

// 섹션6 애니메이션도 재실행 가능하도록 수정
const section6Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const processItems = entry.target.querySelectorAll('.process_item');
            
            // 기존 애니메이션 초기화
            resetAnimation(processItems);
            
            // 새로운 애니메이션 실행
            processItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
        } else {
            // 섹션이 화면에서 벗어나면 애니메이션 초기화
            const processItems = entry.target.querySelectorAll('.process_item');
            resetAnimation(processItems);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -20% 0px'
});

// 각 섹션 관찰 시작
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section6 = document.getElementById('section6');

if (section2) section2Observer.observe(section2);
if (section3) section3Observer.observe(section3);
if (section4) section4Observer.observe(section4);
if (section6) section6Observer.observe(section6);

// 언어 드롭다운 호버 기능
document.addEventListener('DOMContentLoaded', function() {
    const langSelector = document.querySelector('.language_selector');
    const dropdown = document.querySelector('.language_dropdown');
    const arrow = document.querySelector('.lang-arrow');
    const currentLangText = document.getElementById('current-lang');
    
    if (!langSelector || !dropdown) return;
    
    let hoverTimeout;
    
    // 호버 시 드롭다운 표시
    langSelector.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        dropdown.classList.add('show');
        arrow.style.transform = 'rotate(180deg)';
    });
    
    // 마우스가 벗어날 때 드롭다운 숨김 (약간의 지연)
    langSelector.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            dropdown.classList.remove('show');
            arrow.style.transform = 'rotate(0deg)';
        }, 200); // 200ms 지연으로 사용성 향상
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
            
            currentLangText.textContent = langLabels[langCode];
            dropdown.classList.remove('show');
            arrow.style.transform = 'rotate(0deg)';
            
            console.log(`언어가 ${langCode}로 변경되었습니다.`);
        });
    });
});

// 햄버거 메뉴 토글
const hamburger = document.getElementById('hamburger');
const gnb = document.querySelector('.gnb');

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        gnb.classList.toggle('active');
        
        // 메뉴 열릴 때 body 스크롤 방지
        if (gnb.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// 메뉴 아이템 클릭시 메뉴 닫기
document.querySelectorAll('.gnb li:not(.language_selector)').forEach(item => {
    item.addEventListener('click', function() {
        if (window.innerWidth <= 820) {
            gnb.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// 메뉴 외부 클릭시 닫기
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 820) {
        if (!gnb.contains(e.target) && !hamburger.contains(e.target) && gnb.classList.contains('active')) {
            gnb.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// script.js의 네비게이션 클릭 이벤트 부분을 수정
document.querySelectorAll('.nav_item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = item.getAttribute('data-service');
        
        // 820px 이하에서는 직접 전환
        if (window.innerWidth <= 820) {
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

// 터치 이벤트도 막기
let scrollPosition = 0;

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        gnb.classList.toggle('active');
        
        // 간단하게 body에 클래스만 추가/제거
        document.body.classList.toggle('menu-open');
    });
}

if (hamburger) {
    // 클릭과 터치 이벤트 모두 처리
    ['click', 'touchstart'].forEach(eventType => {
        hamburger.addEventListener(eventType, function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            gnb.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    });
}