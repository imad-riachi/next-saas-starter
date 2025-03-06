'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <header className='border-b border-gray-200'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link href='/' className='flex items-center'>
          <CircleIcon className='h-6 w-6 text-orange-500' />
          <span className='ml-2 text-xl font-semibold text-gray-900'>ACME</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          <Link
            href='/pricing'
            className='text-sm font-medium text-gray-700 hover:text-gray-900'
          >
            Pricing
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className='size-9 cursor-pointer'>
                  <AvatarImage alt={user.name || ''} />
                  <AvatarFallback>
                    {user.email
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='flex flex-col gap-1'>
                <DropdownMenuItem className='cursor-pointer'>
                  <Link href='/dashboard' className='flex w-full items-center'>
                    <Home className='mr-2 h-4 w-4' />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className='w-full'>
                  <button type='submit' className='flex w-full'>
                    <DropdownMenuItem className='w-full flex-1 cursor-pointer'>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className='rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800'
            >
              <Link href='/sign-up'>Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex min-h-screen flex-col'>
      <Header />
      {children}
    </section>
  );
}
