"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SlideMenu from "./SlideMenu";
import styles from "./StickyHeader.module.css";

interface MenuItem {
  label: string;
  id?: string;
  onClick?: () => void;
}

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"hidden" | "visible">("hidden");
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.refresh();
  }, [router]);

  // 스크롤 감지 - Hero 영역을 벗어나면 헤더 표시 (메모이제이션하여 함수 참조 일정화)
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setHeaderState(scrollY > 400 ? "visible" : "hidden");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const handleMenuClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.id) {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          headerState === "visible" ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.wrapper}>
          {/* 모바일 햄버거 메뉴 */}
          <button
            className={`${styles.menuButton} ${styles.mobileOnly}`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            ☰
          </button>

          {/* 로고 */}
          <div
            className={styles.logo}
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
          >
            <Image
              src="/images/logo.png"
              alt="PhotoGroove"
              width={160}
              height={40}
              priority
              className={styles.logoImage}
            />
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className={`${styles.menu} ${styles.desktopOnly}`}>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={styles.menuItem}
                onClick={() => handleMenuClick(item)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 슬라이드 메뉴 */}
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems}
      />
    </>
  );
}
