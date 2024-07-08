import { revalidate, signInWithPassword } from "@/lib/actions/auth";
import NextLink from "next/link";
import { Button, Input, Link } from "@nextui-org/react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm({ onClose }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(async () => {
      const result = await signInWithPassword(formData);
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
      <Input autoFocus variant="bordered" label="Email" name="email" />
      <Input
        variant="bordered"
        type="password"
        label="Password"
        name="password"
      />
      {/* Dumb fix */}
      <Input className="opacity-0" variant="bordered" label="ignore" />
      {error && <p className="text-danger">{error}</p>}
      <Link
        as={NextLink}
        onClick={onClose}
        href="/forgot-password"
        color="primary"
        className="flex justify-end"
      >
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
