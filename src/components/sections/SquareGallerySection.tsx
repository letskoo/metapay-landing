"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export default function SquareGallerySection() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Fisher-Yates shuffle 함수
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // API에서 이미지 목록 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('[Gallery Component] Fetching images from /api/gallery');
        const response = await fetch('/api/gallery');
        
        // 응답 상태 체크
        if (!response.ok) {
          const text = await response.text();
          console.error('[Gallery Component] API error:', response.status, text);
          throw new Error(`API 응답 오류: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('[Gallery Component] API response:', text);
        
        const data = JSON.parse(text);
        console.log('[Gallery Component] Received images count:', data.count || 0);
        
        if (data.images && Array.isArray(data.images)) {
          // 클라이언트에서 다시 한 번 셌플 (매 로드마다 순서 변경)
          const shuffledImages = shuffleArray(data.images as string[]);
          console.log('[Gallery Component] Images shuffled:', shuffledImages.length);
          setImages(shuffledImages);
        } else {
          console.warn('[Gallery Component] No images array in response');
          setImages([]);
        }
      } catch (error) {
        console.error('[Gallery Component] Failed to load images:', error);
        setError(error instanceof Error ? error.message : '이미지 로드 실패');
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // IntersectionObserver로 섹션 진입 감지
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          console.log('[Gallery Component] Section visible, triggering animation');
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // 모달 열기
  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  // 모달 닫기
  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // 이전 이미지
  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
  }, [selectedIndex, images.length]);

  // 다음 이미지
  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
  }, [selectedIndex, images.length]);

  // ESC 키 및 화살표 키 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeModal, goToPrevious, goToNext]);

  // 네비게이션 버튼 표시 여부
  const showNavButtons = images.length > 1;

  return (
    <section
      ref={sectionRef}
      className="square-gallery-section"
      style={{
        width: "100%",
        padding: "0 0 60px 0",
        position: "relative",
        background: "transparent",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* 로딩 상태 */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
            갤러리를 불러오는 중...
          </div>
        )}

        {/* 에러 상태 */}
        {!isLoading && error && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#d32f2f" }}>
            에러 발생: {error}
          </div>
        )}

        {/* 이미지 없음 */}
        {!isLoading && !error && images.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
            images 폴더에 이미지가 없습니다
          </div>
        )}

        {/* 정사각형 그리드 */}
        {!isLoading && !error && images.length > 0 && (
          <div
          className="square-grid"
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(2, 1fr)", // 기본 2열 (모바일)
          }}
        >
          {images.map((src, index) => (
            <div
              key={src}
              onClick={() => openModal(index)}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                opacity: 0,
                transform: "translateY(24px) scale(0.88)",
                animation: isVisible ? `popIn 0.55s cubic-bezier(0.34, 1.45, 0.64, 1) ${index * 0.04}s forwards` : "none",
                backgroundColor: "#e0e0e0",
              }}
              className="gallery-item"
            >
              <Image
                src={src}
                alt={`포트폴리오 ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        )}
      </div>

      {/* 확대 모달 (라이트박스) */}
      {selectedIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeModal}
        >
          {/* 닫기 버튼 (X) */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "26px",
              height: "26px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              fontWeight: "300",
              color: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              zIndex: 10001,
              lineHeight: "1",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }}
          >
            ✕
          </button>

          {/* 이전 버튼 */}
          {showNavButtons && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "36px",
                height: "36px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10001,
                padding: 0,
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* 다음 버튼 */}
          {showNavButtons && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "36px",
                height: "36px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10001,
                padding: 0,
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* 모달 이미지 */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              animation: "zoomIn 0.3s ease",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={images[selectedIndex]}
                alt={`포트폴리오 ${selectedIndex + 1}`}
                width={1200}
                height={1200}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 스타일 정의 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.88);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.06);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* 기본 hover 효과 */
        .gallery-item:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        /* 모바일: 2열 */
        @media (max-width: 768px) {
          .square-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }

        /* 태블릿: 4열 */
        @media (min-width: 769px) and (max-width: 1023px) {
          .square-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 10px !important;
          }
        }

        /* 데스크톱: 6열 */
        @media (min-width: 1024px) {
          .square-grid {
            grid-template-columns: repeat(6, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
