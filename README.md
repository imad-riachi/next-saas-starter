# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://leonairdo.honulabs.xyz/](https://leonairdo.honulabs.xyz/)**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
  - [1. Vercel Account](#1-vercel-account)
  - [2. Stripe Account and Webhook Setup](#2-stripe-account-and-webhook-setup)
  - [3. Supabase Database](#3-supabase-database)
- [Getting Started](#getting-started)
- [Environment Variables Setup And Running Locally](#environment-variables-setup-and-running-locally)
  - [Detailed Setup Instructions](#detailed-setup-instructions)
  - [Important Notes](#important-notes)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites-1)
  - [Database Commands](#database-commands)
  - [Run The App Locally](#run-the-app-locally)
  - [Accessing pgAdmin](#accessing-pgadmin)
  - [Database Connection Details](#database-connection-details)
  - [Cleaning Up](#cleaning-up)
- [Testing Payments](#testing-payments)
- [Going to Production](#going-to-production)
- [Other Templates](#other-templates)

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Prerequisites

Before you begin setting up this project, you'll need to have the following accounts and configurations ready:

### 1. Vercel Account

- Sign up for a Vercel account at [vercel.com](https://vercel.com)
- Create a new project in your Vercel dashboard
- You'll need this to deploy your application to production

### 2. Stripe Account and Webhook Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Install the Stripe CLI:
   - **macOS** (using Homebrew):
     ```bash
     brew install stripe/stripe-cli/stripe
     ```
   - **Windows** (using Scoop):
     ```bash
     scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
     scoop install stripe
     ```
   - **Linux**:
     ```bash
     # Download the latest Linux tar.gz
     curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
     echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
     sudo apt update
     sudo apt install stripe
     ```
   - **Alternative**: Download directly from [Stripe CLI releases](https://github.com/stripe/stripe-cli/releases/latest)
3. Set up a webhook endpoint:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - For local development:
     - Use the Stripe CLI command: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
     - Copy the webhook signing secret (starts with `whsec_`)
   - For production:
     - Set the endpoint URL to `https://your-domain.com/api/stripe/webhook`
     - Select events to listen for:
       - `checkout.session.completed`
       - `customer.subscription.updated`
       - `customer.subscription.deleted`
     - Copy the webhook signing secret
4. Get your API keys:
   - Go to Stripe Dashboard → Developers → API keys
   - Copy your "Secret key" (starts with `sk_test_` for test mode)
   - Keep these keys secure and never commit them to version control
   - To automatically create your Stripe products:
     - Products are defined in `content.json` under the `pricing.products` section
     - Run `pnpm stripe:create-products` to create the products in your Stripe account
     - This script is safe to run multiple times - it won't affect existing products (including archived ones) that match the ones defined in `content.json`

### 3. Supabase Database

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string:
   - Go to Project Settings → Database
   - Find the "Connection string" section
   - Copy the "URI" connection string
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
   - Keep this connection string secure and never commit it to version control

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Environment Variables Setup

The repository includes a `.env.example` file that you can use as a template. To get started:

1. Copy the example file:

```bash
cp .env.example .env
```

2. Update the values in your `.env` file with your own configuration:

```env
# Database URL for PostgreSQL
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# For local development with Docker, use:
POSTGRES_URL=postgresql://postgres:postgres@localhost:5433/saas_db

# Stripe Configuration
# Get these from your Stripe Dashboard (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Base URL for your application
# For local development:
BASE_URL=http://localhost:3000

# Authentication Secret
# Generate a random string using: openssl rand -base64 32
AUTH_SECRET=your_generated_auth_secret
```

### Detailed Setup Instructions

1. **Database URL (POSTGRES_URL)**:

   - For local development with Docker: `postgresql://postgres:postgres@localhost:5433/saas_db`
   - For production: Use your production database URL
   - Make sure the database is running before starting the application

2. **Stripe Configuration**:

   - Sign up for a Stripe account at https://stripe.com
   - Go to the Stripe Dashboard → Developers → API keys
   - Copy your "Secret key" (starts with `sk_test_` for test mode)
   - For webhook secret:
     - Go to Stripe Dashboard → Developers → Webhooks
     - Create a new webhook endpoint pointing to your application
     - Copy the "Signing secret" (starts with `whsec_`)
   - To automatically create your Stripe products:
     - Products are defined in `content.json` under the `pricing.products` section
     - Run `pnpm stripe:create-products` to create the products in your Stripe account
     - This script is safe to run multiple times - it won't affect existing products (including archived ones) that match the ones defined in `content.json`

3. **Base URL (BASE_URL)**:

   - For local development: `http://localhost:3000`
   - For production: Your actual domain (e.g., `https://your-app.com`)

4. **Auth Secret (AUTH_SECRET)**:
   - Generate a secure random string using:
     ```bash
     openssl rand -base64 32
     ```
   - Copy the generated string
   - Keep this secret secure and never commit it to version control

### Important Notes

- Never commit your `.env` file to version control
- Keep your production secrets secure and rotate them regularly
- Use different API keys for development and production environments
- The provided values in the example are for illustration only - you must replace them with your own values

## Local Setup

This project uses Docker to run PostgreSQL and pgAdmin locally. The setup is isolated to avoid conflicts with other local databases.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Make (usually pre-installed on Unix-based systems)

### Database Commands

The following Make commands are available to manage your local database:

```bash
# Start the database and pgAdmin
make db-up

# Stop the database and pgAdmin
make db-down

# Stop and remove all containers and volumes (this will delete all data)
make db-clean

# View database logs
make db-logs

# Check status of database containers
make db-status

# Show database connection information
make db-info
```

### Run The App Locally

1. Start the database:

```bash
make db-up
```

2. Verify the database is running:

```bash
make db-status
```

3. Run database migrations:

```bash
pnpm db:migrate
```

4. Seed the database with initial data:

```bash
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

4. Setup products in Stripe:

```bash
pnpm stripe:create-products
```

This will setup the default products:

```json
[
  {
    "name": "Base",
    "description": "Base subscription plan",
    "unit_amount": 800,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  },
  {
    "name": "Plus",
    "description": "Plus subscription plan",
    "unit_amount": 1200,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  },
  {
    "name": "Enterprise",
    "description": "Enterprise subscription plan",
    "unit_amount": 12000,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  }
]
```

Feel free to edit the `content.json` file in the root folder to set different products.

5. Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

### Accessing pgAdmin

1. Open pgAdmin in your browser at `http://localhost:5051`
2. Log in with:

   - Email: admin@admin.com
   - Password: admin

3. Connect to your PostgreSQL database:
   - Right-click on "Servers" in the left sidebar
   - Select "Register" → "Server"
   - In the "General" tab:
     - Name: "SaaS Starter DB" (or any name you prefer)
   - In the "Connection" tab:
     - Host name/address: `postgres` (this is the Docker service name)
     - Port: `5432` (use the internal container port)
     - Maintenance database: `saas_db`
     - Username: `postgres`
     - Password: `postgres`
   - Click "Save"

### Database Connection Details

- **Host**: localhost
- **Port**: 5433 (external port for host machine)
- **Database**: saas_db
- **Username**: postgres
- **Password**: postgres

Note: When connecting from pgAdmin (which runs in Docker), use:

- Host: `postgres` (Docker service name)
- Port: `5432` (internal container port)

### Cleaning Up

To completely remove the database and all its data:

```bash
make db-clean
```

This will:

- Stop all containers
- Remove all containers
- Remove all volumes (deleting all data)
- Remove the custom network

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `POSTGRES_URL`: Set this to your production database URL.
5. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.

To set up your production environment variables on Vercel, you can use the `.env.vercel` file:

```bash
# Create .env.vercel file with your production variables
cp .env.example .env.vercel

# Edit .env.vercel with your production values
# Then deploy the environment variables to Vercel
pnpm deploy-env
```

This will sync your `.env.vercel` file with your Vercel project's environment variables. Note that this is separate from your local `.env` file and is specifically for managing production environment variables on Vercel.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
