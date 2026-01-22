"use client";

import { useRef, useEffect, useState } from "react";

// 체크 아이콘 컴포넌트
const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      flexShrink: 0,
      marginRight: "8px",
    }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#003DA5"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M8 12L11 15L16 9"
      stroke="#003DA5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 가격 카드 데이터 타입
interface PricingCard {
  id: number;
  title: string;
  price: string;
  description: string;
  services: string[];
  duration: {
    title: string;
    days: string;
    notice: string;
  };
  benefits: string[];
  additionalCosts: string[];
}

// 섹션 텍스트 데이터
const SECTION_TEXT = {
  mainTitle: "퀵빌딩 제작 서비스는\n합리적인 견적만을 제시해 드립니다",
  subTitle: "비용 절감, 기간 단축, 퀄리티 3박자를 모두 맞췄습니다",
};

// 가격 카드 데이터 (추후 확장 가능)
const PRICING_CARDS: PricingCard[] = [
  {
    id: 1,
    title: "랜딩 페이지",
    price: "40만 원부터~",
    description: "회사 가치 입증 용도, 광고 DB 수집 용도",
    services: [
      "PC + 모바일 반응형 제작",
      "1페이지 최대 8개 섹션 제작 진행",
      "홈페이지 UI 기획 진행",
      "1 : 1 전담 케어 진행",
    ],
    duration: {
      title: "제작 기간",
      days: "작업 일 수 : 7일 이내 완성",
      notice: "*피드백 과정, 수정 과정 등으로 기간이 늘어날 수 있습니다",
    },
    benefits: [
      "아임웹 X, 카페24 X, 자체 개발 코딩",
      "서버 유지 기간 월 1회 수정 서비스 제공",
      "네이버 & 구글 SEO 작업",
    ],
    additionalCosts: [
      "섹션 1개당 2만원 추가",
      "자사 서버 이용시 월 3만원 (수정 및 관리)",
    ],
  },
  {
    id: 2,
    title: "비즈니스 홈페이지",
    price: "60만 원부터 ~",
    description: "기업, 스타트업, 기관에 적합한 형태",
    services: [
      "PC + 모바일 반응형 제작",
      "메인 1 + 서브 4 페이지 구성",
      "홈페이지 UI 기획 진행",
      "1:1 전담 케어 진행",
    ],
    duration: {
      title: "제작 기간",
      days: "작업 일수: 14일 이내 완성",
      notice: "*피드백 과정 중 일부 기간이 늘어날 수 있습니다.",
    },
    benefits: [
      "무제한 수정 서비스 제공 (웹디자인 작업 과정 중)",
      "네이버 & 구글 SEO 작업",
      "맞춤형 가이드 제공",
    ],
    additionalCosts: [
      "1 페이지 추가 시: 10만 원",
    ],
  },
  {
    id: 3,
    title: "프리미엄 홈페이지",
    price: "100만 원 부터 ~",
    description: "규모가 큰 기업, 회사에 적합한 형태",
    services: [
      "PC + 모바일 반응형 제작",
      "메인 1 + 서브 9 페이지 구성",
      "홈페이지 UI 기획 진행",
      "1:1 전담 케어 진행",
    ],
    duration: {
      title: "제작 기간",
      days: "작업 일수: 2-3주 이내 완성",
      notice: "*피드백 과정 중 일부 기간이 늘어날 수 있습니다.",
    },
    benefits: [
      "무제한 수정 서비스 제공 (웹디자인 작업 과정 중)",
      "네이버 & 구글 SEO 작업",
      "맞춤형 가이드 제공",
    ],
    additionalCosts: [
      "1페이지 추가 시: 10만 원",
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="pricing-section"
      style={{ width: "100%", overflow: "hidden", paddingTop: "28px" }}
    >
      <div
        className="pricing-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "54px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "auto",
          gap: "48px",
        }}
      >
        {/* 섹션 상단 텍스트 */}
        <div
          className="pricing-text-content"
          style={{ width: "100%", maxWidth: "740px" }}
        >
          {/* 큰 헤드라인 */}
          <h2
            className="pricing-headline"
            style={{
              fontSize: "clamp(18px, 3vw, 36px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#000",
              margin: 0,
              marginBottom: "14px",
              animationName: "slideDownFadeIn",
              animationDuration: "0.8s",
              animationTimingFunction: "ease-out",
              animationDelay: "0s",
              animationFillMode: "forwards",
              animationPlayState: isVisible ? "running" : "paused",
              opacity: 0,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {SECTION_TEXT.mainTitle}
          </h2>

          {/* 서브문구 */}
          <p
            className="pricing-subtitle"
            style={{
              fontSize: "clamp(11.5px, 1.5vw, 14px)",
              fontWeight: 500,
              lineHeight: 1.46,
              color: "#666",
              margin: 0,
              animationName: "slideDownFadeIn",
              animationDuration: "0.8s",
              animationTimingFunction: "ease-out",
              animationDelay: "0.5s",
              animationFillMode: "forwards",
              animationPlayState: isVisible ? "running" : "paused",
              opacity: 0,
            }}
          >
            {SECTION_TEXT.subTitle}
          </p>
        </div>

        {/* 가격 카드 그리드 */}
        <div
          className="pricing-cards-grid"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {PRICING_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="pricing-card"
              style={{
                flex: "1 1 auto",
                maxWidth: "480px",
                minWidth: "280px",
                background: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                padding: "32px 28px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                textAlign: "left",
                animationName: "slideInFromLeft",
                animationDuration: "0.55s",
                animationTimingFunction: "ease-out",
                animationDelay: `${1 + index * 0.1}s`,
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
                transform: "translateX(-28px) scale(0.98)",
              }}
            >
              {/* 카드 헤더 */}
              <div style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#000",
                    margin: "0 0 8px 0",
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#003DA5",
                    margin: "0 0 60px 0",
                    lineHeight: 1.1,
                  }}
                >
                  {card.price}
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#666",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {card.description}
                </p>
              </div>

              {/* 구분선 */}
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  margin: "20px 0",
                }}
              />

              {/* 제작 서비스 구성 */}
              <div style={{ marginBottom: "40px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#000",
                    margin: "0 0 8px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckIcon />
                  제작 서비스 구성
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 32px",
                    listStyleType: "disc",
                  }}
                >
                  {card.services.map((service, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#333",
                        lineHeight: 1.8,
                        marginBottom: "3px",
                      }}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 제작 기간 */}
              <div style={{ marginBottom: "40px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#000",
                    margin: "0 0 8px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckIcon />
                  {card.duration.title}
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 32px",
                    listStyleType: "disc",
                  }}
                >
                  <li
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#333",
                      lineHeight: 1.6,
                      marginBottom: "3px",
                    }}
                  >
                    {card.duration.days}
                  </li>
                </ul>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#999",
                    margin: 0,
                    marginTop: "8px",
                    paddingLeft: "32px",
                    lineHeight: 1.5,
                  }}
                >
                  {card.duration.notice}
                </p>
              </div>

              {/* 제작 서비스 혜택 */}
              <div style={{ marginBottom: "40px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#000",
                    margin: "0 0 8px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckIcon />
                  제작 서비스 혜택
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 32px",
                    listStyleType: "disc",
                  }}
                >
                  {card.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#333",
                        lineHeight: 1.8,
                        marginBottom: "3px",
                      }}
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 추가 비용 */}
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#000",
                    margin: "0 0 8px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckIcon />
                  추가 비용
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 32px",
                    listStyleType: "disc",
                  }}
                >
                  {card.additionalCosts.map((cost, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#333",
                        lineHeight: 1.8,
                        marginBottom: "3px",
                      }}
                    >
                      {cost}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 애니메이션 스타일 정의 */}
      <style>{`
        @keyframes slideDownFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-28px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* 데스크톱 - 3열 그리드 */
        @media (min-width: 1024px) {
          .pricing-cards-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 24px !important;
          }
          
          .pricing-card {
            max-width: none !important;
            min-width: 0 !important;
            width: 100% !important;
          }
        }

        /* 태블릿 - 2열 그리드 */
        @media (min-width: 769px) and (max-width: 1023px) {
          .pricing-cards-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 24px !important;
          }
          
          .pricing-card {
            max-width: none !important;
            min-width: 0 !important;
            width: 100% !important;
          }
        }

        /* 모바일 - 1열 */
        @media (max-width: 768px) {
          .pricing-cards-grid {
            flex-direction: column;
            align-items: stretch;
          }
          
          .pricing-card {
            max-width: 100% !important;
            min-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
