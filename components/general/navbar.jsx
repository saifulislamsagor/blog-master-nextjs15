import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar({req, res}) {
  const { getUser } = getKindeServerSession(req, res);

  const user = await getUser();

  return (
    <nav className="py-5 flex items-baseline md:items-center justify-between">
      <div className="flex flex-col md:flex-row items-center gap-6 ">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Blog<span className="text-blue-500">Master</span>
          </h1>
        </Link>
        <div className="flex flex-col md:flex md:flex-row items-center gap-6">
          <Link
            href={"/"}
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/dashboard"}
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink><Button variant="secondary">Log Out</Button></LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink>
            <Button variant="outline">Sign in</Button>{" "}
          </LoginLink>
          <RegisterLink>
            <Button variant="secondary">Sign Up</Button>{" "}
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
