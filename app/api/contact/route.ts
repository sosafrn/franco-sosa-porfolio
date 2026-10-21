import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre excede el límite permitido."),
  email: z
    .string()
    .trim()
    .email("El correo electrónico no tiene un formato válido."),
  reason: z.enum(["rol", "proyecto", "consulta"]),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje excede el límite permitido."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    // Opcional: despachar a un webhook (n8n, Slack, Discord o servicio de correo) si está configurado
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "Portfolio Contact Console",
            receivedAt: new Date().toISOString(),
            ...validated,
          }),
        });
      } catch (webhookErr) {
        console.error("Aviso: no se pudo despachar al webhook secundario:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Mensaje recibido y validado con éxito.",
        data: {
          name: validated.name,
          email: validated.email,
          reason: validated.reason,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos de formulario inválidos",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Error interno al procesar el mensaje. Por favor intente más tarde.",
      },
      { status: 500 }
    );
  }
}
