import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import AuthoLayout from "@/layouts/autho";

export default function SignUpPage() {
  const { theme } = useTheme();

  const formTheme = theme === "dark" ? dark : undefined;
  return (
    <AuthoLayout>
      <SignIn
        appearance={{
          baseTheme: formTheme,
        }}
      />
    </AuthoLayout>
  );
}
