"use client";

import { useRef, useEffect, useState } from "react";

interface Stat {
  label: string;
  value: number;
}

const STATS: Stat[] = [
  { label: "진행한 프로젝트", value: 5000 },
  { label: "협업 브랜드", value: 3000 },
  { label: "배송된 제품", value: 1000 },
];

// easeOutExpo 이징 함수
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export default function StatsCounter() {
  const [displayValues, setDisplayValues] = useState<number[]>([0, 0, 0]);
  const hasAnimatedRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const prevValuesRef = useRef<number[]>([0, 0, 0]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startCounterAnimation();
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startCounterAnimation = () => {
    const duration = 900; // 0.9초로 빠르게
    const startTime = performance.now();
    const targetValues = STATS.map((s) => s.value);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo 적용
      const easedProgress = easeOutExpo(rawProgress);

      const newValues = targetValues.map((target) =>
        Math.floor(target * easedProgress)
      );

      // 값이 실제로 바뀔 때만 setState (최적화)
      const hasChanged = newValues.some(
        (val, idx) => val !== prevValuesRef.current[idx]
      );

      if (hasChanged) {
        prevValuesRef.current = newValues;
        setDisplayValues(newValues);
      }

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // 마지막 프레임에서 정확히 타겟 값으로 고정
        prevValuesRef.current = targetValues;
        setDisplayValues(targetValues);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      {/* 컨테이너 - 갤러리와 동일한 폭 */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* 가로 라인 - 갤러리 컨테이너 전체 폭 */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#ffffff",
          }}
        />

        {/* 3개 지표 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "40px",
            width: "100%",
          }}
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "12px",
              }}
            >
              {/* 라벨 */}
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </p>

              {/* 숫자 + 건+ */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                  aria-label={`${stat.value} 건`}
                >
                  {displayValues[index]?.toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: "clamp(20px, 3vw, 32px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  건
                </span>
                <span
                  style={{
                    fontSize: "clamp(20px, 3vw, 32px)",
                    fontWeight: 700,
                    color: "#ff0000",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
