"use client";
import { revalidate, signOutUser } from "@/lib/actions/auth";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function UserDropdown({ name }: { name: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    const { error } = await signOutUser();

    startTransition(async () => {
      if (error) console.log("error signing out");
      else {
        revalidate();
        router.refresh();
      }
    });
  };

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div className="flex gap-2 font-medium items-center hover:cursor-pointer">
          {name}
          <Avatar radius="full" />
        </div>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem as={Link} href="/favorites" key="favorites">
          Favorites
        </DropdownItem>
        <DropdownItem key="signout" color="danger">
          <div>
            <button onClick={handleSubmit} type="submit">
              Sign out
            </button>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
