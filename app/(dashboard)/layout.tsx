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
import Navbar from '@/components/nav-bar';
import UserAvatarMenu from '@/components/user-avatar-menu';

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
    <header>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Navbar links={[{ name: 'Prices', path: '/pricing' }]}>
          {user ? (
            <UserAvatarMenu user={user} handleSignOut={handleSignOut} />
          ) : (
            <Button
              asChild
              className='rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800'
            >
              <Link href='/sign-up'>Sign Up</Link>
            </Button>
          )}
        </Navbar>
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
