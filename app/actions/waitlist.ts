'use server'

export async function submitWaitlist(formData: FormData) {
  const score = formData.get('score');
  const domicile = formData.get('domicile');
  const category = formData.get('category');
  const name = formData.get('name');
  const email = formData.get('email');
  const mobile = formData.get('mobile');
  const whatsapp = formData.get('whatsapp');

  // Replace with your actual n8n Webhook URL once we set it up in Step 2
  const N8N_WEBHOOK_URL = 'https://cutoffs.app.n8n.cloud/webhook/bams-terminal';

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: Number(score),
        domicile,
        category,
        name,
        email,
        mobile,
        whatsapp,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const result = await response.json();
    return { success: true, data: result };

  } catch (error) {
    console.error('Submission error:', error);
    // Returning mock data for now so your UI doesn't break during testing
    return { success: false, data: null };
  }
}
export async function getTeaserData() {
  try {
    // Calling your LIVE n8n API
    const response = await fetch('https://cutoffs.app.n8n.cloud/webhook/database-teaser', { 
      cache: 'no-store' 
    });
    const result = await response.json();
    return { success: true, data: result.table_data };
  } catch (error) {
    console.error("Failed to fetch teaser data", error);
    return { success: false, data: null };
  }
}