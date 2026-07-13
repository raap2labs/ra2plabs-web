"use server";

export type ContactState = {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
};

function validate(formData: FormData): Record<string, string> | null {
  const errors: Record<string, string> = {};

  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  if (!name || name.trim().length < 2)
    errors.name = "El nombre debe tener al menos 2 caracteres";
  if (!company || company.trim().length < 2)
    errors.company = "La empresa debe tener al menos 2 caracteres";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Ingresa un correo electrónico válido";
  if (!service) errors.service = "Selecciona un servicio";
  if (!message || message.trim().length < 10)
    errors.message = "El mensaje debe tener al menos 10 caracteres";

  const phone = formData.get("phone") as string;
  if (phone && !/^[\d\s\-+()]{7,20}$/.test(phone))
    errors.phone = "Ingresa un número de teléfono válido";

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function contactAction(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const errors = validate(formData);
  if (errors) return { success: false, errors };

  /*
   * ─── EMAIL PROVIDER ──────────────────────────────────
   * Configure your email provider via environment variables:
   *
   *   NEXT_PUBLIC_CONTACT_EMAIL   destination email (already used)
   *   EMAIL_PROVIDER              resend | sendgrid | smtp
   *   EMAIL_API_KEY               provider API key
   *   EMAIL_FROM                  sender address
   *
   * Example with Resend:
   *
   *   import { Resend } from "resend";
   *   const resend = new Resend(process.env.EMAIL_API_KEY);
   *   await resend.emails.send({
   *     from: process.env.EMAIL_FROM,
   *     to:   process.env.NEXT_PUBLIC_CONTACT_EMAIL,
   *     subject: "Nuevo contacto",
   *     text: `Nombre: ${formData.get("name")}
   * Empresa: ${formData.get("company")}
   * Email: ${formData.get("email")}
   * Teléfono: ${formData.get("phone") || "—"}
   * Servicio: ${formData.get("service")}
   * Mensaje: ${formData.get("message")}`,
   *   });
   *
   * For now the action simulates a successful send.
   */

  await new Promise((r) => setTimeout(r, 1000));

  return { success: true };
}
