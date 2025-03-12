import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';

import Stripe from 'stripe';

import content from '../../content.json';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  content.pricing.products.forEach(async (product) => {
    const baseProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    await stripe.prices.create({
      product: baseProduct.id,
      unit_amount: product.unit_amount,
      currency: product.currency,
      recurring: {
        interval: product.recurring
          .interval as Stripe.PriceCreateParams.Recurring.Interval,
        trial_period_days: product.recurring.trial_period_days,
      },
    });
  });

  console.log('Stripe products and prices created successfully.');
}

async function seed() {
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: 'owner',
      },
    ])
    .returning();

  console.log('Initial user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
