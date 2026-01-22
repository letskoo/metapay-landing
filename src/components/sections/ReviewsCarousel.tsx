"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReviewsCarousel.module.css";

type Review = {
  id: number;
  stars: 5;
  summary: string;
  content: string;
  category: string;
  storeName: string;
  location: string;
  date: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    stars: 5,
    summary: "설치 10분도 안 걸렸고, 문의 대응이 빠릅니다.",
    content: "기술적인 부분을 전혀 몰라도 쉽게 설정할 수 있었어요. 카카오톡으로 문의하면 바로 답변 주셔서 안심되더라고요.",
    category: "카페",
    storeName: "온더힐 카페",
    location: "대전",
    date: "2026.01",
  },
  {
    id: 2,
    stars: 5,
    summary: "로열티/서버비 부담이 없어서 운영이 편해요.",
    content: "매달 나가는 수수료가 부담이었는데, 이건 초기 비용만 내면 끝이라 속이 편합니다. 가성비 최고예요.",
    category: "사진관",
    storeName: "스냅포토",
    location: "서울",
    date: "2025.12",
  },
  {
    id: 3,
    stars: 5,
    summary: "리뷰/고객 데이터가 쌓이니 재방문 유도가 쉬워졌어요.",
    content: "예약 내역이 자동으로 정리되고, 고객 연락처도 한 곳에서 관리되니까 프로모션 할 때 너무 편해요.",
    category: "예식장",
    storeName: "라벨웨딩홀",
    location: "부산",
    date: "2025.11",
  },
  {
    id: 4,
    stars: 5,
    summary: "모바일에서도 관리자 페이지 접속이 잘 돼요.",
    content: "밖에서도 핸드폰으로 예약 확인하고 문자 보내고 할 수 있어서, 사무실에 안 있어도 일 처리가 가능해졌습니다.",
    category: "학교",
    storeName: "청담어학원",
    location: "서울",
    date: "2025.12",
  },
  {
    id: 5,
    stars: 5,
    summary: "디자인 커스텀 요청했는데 빠르게 반영해 주셨어요.",
    content: "우리 브랜드 컬러로 조금 바꿔달라고 했더니 하루 만에 완성해 주셔서 감동이었습니다. 완전 만족해요.",
    category: "술집",
    storeName: "포차 78번가",
    location: "대전",
    date: "2026.01",
  },
  {
    id: 6,
    stars: 5,
    summary: "예약 취소/변경 기능이 자동화돼서 일손이 줄었어요.",
    content: "손님이 직접 취소나 날짜 변경을 할 수 있으니까 전화 받는 시간이 확 줄었습니다. 시스템이 알아서 처리해 줘요.",
    category: "극장",
    storeName: "씨네마운지",
    location: "부산",
    date: "2025.12",
  },
  {
    id: 7,
    stars: 5,
    summary: "SEO 최적화가 기본 탑재라 검색 노출이 잘 돼요.",
    content: "별도로 광고비 안 쓰는데도 네이버/구글에서 우리 매장이 검색되더라고요. 자연 유입이 늘어난 게 체감됩니다.",
    category: "카페",
    storeName: "브런치 베이커리",
    location: "서울",
    date: "2025.11",
  },
  {
    id: 8,
    stars: 5,
    summary: "가격 대비 퀄리티가 정말 좋습니다.",
    content: "다른 곳은 견적만 받아도 몇백씩 나오던데, 여기는 합리적인 가격에 원하는 기능 다 들어가 있어요. 강추합니다!",
    category: "사진관",
    storeName: "프로필스튜디오",
    location: "대전",
    date: "2026.01",
  },
];

export default function ReviewsCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver - 섹션 진입 애니메이션
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // 자동 재생
  useEffect(() => {
    const shouldAutoplay =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldAutoplay || isPaused) return;

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused]);

  // 사용자 조작 시 일시 정지
  const handleUserInteraction = () => {
    setIsPaused(true);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    handleUserInteraction();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    handleUserInteraction();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    handleUserInteraction();
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        {/* 타이틀 */}
        <h2 className={styles.title}>실제 이용 후기</h2>
        <p className={styles.subtitle}>
          빠른 제작보다 중요한 건 "진짜 운영에서 편해지는 것"이었습니다.
        </p>

        {/* 캐러셀 */}
        <div className={styles.carouselWrapper}>
          {/* 좌측 화살표 (데스크톱) */}
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={handlePrev}
            aria-label="이전 리뷰"
          >
            ‹
          </button>

          {/* 카드 트랙 */}
          <div className={styles.carouselTrack}>
            <div
              className={styles.carouselInner}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {REVIEWS.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  {/* 별점 */}
                  <div className={styles.stars}>⭐⭐⭐⭐⭐</div>

                  {/* 한 줄 요약 */}
                  <h3 className={styles.summary}>{review.summary}</h3>

                  {/* 본문 */}
                  <p className={styles.content}>{review.content}</p>

                  {/* 메타 정보 */}
                  <div className={styles.meta}>
                    <span className={styles.badge}>{review.category}</span>
                    <span className={styles.storeInfo}>
                      {review.storeName} · {review.location}
                    </span>
                    <span className={styles.date}>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 화살표 (데스크톱) */}
          <button
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="다음 리뷰"
          >
            ›
          </button>
        </div>

        {/* 점 인디케이터 (모바일) */}
        <div className={styles.dots}>
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${
                idx === currentIndex ? styles.dotActive : ""
              }`}
              onClick={() => handleDotClick(idx)}
              aria-label={`${idx + 1}번째 리뷰로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
