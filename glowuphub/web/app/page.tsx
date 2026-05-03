"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { MeetTheExpert } from "@/components/meet-the-expert";
import { BlogSection } from "@/components/blog-section";
import { Pricing } from "@/components/pricing";
import { AppShowcase } from "@/components/app-showcase";
import { Footer } from "@/components/footer";
import { ComparisonSection } from "@/components/comparison-section";
import { TargetingSection } from "@/components/targeting-section";
import { DownloadCTA } from "@/components/download-cta";
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero handles its own internal animation */}
      <Hero />

      <FadeIn>
        <Features />
      </FadeIn>

      <FadeIn>
        <Testimonials />
      </FadeIn>

      <FadeIn>
        <ComparisonSection />
      </FadeIn>

      <FadeIn>
        <TargetingSection />
      </FadeIn>

      <FadeIn>
        <About />
      </FadeIn>

      <FadeIn>
        <MeetTheExpert />
      </FadeIn>

      <FadeIn>
        <AppShowcase />
      </FadeIn>

      <FadeIn>
        <Pricing />
      </FadeIn>

      <FadeIn>
        <BlogSection />
      </FadeIn>

      <FadeIn>
        <DownloadCTA />
      </FadeIn>

      <Footer />
    </main>
  );
}
