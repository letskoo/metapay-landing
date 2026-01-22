"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SlideMenu from "./SlideMenu";

interface MenuItem {
  label: string;
  id?: string;
  onClick?: () => void;
}

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.refresh();
  }, [router]);

  const menuItems: MenuItem[] = [
    {
      label: "홈",
      onClick: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      label: "예비부부",
      id: "photo-slide",
    },
    {
      label: "결혼식장",
      id: "promo-tiles",
    },
    {
      label: "제휴",
      onClick: () => {
        window.open("https://www.photogroove.co.kr", "_blank");
      },
    },
  ];

  return (
    <>
      <header className="pg-header">
        <div
          className="header-wrapper"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* 햄버거 메뉴 버튼 (왼쪽) - 모든 화면에 표시 */}
          <button
            className="header-menu-button"
            onClick={() => setIsMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#333",
              padding: "4px 8px",
              position: "absolute",
              left: "16px",
            }}
            aria-label="메뉴 열기"
          >
            ☰
          </button>

          {/* 로고 (항상 가운데 정렬) */}
          <div
            className="header-logo"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="PhotoGroove"
              width={160}
              height={40}
              priority
              style={{ objectFit: "contain" }}
              className="header-logo-image"
            />
          </div>
        </div>
      </header>

      {/* 슬라이드 메뉴 - 모든 화면에서 동작 */}
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems}
      />

      {/* 데스크톱 헤더 크기 증가 스타일 */}
      <style>{`
        @media (min-width: 768px) {
          .pg-header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .pg-header .header-wrapper {
            padding: 20px 20px;
          }

          .header-logo-image {
            width: 200px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </>
  );
}
