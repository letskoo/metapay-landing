"use client";

import { useRef, useEffect, useState } from "react";
import StatsCounter from "./StatsCounter";

interface MidCtaContent {
  headline: string;
  subtitle: string;
}

interface MidCtaSectionProps {
  content?: MidCtaContent;
}

const DEFAULT_CONTENT: MidCtaContent = {
  headline: "당신이 생각하는 \"특별한 가치\"\n그것을 전달하는데 집중하겠습니다",
  subtitle: "전문 인력 상시 배치로 불편사항을 현장에서 즉시 해결합니다",
};

export default function MidCtaSection({ content }: MidCtaSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Safe content with fallback to defaults
  const safeContent = content ?? DEFAULT_CONTENT;

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

  const handleScrollToPortfolio = () => {
    const portfolioElement = document.getElementById("lead-form");
    if (portfolioElement) {
      portfolioElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="mid-cta-section"
      ref={sectionRef}
      className="mid-cta-section"
      style={{ 
        width: "100%", 
        overflow: "hidden", 
        paddingTop: "0px",
        background: "#000000"
      }}
    >
      <div
        className="mid-cta-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "54px 20px 10px 20px",
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
          className="mid-cta-content mt-12 md:mt-40"
          style={{ width: "100%", maxWidth: "740px" }}
        >
          {/* 큰 헤드라인 */}
          <h2
            className="mid-cta-headline"
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
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
            {safeContent?.headline || ""}
          </h2>

          {/* 서브문구 */}
          {safeContent?.subtitle && (
            <p
              className="mid-cta-subtitle"
              style={{
                fontSize: "clamp(13px, 1.5vw, 20px)",
                fontWeight: 500,
                lineHeight: 1.46,
                color: "#ffffff",
                margin: 0,
                marginBottom: "50px",
                animationName: "slideDownFadeIn",
                animationDuration: "0.8s",
                animationTimingFunction: "ease-out",
                animationDelay: "0.9s",
                animationFillMode: "forwards",
                animationPlayState: isVisible ? "running" : "paused",
                opacity: 0,
              }}
            >
              {safeContent.subtitle}
            </p>
          )}

          {/* CTA 통계 */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <StatsCounter />
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
