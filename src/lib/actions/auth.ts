"use server";

import { AuthResult } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { cache } from "react";

export async function signInWithPassword(
  formData: FormData,
): Promise<AuthResult> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  console.log("successfully signed in ", data.user.email);
  return { success: true };
}

export async function signUpNewUser(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function signOutUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  console.log("successfully signed out");
  return { success: true };
}

export async function revalidate() {
  revalidatePath("/", "layout");
}

export const getUser = cache(async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  return data.user;
});
