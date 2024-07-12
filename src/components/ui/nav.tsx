import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import UserDropdown from "./user-dropdown";
import { getUser } from "@/lib/actions/auth";
import { Button, Link } from "@nextui-org/react";

const menuItems = [
  { title: "Home", route: "/" },
  { title: "Sign in / Sign up", route: "/signin" },
  { title: "Favorites", route: "/favorites" },
];

export default async function Nav({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={false}
      maxWidth="full"
      className="mt-4 mb-6 "
    >
      <NavbarContent justify="center" className="w-full">
        <NavbarBrand className="flex-grow-0">
          <>
            <Link
              as={NextLink}
              color="foreground"
              href="/"
              className="text-3xl font-medium md:inline hidden"
            >
              swizzl🍹
            </Link>
            <NavbarMenuToggle className="md:hidden text-3xl" icon="🍹" />
          </>
        </NavbarBrand>

        {/* Hidden on smaller screens */}
        <NavbarItem className="flex-grow flex-1 gap-1 flex justify-center max-w-screen-lg">
          {children}
        </NavbarItem>

        <NavbarItem className="hidden md:flex flex-grow-0">
          {user ? (
            <UserDropdown name={user.user_metadata.first_name} />
          ) : (
            <Button as={Link} href="/signin" variant="light" size="lg">
              Sign In
            </Button>
          )}
        </NavbarItem>

        <NavbarMenu className="p-8 flex flex-col gap-4">
          {menuItems.map((i) => {
            return (
              <NavbarMenuItem key={i.title}>
                <Link
                  href={i.route}
                  color="foreground"
                  className="text-4xl font-regular"
                >
                  {i.title}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
