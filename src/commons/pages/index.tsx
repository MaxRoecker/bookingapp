import type { ReactNode } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '~/commons/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { Separator } from '../components/separator';
import { Toaster } from '../components/toaster';

export function Index(): ReactNode {
  return (
    <div className="mx-auto my-0 flex max-w-screen-xl flex-col gap-4 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <Link to="/">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            BookingApp
          </h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="md:hidden" icon>
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="..">
                <FormattedMessage id="Properties" defaultMessage="Properties" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="bookings">
                <FormattedMessage id="Bookings" defaultMessage="Bookings" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="hidden flex-row items-center justify-stretch md:flex">
          <Button variant="link" asChild>
            <Link to="..">
              <FormattedMessage id="Properties" defaultMessage="Properties" />
            </Link>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="link" asChild>
            <Link to="bookings">
              <FormattedMessage id="Bookings" defaultMessage="Bookings" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="py-6">
        <Outlet />
      </main>
      <footer className="flex items-center justify-center border-t border-border py-4 text-sm text-muted-foreground">
        BookingApp / {new Date().getFullYear()}
      </footer>
      <Toaster />
    </div>
  );
}
