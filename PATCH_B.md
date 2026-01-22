# 안 B: CSS 변수 + 디버깅 강화

## 1️⃣ globals.css - CSS 변수 추가

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --header-height-mobile: 56px;
  --header-height-desktop: 70px;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;
  padding-top: var(--header-height-desktop);
}

@media (max-width: 768px) {
  body {
    padding-top: var(--header-height-mobile);
  }
}

/* 앵커 오프셋도 변수 사용 */
#lead-form {
  scroll-margin-top: calc(var(--header-height-desktop) + 20px);
}

#promo-tiles {
  scroll-margin-top: var(--header-height-desktop);
}

#photo-slide {
  scroll-margin-top: var(--header-height-desktop);
}

@media (max-width: 768px) {
  #lead-form,
  #promo-tiles,
  #photo-slide {
    scroll-margin-top: var(--header-height-mobile);
  }
}
```

## 2️⃣ HeroIntro.tsx - 디버깅 콘솔 추가

```tsx
export default function HeroIntro() {
  const formInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("🔵 HeroIntro mounted, isVisible:", isVisible);
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="hero-intro-section"
      style={{ 
        width: "100%", 
        overflow: "hidden", 
        paddingTop: "20px",
        border: "2px solid blue", // 🔴 디버깅용
        minHeight: "300px" // 🔴 디버깅용
      }}
    >
```

## 3️⃣ PromoTiles.tsx - 디버깅 콘솔 추가

```tsx
function PromoTiles() {
  useEffect(() => {
    console.log("🟢 PromoTiles mounted");
  }, []);

  return (
    <section 
      id="promo-tiles" 
      className={styles.section}
      style={{ border: "2px solid green" }} // 🔴 디버깅용
    >
```

## 4️⃣ PromoTiles.module.css - 최소 높이 확보

```css
.section {
  width: 100%;
  padding: 40px 0;
  min-height: 400px; /* 강제 높이 */
}
```

## 결과 확인

1. 브라우저 콘솔에 "🔵 HeroIntro mounted" / "🟢 PromoTiles mounted" 로그 확인
2. 파란색/초록색 테두리가 화면에 보이는지 확인
3. 보인다면: 애니메이션/opacity 문제 → 안 A 유지
4. 안 보인다면: 레이아웃/position 문제 → z-index/overflow 추가 디버깅 필요

