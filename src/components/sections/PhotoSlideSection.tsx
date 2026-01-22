"use client";

import SlideInOnScroll from "@/src/components/animations/SlideInOnScroll";

const images = [
  "/images/photo.jpg",
  "/images/studio.jpg",
  "/images/photo.jpg",   // 테스트용 반복 (나중에 원하는 이미지 추가)
];

export default function PhotoSlideSection() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {images.map((src, index) => {
        const direction = index % 2 === 0 ? "left" : "right";

        return (
          <SlideInOnScroll key={index} direction={direction}>
            <div
              style={{
                width: "100%",
                maxWidth: 1100,
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={src}
                alt={`slide-${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          </SlideInOnScroll>
        );
      })}
    </section>
  );
}
