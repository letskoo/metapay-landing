"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./PromoTiles.module.css";

type Tile = {
  label: string;  // 라벨 (나은 제목 등)
  title: string;  // 크게 나타나는 본문 텍스트

  // 단색 테마 (선택)
  theme?: "yellow" | "lime" | "blue" | "pink";

  // 사진 배경 (선택) — public/images/... 에 넣고 "/images/xxx.jpg"
  imageUrl?: string;
};

const TILES: Tile[] = [
  {
    label: "돈 벌어본 구조만 만듭니다",
    title: "실제 운영으로\n검증된 구조만 제공",
    theme: "blue",
  },
  {
    label: "유입 → 재방문 구조 설계",
    title: "고객이\n다시 오게 설계합니다",
    theme: "blue",
  },
  {
    label: "광고 없이도 굴러가도록",
    title: "운영에 돈을 안들여도\n스스로 돌아가는 구조",
    theme: "blue",
  },
  {
    label: "묶으면 더 강력한 서비스",
    title: "웹\n포토그루브\n학원관리 = 자동수익",
    theme: "blue",
  },
];

function themeClass(theme?: Tile["theme"]) {
  switch (theme) {
    case "lime":
      return styles.lime;
    case "blue":
      return styles.blue;
    case "pink":
      return styles.pink;
    case "yellow":
    default:
      return styles.yellow;
  }
}

// 커스텀 Hook: IntersectionObserver를 사용하여 카드의 가시성 감지
function useSlideInCard() {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // threshold 0.5일 때 (화면 중앙 도달 시) 한 번만 애니메이션 실행
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.5 } // 화면 중앙(50%)에서 감지
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return { ref, isVisible };
}

function PromoTiles() {
  return (
    <section id="promo-tiles" className={styles.section}>
      <div className={styles.container}>
        {/* 타일 위 텍스트 */}
        <div className={styles.sectionHeader} style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 800,
              color: "#000",
              margin: 0,
              marginBottom: "4px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            왜 메타페이는 결과가 날까요?
          </h2>
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 20px)",
              fontWeight: 400,
              color: "#666",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            우리는 '만들기'보다 '팔리게 만들기'를 먼저 생각합니다.
          </p>
        </div>

        {/* 타일 그리드 */}
        <div className={styles.grid}>
          {TILES.map((tile) => (
            <PromoTile key={tile.title} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 개별 타일 컴포넌트 (IntersectionObserver 적용)
function PromoTile({ tile }: { tile: Tile }) {
  const { ref, isVisible } = useSlideInCard();

  const styleVars: CSSProperties = {};
  if (tile.imageUrl) {
    (styleVars as any)["--tile-bg-image"] = `url(${tile.imageUrl})`;
  }

  return (
    <button
      ref={ref}
      className={`${styles.card} ${themeClass(tile.theme)} ${
        tile.imageUrl ? styles.hasImage : ""
      } ${isVisible ? styles.visible : ""}`}
      style={tile.imageUrl ? styleVars : undefined}
    >
      {/* 배경 이미지 타일에만 오버레이 적용 */}
      {tile.imageUrl && <div className={styles.overlay}></div>}

      {/* 타일 내용 (상단 배치) */}
      <div className={styles.content}>
        <div className={styles.labelWithArrow}>
          <span className={styles.label}>{tile.label}</span>
          <span className={styles.arrow}></span>
        </div>
        <div className={styles.title}>{tile.title}</div>
      </div>
    </button>
  );
}

export default PromoTiles;
