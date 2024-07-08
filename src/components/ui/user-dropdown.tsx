"use client";
import { revalidate, signOutUser } from "@/lib/actions/auth";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function UserDropdown({ name }: { name: string }) {
  const handleSubmit = async () => {
    const { error } = await signOutUser();
    if (error) console.log("error signing out");
    else {
      await revalidate();
    }
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
        <DropdownItem key="favorites">Favorites</DropdownItem>
        <DropdownItem key="signout" color="danger">
          <button onClick={handleSubmit} type="submit">
            Sign out
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
