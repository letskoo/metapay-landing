"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./PromoTiles.module.css";

type Tile = {
  label: string;  // 라벨 (나은 제목 등)
  title: string;  // 크게 나타나는 본문 텍스트
  link?: string;  // 클릭 링크

  // 단색 테마 (선택)
  theme?: "yellow" | "lime" | "blue" | "pink";

  // 사진 배경 (선택) — public/images/... 에 넣고 "/images/xxx.jpg"
  imageUrl?: string;
};

const TILES: Tile[] = [
  {
    label: "서비스 소개",
    title: "빠르게 만들지만\n최고를 드립니다",
    link: "http://pf.kakao.com/_zRMZj/chat",
    theme: "yellow",
  },
  {
    label: "대표 소개",
    title: "말도 안되는 가격에\n직접 만들기로 했습니다",
    link: "http://pf.kakao.com/_zRMZj/chat",
    theme: "lime",
  },
  {
    label: "제작 사례",
    title: "1인 사업주부터\n200인 기업까지!",
    link: "http://pf.kakao.com/_zRMZj/chat",
    theme: "blue",
  },
  {
    label: "제작 가이드",
    title: "레고 조립처럼\n말씀만 하세요",
    link: "http://pf.kakao.com/_zRMZj/chat",
    imageUrl: "/images/studio.jpg",
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
  const ref = useRef<HTMLAnchorElement | null>(null);
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
        <div className={styles.sectionText}>
          단 14일, 빠르게 만들면 퀄리티가<br />
          떨어진다는 편견 깨버리겠습니다
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
    <a
      ref={ref}
      href={tile.link}
      target="_blank"
      rel="noopener noreferrer"
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
    </a>
  );
}

export default PromoTiles;
