import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect }) => {
  const clientId = import.meta.env.MS_CLIENT_ID;
  const tenantId = import.meta.env.MS_TENANT_ID;

  console.log("CLIENT ID:", import.meta.env.MS_CLIENT_ID);

  const redirectUri = "http://localhost:4321/api/auth/callback";

  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      response_mode: "query",
      scope: "openid profile email",
    });

  return redirect(url);
};