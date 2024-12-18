'use client'
//Core
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
// NextUI
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { link as linkStyles } from '@nextui-org/theme'
// React Icons
import { FaUserAlt } from 'react-icons/fa'
import { PiUserCirclePlusBold } from 'react-icons/pi'
import { FiLogIn } from 'react-icons/fi'
// clsx
import clsx from 'clsx'
//Components
import { ThemeSwitch } from '@/components/'
import { Logout } from './LogoutButton'
//Config
import { siteConfig } from '@/config/site'

type Props = {
  username: string | undefined
  isLoggedIn: boolean
}

export const Navbar = ({ username, isLoggedIn }: Props) => {
  const pathname = usePathname()

  const navItems = siteConfig.navItems.filter((item) => {
    if (isLoggedIn && item.label === 'Dashboard') {
      return item
    }
    if (!isLoggedIn) {
      if (pathname === '/auth/login' && item.label === 'Registration') {
        return item
      }

      if (pathname === '/auth/registration' && item.label === 'Login') {
        return item
      }
    }
  })

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent
        className='basis-1/5 sm:basis-full !flex !justify-between'
        justify='start'
      >
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <ThemeSwitch />
            <p className='font-bold text-inherit ml-2'>Next 14 + Laravel</p>
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
                {item.label === 'Registration' && (
                  <span className='mr-2'>
                    <PiUserCirclePlusBold size={20} />
                  </span>
                )}

                {item.label === 'Login' && (
                  <span className='mr-2'>
                    <FiLogIn size={20} />
                  </span>
                )}
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {isLoggedIn && (
            <div className='flex justify-center items-center gap-4'>
              <NavbarItem className='text-danger text-sm flex justify-center items-center'>
                <span className='mr-2'>
                  <FaUserAlt size={15} />
                </span>{' '}
                <span className='font-semibold'> {username}</span>
              </NavbarItem>
              <Logout />
            </div>
          )}
        </ul>
      </NavbarContent>
    </NextUINavbar>
  )
}
