"use client";

import { useEffect, useRef } from "react";

interface MenuItem {
  label: string;
  id?: string;
  onClick?: () => void;
}

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

export default function SlideMenu({ isOpen, onClose, items }: SlideMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ESC 키로 닫기
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // 메뉴 열릴 때 body 스크롤 잠금
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id) {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (item.onClick) {
      item.onClick();
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`slide-menu-backdrop ${isOpen ? "visible" : ""}`}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 3000,
        }}
      />

      {/* 슬라이드 메뉴 패널 */}
      <div
        ref={menuRef}
        className={`slide-menu-panel ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "280px",
          backgroundColor: "#fff",
          boxShadow: isOpen ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 3001,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* 메뉴 헤더: 닫기 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px 16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#333",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            flex: 1,
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuItemClick(item)}
              style={{
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 700,
                border: "none",
                background: "none",
                textAlign: "left",
                cursor: "pointer",
                color: "#333",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
