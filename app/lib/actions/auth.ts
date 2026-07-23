"use server";

export type AuthState = {
  success: boolean;
  error?: string;
  fieldErrors?: { email?: string; password?: string };
};

function validate(formData: FormData) {
  const fieldErrors: AuthState["fieldErrors"] = {};
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = "Ingresa un correo electrónico válido";
  if (!password || password.length < 6)
    fieldErrors.password = "La contraseña debe tener al menos 6 caracteres";

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const fieldErrors = validate(formData);
  if (fieldErrors) return { success: false, fieldErrors };

  const token = formData.get("cf-turnstile-response") as string;
  if (!token)
    return { success: false, error: "Completa la verificación de seguridad." };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret)
    return { success: false, error: "Error de configuración del servidor." };

  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    },
  ).then((r) => r.json());

  if (!verify.success)
    return { success: false, error: "Verificación de seguridad fallada. Intenta de nuevo." };

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email === "admin@ra2plabs.com" && password === "admin123") {
    return { success: true };
  }

  return { success: false, error: "Credenciales inválidas." };
}
