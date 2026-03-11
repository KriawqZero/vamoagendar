import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface NotificationData {
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  serviceName: string;
  date: string;
  time: string;
  professionalName: string;
}

export async function sendBookingConfirmation(data: NotificationData) {
  if (!data.clientEmail || !process.env.SMTP_HOST) return;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@vamoagendar.com",
      to: data.clientEmail,
      subject: `Agendamento confirmado - ${data.professionalName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #7C3AED;">Agendamento Confirmado!</h2>
          <p>Olá <strong>${data.clientName}</strong>,</p>
          <p>Seu agendamento foi confirmado com sucesso.</p>
          <div style="background: #f4f4f5; border-radius: 12px; padding: 16px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Serviço:</strong> ${data.serviceName}</p>
            <p style="margin: 4px 0;"><strong>Data:</strong> ${data.date}</p>
            <p style="margin: 4px 0;"><strong>Horário:</strong> ${data.time}</p>
            <p style="margin: 4px 0;"><strong>Profissional:</strong> ${data.professionalName}</p>
          </div>
          <p style="color: #71717a; font-size: 14px;">VamoAgendar</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
  }
}

// Placeholder for WhatsApp via Evolution API
export async function sendWhatsAppReminder(_data: NotificationData) {
  // TODO: Implement Evolution API integration for PRO plan
  console.log("WhatsApp reminder not yet implemented");
}
