# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

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

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Local Database Setup

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

### Setting Up the Database

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

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

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

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
