"use client";

import styles from "./BrandMarquee.module.css";

const BRAND_LOGOS = [
  "/images/b1.png",
  "/images/b2.png",
  "/images/b3.png",
  "/images/b4.png",
  "/images/b5.png",
  "/images/b6.png",
  "/images/b7.png",
  "/images/b8.png",
  "/images/b9.png",
];

export default function BrandMarquee() {
  // 각 로고를 2번 복제해서 끊김 없는 루프 생성
  const duplicatedLogos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 타이틀 */}
        <h2 className={styles.title}>많은 브랜드가 함께 하고 있습니다</h2>

        {/* 마키 라인들 */}
        <div className={styles.marqueeWrapper}>
          {/* 첫 번째 줄: 왼쪽 → 오른쪽 */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeContent} ${styles.scrollLeft}`}>
              {duplicatedLogos.map((logo, idx) => (
                <div key={`line1-${idx}`} className={styles.logoItem}>
                  <img src={logo} alt={`brand-${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 두 번째 줄: 오른쪽 → 왼쪽 */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeContent} ${styles.scrollRight}`}>
              {duplicatedLogos.map((logo, idx) => (
                <div key={`line2-${idx}`} className={styles.logoItem}>
                  <img src={logo} alt={`brand-${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 세 번째 줄: 왼쪽 → 오른쪽 */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeContent} ${styles.scrollLeft}`}>
              {duplicatedLogos.map((logo, idx) => (
                <div key={`line3-${idx}`} className={styles.logoItem}>
                  <img src={logo} alt={`brand-${idx}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
