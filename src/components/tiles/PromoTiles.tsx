"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./PromoTiles.module.css";

type TileCard = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
};

const CARDS: TileCard[] = [
  {
    id: 1,
    title: "결혼식 신문화\n네컷사진 앨범",
    description: "하객들이 자유롭게 찍은 네컷사진을\n방명록 앨범으로 만들어 드립니다",
    imageUrl: "/images/tile-01.png",
    bgColor: "#1a1a1a",
  },
  {
    id: 2,
    title: "대학교 행사\n이제 네컷사진이 대세",
    description: "총학생 선거부터 대동제 축제까지\n행사 컨셉에 맞춘 프레임으로 퀄리티 UP",
    imageUrl: "/images/tile-02.png",
    bgColor: "#2d5f4f",
  },
  {
    id: 3,
    title: "유치원 · 학교 행사의\n만족감 높이는 네컷사진",
    description: "졸업식, 입학식, 체육대회\n최고 인기는 네컷사진",
    imageUrl: "/images/tile-03.png",
    bgColor: "#1e3a8a",
  },
  {
    id: 4,
    title: "기업 행사\n고객 참여형 마케팅",
    description: "기업 내 행사부터 극장, 공연, 관공서까지\n고객 체험 유도 부스로 활용",
    imageUrl: "/images/tile-04.png",
    bgColor: "#5b21b6",
  },
];

export default function PromoTiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { 
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px"
      }
    );

    observer.observe(element);

    return () => {
      if (element && observer) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* 섹션 타이틀 */}
        <div
          className={`${styles.header} ${
            isVisible ? styles.headerVisible : styles.headerHidden
          }`}
        >
          <h2 className={styles.mainTitle}>
            특별함을 사진으로 기록하다
            <br />
            렌탈의 새로운 기준
          </h2>
          <p className={styles.subTitle}>참여형 행사로 재미와 추억을 모두 잡다</p>
        </div>

        {/* 카드 그리드 */}
        <div className={styles.grid}>
          {CARDS.map((card, index) => {
            // 인덱스 0,1은 왼쪽에서, 2,3은 오른쪽에서
            const direction = index <= 1 ? styles.fromLeft : styles.fromRight;
            // 딜레이: 0,2는 0.1s, 1,3은 0.25s
            const delay = index % 2 === 0 ? "0.1s" : "0.25s";

            return (
              <div
                key={card.id}
                className={`${styles.card} ${direction} ${
                  isVisible ? styles.cardVisible : ""
                }`}
                style={{
                  backgroundColor: card.bgColor,
                  transitionDelay: delay,
                }}
              >
                {/* 이미지 영역 */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* 텍스트 영역 */}
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <div className={styles.divider} />
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
