import { loginWithMagicLinkUseCase } from "@/use-cases/magic-link";

export const dynamic = 'force-dynamic';

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/sign-in/magic/error",
        },
      });
    }
    const user = await loginWithMagicLinkUseCase(token);
    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/sign-in/magic/error",
        },
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error("Error signing in with magic link", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/sign-in/magic/error",
      },
    });
  }
}
