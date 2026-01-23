"use client";

import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <section className={styles.hero}>
      {/* 배경 이미지 */}
      <div className={styles.bg} />

      {/* 어두운 오버레이 */}
      <div className={styles.overlay} />

      {/* 텍스트 컨테이너 (왼쪽 정렬) */}
      <div className={styles.copy}>
        <p className={styles.kicker}>당신과 당신의 사람들을 기록하세요</p>
        <h1 className={styles.title}>
          RECORD YOU
        </h1>
        <p className={styles.desc}>
          프로그램만 설치 가능
          <br />
          결혼식장 · 학교 행사 · 대학교 축제 · 기업 행사
        </p>
      </div>
    </section>
  );
}
