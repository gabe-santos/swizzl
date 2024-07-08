import { revalidate, signUpNewUser } from "@/lib/actions/auth";
import NextLink from "next/link";
import { Button, Input, Link } from "@nextui-org/react";
import { useTransition, useState } from "react";

export default function SignUpForm({ onClose }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("email"));

    startTransition(async () => {
      const result = await signUpNewUser(formData);
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
        revalidate();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-4">
      <Input autoFocus variant="bordered" label="Name" name="name" />
      <Input variant="bordered" label="Email" name="email" />
      <Input
        variant="bordered"
        type="password"
        label="Password"
        name="password"
      />
      <Link as={NextLink} href="#" color="primary" className="flex justify-end">
        Forgot password?
      </Link>
      <div className="flex justify-end">
        <Button type="submit" color="primary" isLoading={isPending}>
          Sign in
        </Button>
      </div>
    </form>
  );
}
