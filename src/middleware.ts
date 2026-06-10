import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = context.url.pathname;

  const isApi = url.startsWith("/api");
  const isLoginPage = url.startsWith("/login");

  const authCookie = context.cookies.get("auth");

  let isLoggedIn = false;

  if (authCookie?.value) {
    try {
      const payload = JSON.parse(
        Buffer.from(authCookie.value.split(".")[1], "base64").toString()
      );

      const now = Math.floor(Date.now() / 1000);

      // TOKEN SCADUTO
      if (payload.exp < now) {
        isLoggedIn = false;
      } else {
        const email =
          payload?.preferred_username ||
          payload?.email ||
          payload?.upn ||
          payload?.unique_name;

        if (email && email.toLowerCase().endsWith("@centrosoftware.com")) {
          isLoggedIn = true;
        }
      }

    } catch (err) {
      console.error("JWT ERROR:", err);
      isLoggedIn = false;
    }
  }

  console.log("AUTH:", isLoggedIn, "PATH:", url);

  // ✅ NON loggato → forza login
  if (!isApi && !isLoginPage && !isLoggedIn) {
    return Response.redirect(new URL("/login", context.url));
  }

  // ✅ GIÀ loggato → evita login page
  if (isLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/", context.url));
  }

  return next();
});
