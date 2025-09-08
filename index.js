// section1 텍스트 전환
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section1",
    start: "top top",
    end: "+=600%",
    pin: true,
    scrub: true,
  }
});

// 초기 상태
gsap.set("#section1 .text1", {opacity:1});
gsap.set("#section1 .text2", {opacity:0});
gsap.set("#section1 .text3", {opacity:0});
gsap.set("#section1 .overlay", {opacity:0.6});

// 텍스트 순차 전환
tl.to("#section1 .text1", {opacity:0, duration:0.5}, 0.5)
  .to("#section1 .text2", {opacity:1, duration:0.5}, 0.5)
  .to("#section1 .text2", {opacity:0, duration:0.5}, 2)
  .to("#section1 .text3", {opacity:1, duration:0.5}, 2)
  .to(["#section1 .text3", "#section1 .overlay"], {opacity:0, duration:0.5}, 3.5);

// section3~section8 책넘김 패럴랙스
const bookSections = gsap.utils.toArray("#horizontal-sections > section");

if (window.innerWidth > 1023){
  bookSections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,  // true로 해야 다음 섹션으로 자연스럽게 넘어감
      scrub: 1.2,         // 딜레이 느낌
      markers: false,
    });
  });
} else {
  // === 모바일: 가로 슬라이드 + dot 네비게이션 + 자동 캐러셀 ===
  const slider = document.getElementById("horizontal-sections");
  const dots = document.querySelectorAll(".slide-dots .dot");
  const slideCount = dots.length;
  let currentIndex = 0;
  let autoSlide;

  // 슬라이드 이동 함수
  function goToSlide(index) {
    slider.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth"
    });
    currentIndex = index;
    updateDots();
  }

  // 점 업데이트
  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // 자동 슬라이드 시작
  function startAutoSlide() {
    autoSlide = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slideCount;
      goToSlide(nextIndex);
    }, 5000); // 5초마다 이동
  }

  // 자동 슬라이드 정지
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // 스크롤 시 현재 인덱스 감지
  slider.addEventListener("scroll", () => {
    let index = Math.round(slider.scrollLeft / window.innerWidth);
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots();
    }
  });

  // dot 클릭 시 해당 슬라이드 이동 + 자동슬라이드 리셋
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(i);
      startAutoSlide();
    });
  });

  // 유저가 터치(스와이프)하면 자동 슬라이드 잠시 멈춤
  slider.addEventListener("touchstart", stopAutoSlide);
  slider.addEventListener("touchend", startAutoSlide);

  // 초기 실행
  updateDots();
  startAutoSlide();
}

// section2는 일반 스크롤
ScrollTrigger.create({
  trigger: "#section8",
  start: "top bottom",
  end: "bottom top",
  pin: false,
  markers: false
});

// reveal 애니메이션
const hide = (item) => gsap.set(item, {autoAlpha:0});

const animate = (item) => {
  let x=0, y=0;
  if(item.classList.contains("reveal_LTR")) x=-100;
  else if(item.classList.contains("reveal_BTT")) y=100;
  else if(item.classList.contains("reveal_TTB")) y=-100;
  else x=100;

  gsap.fromTo(item, {autoAlpha:0, x:x, y:y}, {autoAlpha:1, x:0, y:0, duration:1.2, ease:"expo.out"});
};

gsap.utils.toArray(".reveal").forEach(item => {
  hide(item);
  ScrollTrigger.create({
    trigger: item,
    start: "top 80%",
    onEnter: () => animate(item)
  });
});

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray("#section9 .award-card"); 
const wrapper = document.querySelector("#section9 .awards");

// 카드 사이즈(660px) + 좌우 마진 계산
const cardWidth = 660 + (window.innerWidth - 660); 
const totalWidth = cardWidth * (cards.length - 0.5);

// 가로 스크롤 트윈
let horizontalTween = gsap.to(wrapper, {
  x: () => -totalWidth,
  ease: "none",
  scrollTrigger: {
    trigger: "#section9",
    pin: true,
    scrub: 1,
    end: () => "+=" + totalWidth, // 마지막 카드까지 스크롤되면 pin 해제 → 다시 세로스크롤
  }
});

// 카드 들어올 때마다 배경 변경
cards.forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    containerAnimation: horizontalTween, // 가로 스크롤에 맞춰 동작
    start: "left center", // 카드가 시작될 때
    onEnter: () => setBg(i),
    onEnterBack: () => setBg(i)
  });
});

function setBg(index) {
  document.querySelectorAll("#section9 .bg-img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

gsap.utils.toArray("#section10 .reveal").forEach(item => {
  hide(item);
  ScrollTrigger.create({
    trigger: item,
    start: "top 100%",   // 조금 더 늦게 트리거
    onEnter: () => animate(item),
  });
});

gsap.utils.toArray("#section11 .reveal").forEach(item => {
  hide(item);
  ScrollTrigger.create({
    trigger: item,
    start: "top 100%",   // 조금 더 늦게 트리거
    onEnter: () => animate(item),
  });
});

gsap.utils.toArray("#section12 .reveal").forEach(item => {
  hide(item);
  ScrollTrigger.create({
    trigger: item,
    start: "top 100%",   // 조금 더 늦게 트리거
    onEnter: () => animate(item),
  });
});

const hamburger    = document.querySelector(".hamburger");
const hamburgerImg  = hamburger.querySelector("img");
const menuBox      = document.getElementById("Menu_box");
const mainMenuLinks= document.querySelectorAll(".mainMenu-list a");
const subMenus     = document.querySelectorAll(".subMenu");
const backBtn      = document.querySelector(".subMenu-list .back-btn");

// 햄버거: 열고 닫기 + 초기화
hamburger.addEventListener("click", () => {
  // 열기/닫기
  const willOpen = !menuBox.classList.contains("active");
  menuBox.classList.toggle("active", willOpen);

   if (willOpen) {
    hamburgerImg.src = "images/nav/close-btn.png"; // 메뉴 열리면 close 아이콘
    hamburgerImg.alt = "닫기 버튼";
    hamburger.setAttribute("aria-label", "Close menu");
  } else {
    hamburgerImg.src = "images/header/Menu_btn.png"; // 닫으면 햄버거 아이콘
    hamburgerImg.alt = "햄버거 메뉴 버튼";
    hamburger.setAttribute("aria-label", "Open menu");
  }

  // 닫힐 때는 상태 초기화
  if (!willOpen) {
    menuBox.classList.remove("show-sub");
    mainMenuLinks.forEach(l => l.classList.remove("active"));
    subMenus.forEach(s => s.classList.remove("active"));
  }
});

// 메인 메뉴 클릭 → 해당 서브로 전환
mainMenuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.dataset.sub;

    // 메인 링크 active 표시
    mainMenuLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // 서브 목록 표시 전환
    subMenus.forEach(sub => {
      sub.classList.toggle("active", sub.id === targetId);
    });

    // 메인 패널 out / 서브 패널 in
    menuBox.classList.add("show-sub");
  });
});

// 뒤로가기 → 메인으로 복귀
backBtn.addEventListener("click", () => {
  menuBox.classList.remove("show-sub");
  mainMenuLinks.forEach(l => l.classList.remove("active"));
  subMenus.forEach(s => s.classList.remove("active"));
});