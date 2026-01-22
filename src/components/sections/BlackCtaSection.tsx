"use client";

import { useRef, useEffect, useState } from "react";

export default function BlackCtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  const handleScrollToLeadForm = () => {
    const leadFormElement = document.getElementById("lead-form");
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="black-cta-section"
      style={{ width: "100%", overflow: "hidden", paddingTop: "28px" }}
    >
      <div
        className="black-cta-container"
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
          gap: "24px",
        }}
      >
        {/* 애니메이션 텍스트 */}
        <div
          className="black-cta-content mt-12 md:mt-40"
          style={{ width: "100%", maxWidth: "740px" }}
        >
          {/* 상단 문구 */}
          <p
            className="black-cta-subtext"
            style={{
              fontSize: "clamp(11.5px, 1.5vw, 14px)",
              fontWeight: 500,
              lineHeight: 1.46,
              color: "#666",
              margin: 0,
              marginBottom: "20px",
              animationName: "slideDownFadeIn",
              animationDuration: "0.8s",
              animationTimingFunction: "ease-out",
              animationDelay: "0s",
              animationFillMode: "forwards",
              animationPlayState: isVisible ? "running" : "paused",
              opacity: 0,
            }}
          >
            매주 2팀 한정. 100% 사전 예약제.
          </p>

          {/* 큰 헤드라인 */}
          <h2
            className="black-cta-headline"
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
              animationDelay: "0.3s",
              animationFillMode: "forwards",
              animationPlayState: isVisible ? "running" : "paused",
              opacity: 0,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            퀵빌딩의 목표는 단 하나.
            <br />
            14일 안에 고퀄 홈페이지 제작해드리는 것.
          </h2>

          {/* CTA 버튼 */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <button
              onClick={handleScrollToLeadForm}
              className="black-cta-button mb-8 md:mb-12"
              style={{
                padding: "10px 80px",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                background: "#003DA5",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animationName: "zoomIn",
                animationDuration: "0.45s",
                animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                animationDelay: "0.9s",
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
                transform: "scale(0.85)",
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.12)",
                whiteSpace: "nowrap",
                display: "flex",
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
              지금 바로 문의하기
            </button>
          </div>
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
      `}</style>
    </section>
  );
}
