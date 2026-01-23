"use client";

import StickyHeader from "@/src/components/header/StickyHeader";
import HeroIntro from "@/src/components/sections/HeroIntro";
import GallerySection from "@/src/components/sections/GallerySection";
import ConversionForm from "@/src/components/forms/ConversionForm";
import FloatingActionButton from "@/src/components/cta/FloatingActionButton";
import PromoTiles from "@/src/components/tiles/PromoTiles";
import MidCtaSection from "@/src/components/sections/MidCtaSection";
import SquareGallerySection from "@/src/components/sections/SquareGallerySection";
import PricingSection from "@/src/components/sections/PricingSection";
import BlackCtaSection from "@/src/components/sections/BlackCtaSection";
import BrandMarquee from "@/src/components/sections/BrandMarquee";
import ReviewsCarousel from "@/src/components/sections/ReviewsCarousel";
import FooterSection from "@/src/components/footer/FooterSection";

export default function Page() {
  return (
    <>
      <StickyHeader />
      
      {/* 히어로 섹션 (고정 헤더 위로 겹쳐서 표시) */}
      <HeroIntro />

      {/* 프로모 타일 섹션 - Hero 바로 아래 */}
      <div id="promo-tiles">
        <PromoTiles />
      </div>

      <main className="pg-main" style={{ position: "relative", zIndex: 2 }}>
        {/* 중간 CTA 섹션 */}
        <MidCtaSection />
        
        {/* 정사각형 포트폴리오 갤러리 */}
        <SquareGallerySection />
        
        <div id="brand-marquee">
          <BrandMarquee />
        </div>

        <div id="reviews-carousel">
          <ReviewsCarousel />
        </div>

        {/* 가격표 섹션 */}
        <PricingSection />

        {/* 블랙 CTA 섹션 */}
        <BlackCtaSection />

        {/* 갤러리 섹션 */}
        <GallerySection />

        {/* 앵커 타겟 */}
        <div id="lead-form">
          <ConversionForm />
        </div>
      </main>

      <FooterSection />

      <FloatingActionButton />
    </>
  );
}
