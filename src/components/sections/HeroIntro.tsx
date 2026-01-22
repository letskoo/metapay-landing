"use client";

import { useRef, useEffect, useState } from "react";

export default function HeroIntro() {
  const formInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(true); // false -> true 초기 상태 변경

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      
      // 폼의 첫 입력 필드에 포커스
      setTimeout(() => {
        const firstInput = formElement.querySelector("input");
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section
      className="hero-intro-section"
      style={{ width: "100%", overflow: "hidden", paddingTop: "20px" }}
    >
      <div
        className="hero-intro-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "auto",
          gap: "24px",
        }}
      >
        {/* 애니메이션 텍스트 */}
        <div
          className="hero-intro-content"
          style={{ width: "100%", maxWidth: "740px" }}
        >
          {/* 큰 헤드라인 */}
          <h1
            className="hero-intro-headline"
            style={{
              fontSize: "clamp(25px, 3vw, 36px)",
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
            }}
          >
            매출이 생기는 서비스
            <br />
            메타페이는 수익을 개발합니다
          </h1>

          {/* 서브문구 */}
          <p
            className="hero-intro-subtitle"
            style={{
              fontSize: "clamp(14px, 1.5vw, 18px)",
              fontWeight: 500,
              lineHeight: 1.46,
              color: "#666",
              margin: 0,
              marginBottom: "70px",
                animationName: "slideDownFadeIn",
                animationDuration: "0.8s",
                animationTimingFunction: "ease-out",
                animationDelay: "0.9s",
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
              }}
            >
            웹, 앱, 자동결제, 무인 포토부스까지
            <br />
            고객이 실제로 돈을 벌게 되는 구조를 함께 설계합니다.
          </p>

          {/* 버튼 위 서브문구 */}
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 18px)",
              fontWeight: 600,
              color: "#003DA5",
              margin: 0,
              marginBottom: "8px",
              animationName: "slideDownFadeIn",
              animationDuration: "0.8s",
              animationTimingFunction: "ease-out",
              animationDelay: "1.2s",
              animationFillMode: "forwards",
              animationPlayState: isVisible ? "running" : "paused",
              opacity: 0,
            }}
          >
            실제 사업 운영으로 검증된 수익형 솔루션
          </p>

          {/* CTA 버튼 2개 */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={handleScrollToForm}
              className="hero-intro-cta-button"
              style={{
                padding: "12px 32px",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                background: "#003DA5",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animationName: "slideDownFadeIn",
                animationDuration: "0.8s",
                animationTimingFunction: "ease-out",
                animationDelay: "1.4s",
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.12)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0b3a92";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.18)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#003DA5";
                e.currentTarget.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              내 사업에 맞는 솔루션 보기 →
            </button>

            <button
              onClick={handleScrollToForm}
              className="hero-intro-cta-button"
              style={{
                padding: "12px 32px",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 700,
                border: "2px solid #003DA5",
                borderRadius: "8px",
                background: "transparent",
                color: "#003DA5",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animationName: "slideDownFadeIn",
                animationDuration: "0.8s",
                animationTimingFunction: "ease-out",
                animationDelay: "1.6s",
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.08)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#003DA5";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.18)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#003DA5";
                e.currentTarget.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              실제 수익 구조 사례 보기 →
            </button>
          </div>
        </div>
      </div>

      {/* 애니메이션 스타일 정의 (인라인 스타일로 keyframes 주입) */}
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
        
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* 모바일에서 간격 조정 */
        @media (max-width: 768px) {
          .hero-intro-subtitle {
            margin-bottom: 70px !important;
          }
        }

        /* 데스크톱에서만 마진 탑 적용 */
        @media (min-width: 769px) {
          .hero-intro-content {
            margin-top: 40px;
          }
          
          .hero-intro-section {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </section>
  );
}
