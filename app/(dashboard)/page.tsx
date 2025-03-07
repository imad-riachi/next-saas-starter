import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database } from 'lucide-react';
import { Terminal } from './terminal';
import HeroSection from '@/components/hero-section';
import FeatureCard from '@/components/feature-card';

import content from './content.json';

export default function HomePage() {
  return (
    <main>
      <section>
        <HeroSection
          href={content.hero.href}
          ctaText={content.hero.ctaText}
          heroText={content.hero.heroText}
          heroDescriptionHeading={content.hero.heroDescriptionHeading}
          heroDescription={content.hero.heroDescription}
        />
      </section>
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold text-orange-500'>
              Powerful Features
            </h2>
            <h1 className='mt-2 text-3xl font-bold text-gray-900 sm:text-4xl'>
              Everything You Need in One Assistant
            </h1>
            <p className='mt-4 text-lg text-gray-500'>
              VirtualBot combines cutting-edge AI with intuitive design to
              provide a seamless and helpful experience for all your needs.
            </p>
          </div>
          <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            <FeatureCard
              icon='Database'
              title='Robust Database'
              description='Efficient data management with a scalable database solution.'
            />
            <FeatureCard
              icon='CreditCard'
              title='Secure Payments'
              description='Seamless payment processing with top-notch security.'
            />
            <FeatureCard
              icon='Terminal'
              title='Developer Tools'
              description='Advanced tools for developers to streamline workflows.'
            />
          </div>
        </div>
      </section>
    </main>
  );
}
