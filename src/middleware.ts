import { DEFAULT_LOGIN_REDIRECT, publicRoutes, ROLE_ROUTE } from "@/routes";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const userType = req.auth?.user?.userType;

  const isAuthRoute = publicRoutes.includes(nextUrl.pathname);
  if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname === "/waitlist" || nextUrl.pathname === "/") {
    return NextResponse.next(); // Allow the request to proceed
  } else {
   return NextResponse.redirect(new URL("/waitlist", nextUrl));
  }

  return;

  const isRoleRoute = nextUrl.pathname === ROLE_ROUTE;

  if (
    isAuthenticated &&
    (userType === null || userType === undefined) &&
    !isRoleRoute
  ) {
    return NextResponse.redirect(new URL(ROLE_ROUTE, nextUrl));
  }

  if (
    (isAuthRoute && isAuthenticated) ||
    (isRoleRoute && isAuthenticated && userType)
  )
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

  if (!isAuthenticated && !isAuthRoute)
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
