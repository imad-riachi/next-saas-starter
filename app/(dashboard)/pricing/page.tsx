import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';

import PricingHeader from '@/components/pricing-header';
import PriceCard from '@/components/pricing-card';

import content from './content.json';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <PricingHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      />
      <div className='grid gap-8 md:grid-cols-2'>
        <PriceCard
          name={basePlan?.name || 'Base'}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval || 'month'}
          trialDays={basePrice?.trialPeriodDays || 7}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
          ]}
          gradientFrom='from-orange-400'
          gradientTo='to-orange-500'
          hoverBorderColor='border-orange-300'
          hoverShadowColor='shadow-orange-100'
          hoverFrom='from-orange-300'
          hoverTo='to-orange-400'
          featured={false}
          priceId={basePrice?.id}
        />
        <PriceCard
          name='Base'
          price={12}
          interval='month'
          trialDays={7}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
          ]}
          gradientFrom='from-pink-400'
          gradientTo='to-pink-500'
          hoverFrom='from-pink-300'
          hoverTo='to-pink-400'
          hoverBorderColor='border-pink-300'
          hoverShadowColor='shadow-pink-100'
          featured={false}
          priceId={plusPrice?.id}
        />
      </div>
    </main>
  );
}
