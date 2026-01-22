"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function GallerySection() {
  // 이미지 데이터 (여기만 수정하면 자동으로 갤러리 생성됨)
  const images: GalleryImage[] = [
    { src: "/images/001.jpg", alt: "샘플 1" },
    { src: "/images/002.jpg", alt: "샘플 2" },
    { src: "/images/003.jpg", alt: "샘플 3" },
    { src: "/images/004.jpg", alt: "샘플 4" },
    { src: "/images/005.jpg", alt: "샘플 5" },
    { src: "/images/006.jpg", alt: "샘플 6" },
  ];

  // 무한 루프를 위한 이미지 배열 3번 복제 (1장인 경우 제외)
  const infiniteImages = images.length > 1
    ? [...images, ...images, ...images]
    : images;

  // 반응형 카드 폭 설정 (다음 카드가 1/4~1/3 보이도록)
  const CARD_WIDTH = {
    mobile: 39,    // 39vw (2장 + 다음 카드 약 22% 보임)
    tablet: 32,    // 32vw 
    desktop: 24,   // 24vw
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 모달 열기 (복제된 인덱스를 실제 인덱스로 변환)
  const openModal = (index: number) => {
    const actualIndex = images.length > 1 ? index % images.length : index;
    setSelectedIndex(actualIndex);
  };

  // 모달 닫기
  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // 이전 이미지 (무한 루프)
  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
  }, [selectedIndex, images.length]);

  // 다음 이미지 (무한 루프)
  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
  }, [selectedIndex, images.length]);

  // ESC 키 핸들러
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedIndex !== null) {
        closeModal();
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeModal]);

  // 초기 로드 시 중간 세트로 스크롤 위치 설정 (무한 루프 초기화)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || images.length <= 1 || isInitialized) return;

    // 레이아웃 완료 대기
    const timer = setTimeout(() => {
      const firstCard = container.firstElementChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 4; // gap 값
        const scrollPosition = (cardWidth + gap) * images.length;
        container.scrollLeft = scrollPosition;
        setIsInitialized(true);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [images.length, isInitialized]);

  // 스크롤 끝 감지 및 무한 루프 처리
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || images.length <= 1 || !isInitialized) return;

    const handleScroll = () => {
      if (isDragging) return; // 드래그 중에는 처리하지 않음

      const scrollLeft = container.scrollLeft;
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 4;
      const itemWidth = cardWidth + gap;
      const totalOriginalWidth = itemWidth * images.length;

      // 첫 번째 세트 끝에 도달 (왼쪽으로 스크롤)
      if (scrollLeft < itemWidth) {
        container.scrollLeft = scrollLeft + totalOriginalWidth;
      }
      // 세 번째 세트 시작 (오른쪽으로 스크롤)
      else if (scrollLeft >= totalOriginalWidth * 2) {
        container.scrollLeft = scrollLeft - totalOriginalWidth;
      }
    };

    // scrollend 이벤트 사용 (지원 시), 없으면 scroll 이벤트 + debounce
    let scrollTimer: NodeJS.Timeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 150);
    };

    container.addEventListener('scroll', handleScrollEnd);

    return () => {
      container.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(scrollTimer);
    };
  }, [images.length, isDragging, isInitialized]);

  // 힌트 애니메이션 (첫 로드 시 1회만)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isInitialized) return;

    const timer = setTimeout(() => {
      const startPos = container.scrollLeft;
      container.scrollTo({ left: startPos + 50, behavior: "smooth" });

      setTimeout(() => {
        container.scrollTo({ left: startPos, behavior: "smooth" });
      }, 400);
    }, 800);

    return () => clearTimeout(timer);
  }, [isInitialized]);

  // 마우스 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // 마우스 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 마우스 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 1장인 경우 모달 내비게이션 버튼 숨김 여부
  const showNavButtons = images.length > 1;

  return (
    <section
      className="gallery-section"
      style={{
        width: "100%",
        padding: "40px 0",
        position: "relative",
        background: "transparent",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* 갤러리 컨테이너 */}
        <div style={{ position: "relative" }}>
          {/* 가로 스크롤 컨테이너 */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              display: "flex",
              gap: "4px",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: isDragging ? "grabbing" : "grab",
              padding: "8px 0",
              userSelect: "none",
              scrollSnapType: "x mandatory",
            }}
            className="gallery-scroll-container"
          >
            {infiniteImages.map((image, index) => {
              // 어느 세트에 속하는지 계산 (0: 첫번째, 1: 중간, 2: 마지막)
              const setIndex = Math.floor(index / images.length);
              const originalIndex = index % images.length;

              return (
                <div
                  key={`${setIndex}-${originalIndex}`}
                  onClick={() => openModal(index)}
                  style={{
                    minWidth: `${CARD_WIDTH.mobile}vw`,
                    maxWidth: "280px",
                    aspectRatio: "3 / 5",
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    backgroundColor: "#e0e0e0",
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 확대 모달 */}
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
          {/* 닫기 버튼 */}
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
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
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
        .gallery-scroll-container::-webkit-scrollbar {
          display: none;
        }

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

        @media (max-width: 768px) {
  .gallery-scroll-container {
    gap: 4px !important;
  }
  .gallery-scroll-container > div {
    min-width: 39vw !important;
    max-width: none !important;
  }
}

/* 태블릿: 3.5장 */
@media (min-width: 769px) and (max-width: 1023px) {
  .gallery-scroll-container {
    gap: 10px !important;
  }
  .gallery-scroll-container > div {
    min-width: calc((min(100vw, 1200px) - 50px) / 3.5) !important;
    max-width: 260px !important;
  }
}

/* 데스크톱: 5장 + 조각(5.25장) */
@media (min-width: 1024px) {
  .gallery-scroll-container {
    gap: 10px !important;
  }
  .gallery-scroll-container > div {
    min-width: calc((min(100vw, 1200px) - 50px) / 5.25) !important;
    max-width: 230px !important;
  }
}

      `}</style>
    </section>
  );
}
