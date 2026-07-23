"use server";

import nodemailer from "nodemailer";

export type ContactState = {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  "desarrollo-web": "Desarrollo Web",
  ia: "Inteligencia Artificial",
  automatizacion: "Automatización",
  "marketing-digital": "Marketing Digital",
  otro: "Otro",
};

function validate(formData: FormData): Record<string, string> | null {
  const errors: Record<string, string> = {};

  const name = (formData.get("name") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const service = formData.get("service") as string;
  const message = (formData.get("message") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  if (!name || name.length < 2)
    errors.name = "El nombre debe tener al menos 2 caracteres";
  if (!company || company.length < 2)
    errors.company = "La empresa debe tener al menos 2 caracteres";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Ingresa un correo electrónico válido";
  if (!service) errors.service = "Selecciona un servicio";
  if (!message || message.length < 10)
    errors.message = "El mensaje debe tener al menos 10 caracteres";
  if (phone && !/^[\d\s\-+()]{7,20}$/.test(phone))
    errors.phone = "Ingresa un número de teléfono válido";

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const hp = formData.get("website") as string;
  if (hp) return { success: true };

  const errors = validate(formData);
  if (errors) return { success: false, errors };

  const turnstileToken = formData.get("cf-turnstile-response") as string;
  if (turnstileToken) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret) {
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret, response: turnstileToken }),
        },
      ).then((r) => r.json());

      if (!verify.success) {
        console.warn("Turnstile verification failed", verify);
        return { success: false, error: "Error de verificación. Intenta de nuevo." };
      }
    }
  }

  const name = (formData.get("name") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const service = formData.get("service") as string;
  const message = (formData.get("message") as string)?.trim();

  const emailBody = [
    `Nombre: ${name}`,
    `Empresa: ${company}`,
    `Email: ${email}`,
    `Teléfono: ${phone || "—"}`,
    `Servicio: ${SERVICE_LABELS[service] || service}`,
    `Mensaje: ${message}`,
  ].join("\n");

  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (to) {
    try {
      const user = process.env.EMAIL_USER;
      const pass = process.env.EMAIL_PASS;

      if (user && pass) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: Number(process.env.EMAIL_PORT) || 587,
          secure: false,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"RA2P Labs Contacto" <${user}>`,
          to,
          replyTo: email,
          subject: `Nuevo contacto de ${name} — ${company}`,
          text: emailBody,
        });
      } else {
        console.log("─── Contact Form Submission (no email config) ───");
        console.log(emailBody);
        console.log("──────────────────────────────────────────────────");
        await new Promise((r) => setTimeout(r, 800));
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      return { success: false, error: "Error al enviar el mensaje. Intenta de nuevo." };
    }
  } else {
    console.log("─── Contact Form Submission (no recipient) ───");
    console.log(emailBody);
    console.log("───────────────────────────────────────────────");
    await new Promise((r) => setTimeout(r, 800));
  }

  return { success: true };
}
