"use client";

import Image from "next/image";

export default function FooterSection() {
  return (
    <footer
      className="footer-section"
      style={{
        width: "100%",
        overflow: "hidden",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      <div
        className="footer-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* 로고 섹션 */}
        <div
          className="footer-logo-section"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="METApay"
            width={120}
            height={30}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* 회사 정보 섹션 */}
        <div
          className="footer-info-section"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 500,
              color: "#ccc",
              lineHeight: 1.6,
            }}
          >
            상호명: 메타페이   대표: 구기완
            <br />
            사업자 등록 번호: 504-32-94898   개인정보 관리자: 구지은
            <br />
            주소: 대전시 중구 목동로 70, 1101호
          </p>
        </div>

        {/* 링크 섹션 */}
        <div
          className="footer-links-section"
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="http://pf.kakao.com/_zRMZj"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#999",
              textDecoration: "none",
              transition: "color 0.3s ease",
              paddingBottom: "2px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#003DA5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#999";
            }}
          >
            개인정보 처리방침
          </a>
          <span
            style={{
              width: "1px",
              height: "12px",
              background: "#555",
            }}
          />
          <a
            href="http://pf.kakao.com/_zRMZj"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#999",
              textDecoration: "none",
              transition: "color 0.3s ease",
              paddingBottom: "2px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#003DA5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#999";
            }}
          >
            서비스 이용 약관
          </a>
        </div>

        {/* 카피라이트 */}
        <div
          className="footer-copyright"
          style={{
            paddingTop: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
            }}
          >
            COPYRIGHT (C) METApay ALL Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
