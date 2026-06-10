import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get("code");

  const clientId = import.meta.env.MS_CLIENT_ID;
  const clientSecret = import.meta.env.MS_CLIENT_SECRET;
  const tenantId = import.meta.env.MS_TENANT_ID;

  const redirectUri = "http://localhost:4321/api/auth/callback";

  // scambio code → token
  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    }
  );

  const data = await tokenRes.json();

  console.log("TOKEN RESPONSE:", data);

  cookies.set("auth", data.access_token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24,
  });

  console.log("CALLBACK URL:", url.toString());

  return redirect("/");
};
