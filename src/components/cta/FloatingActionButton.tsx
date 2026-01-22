"use client";

import Image from "next/image";

const PHONE_NUMBER = "010-0000-0000"; // TODO: 실제 번호로 교체
const KAKAO_URL = "http://pf.kakao.com/_zRMZj";

interface FloatingButton {
  id: string;
  label: string;
  icon?: string;
  text?: string;
  backgroundColor: string;
  onClick?: () => void;
  href?: string;
}

export default function FloatingActionButton() {
  const handleScrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/-/g, "")}`;
  };

  const buttons: FloatingButton[] = [
    {
      id: "kakao",
      label: "카카오톡 문의",
      icon: "/icons/kakao-talk.svg",
      backgroundColor: "#FFE812",
      href: KAKAO_URL,
    },
    {
      id: "contact",
      label: "문의 폼으로 이동",
      text: "문의",
      backgroundColor: "#003DA5",
      onClick: handleScrollToForm,
    },
    {
      id: "phone",
      label: "전화걸기",
      icon: "/icons/handset.svg",
      backgroundColor: "#4A4A4A",
      onClick: handleCallClick,
    },
    {
      id: "top",
      label: "맨 위로",
      icon: "/icons/arrow-up.svg",
      text: "TOP",
      backgroundColor: "#FFFFFF",
      onClick: handleScrollToTop,
    },
  ];

  return (
    <div
      className="floating-action-buttons"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "100px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 999,
      }}
    >
      {buttons.map((btn) => (
        <a
          key={btn.id}
          href={btn.href}
          target={btn.href ? "_blank" : undefined}
          rel={btn.href ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (btn.onClick) {
              e.preventDefault();
              btn.onClick();
            }
          }}
          aria-label={btn.label}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: btn.backgroundColor,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            textDecoration: "none",
            gap: "2px",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.14)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          {/* 카카오 버튼: 아이콘 크게 */}
          {btn.id === "kakao" && btn.icon && (
            <img
              src={btn.icon}
              alt={btn.label}
              width={30}
              height={30}
              style={{
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
              onError={(e) => {
                // Fallback: SVG 말풍선 아이콘
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  svg.setAttribute("width", "28");
                  svg.setAttribute("height", "28");
                  svg.setAttribute("viewBox", "0 0 24 24");
                  svg.setAttribute("fill", "#3C1E1E");
                  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                  path.setAttribute("d", "M12 2C6.48 2 2 5.58 2 10c0 2.54 1.19 4.85 3.15 6.37.15.1.24.3.2.48l-.5 2.5c-.07.35.27.6.56.37l2.9-2.07c.14-.1.32-.1.47 0 .96.59 2.06.91 3.22.91 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z");
                  svg.appendChild(path);
                  parent.appendChild(svg);
                }
              }}
            />
          )}
          {/* TOP 버튼: 화살표 + TEXT */}
          {btn.id === "top" && btn.icon && (
            <>
              <Image
                src={btn.icon}
                alt="up"
                width={20}
                height={20}
                style={{
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                TOP
              </span>
            </>
          )}
          {/* 문의 버튼: 텍스트만 */}
          {btn.id === "contact" && btn.text && (
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {btn.text}
            </span>
          )}
          {/* 전화 버튼: 아이콘만 */}
          {btn.id === "phone" && btn.icon && (
            <img
              src={btn.icon}
              alt={btn.label}
              width={28}
              height={28}
              style={{
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
              onError={(e) => {
                // Fallback: SVG 수화기 아이콘
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  svg.setAttribute("width", "22");
                  svg.setAttribute("height", "22");
                  svg.setAttribute("viewBox", "0 0 24 24");
                  svg.setAttribute("fill", "none");
                  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                  path.setAttribute("d", "M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z");
                  path.setAttribute("fill", "white");
                  svg.appendChild(path);
                  parent.appendChild(svg);
                }
              }}
            />
          )}
        </a>
      ))}
    </div>
  );
}
