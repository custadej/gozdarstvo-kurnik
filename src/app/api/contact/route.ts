import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json() as Record<string, string>;
  const { fname, lname, email, phone, service, message } = body;

  const { error } = await resend.emails.send({
    from: 'Gozdarstvo Kurnik <onboarding@resend.dev>',
    to: 'blazkurnik14@gmail.com',
    replyTo: email,
    subject: `Povpraševanje – ${service || 'Splošno'} – ${fname} ${lname}`,
    text: [
      `Ime: ${fname} ${lname}`,
      `E-pošta: ${email}`,
      `Telefon: ${phone || '/'}`,
      `Storitev: ${service || '/'}`,
      '',
      `Sporočilo:\n${message}`,
    ].join('\n'),
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ ok: true });
}
