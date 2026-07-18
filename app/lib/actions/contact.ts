"use server";

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

  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (apiKey && from && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `Nuevo contacto de ${name} — ${company}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Resend error:", res.status, body);
        return { success: false, error: "Error al enviar el mensaje. Intenta de nuevo." };
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      return { success: false, error: "Error al enviar el mensaje. Intenta de nuevo." };
    }
  } else {
    console.log("─── Contact Form Submission ───");
    console.log(emailBody);
    console.log("───────────────────────────────");
    await new Promise((r) => setTimeout(r, 800));
  }

  return { success: true };
}
