import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TelemetryTicker from "@/components/TelemetryTicker";
import FeaturedProject from "@/components/FeaturedProject";
import ProfileSection from "@/components/ProfileSection";
import TechStackSection from "@/components/TechStackSection";
import FooterSection from "@/components/FooterSection";
import GridSpotlight from "@/components/GridSpotlight";
import SmoothScroll from "@/components/SmoothScroll";
import ParticleFlock from "@/components/ParticleFlock";
import GridGuidesOverlay from "@/components/GridGuidesOverlay";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans flex flex-col">
      <SmoothScroll />
      <ParticleFlock />
      <GridSpotlight />
      <GridGuidesOverlay />
      <Header />
      <main className="flex-1 max-w-[1440px] w-full mx-auto border-x border-border relative z-20 pt-14 sm:pt-16">
        <HeroSection />
        <TelemetryTicker />
        <FeaturedProject />
        <ProfileSection />
        <TechStackSection />
        <FooterSection />
      </main>
    </div>
  );
}
