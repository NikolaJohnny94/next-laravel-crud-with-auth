import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { Logo } from '@/components/icons'

type Props = {
  username: string | undefined
  isLoggedIn: boolean
}

export const Navbar = ({ username, isLoggedIn }: Props) => {
  const navItems = siteConfig.navItems.filter((item) => {
    if (isLoggedIn && item.label === 'Dashboard') {
      return item
    }
    if (
      !isLoggedIn &&
      (item.label === 'Login' || item.label === 'Registration')
    ) {
      return item
    }
  })

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <Logo />
            <p className='font-bold text-inherit'>ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-4 justify-start ml-2'>
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {isLoggedIn && (
            <NavbarItem className='text-danger'>{username}</NavbarItem>
          )}
        </ul>
      </NavbarContent>
    </NextUINavbar>
  )
}
