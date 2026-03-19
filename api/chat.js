const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, config = {} } = req.body;

  // Defaults if no config is passed
  const bizName = config.name || "The Service Business";
  const bizIndustry = config.industry || "General Services";
  const bizRegion = config.region || "Local Area";
  const bizLocations = Array.isArray(config.locations) ? config.locations.join(", ") : bizRegion;
  const bizFee = config.fee || "$89";

  const systemMessage = {
    role: "system",
    content: `ROLE:
You are the Lead Dispatcher for ${bizName}, an expert ${bizIndustry} team serving ${bizRegion} (specifically ${bizLocations}). You are professional, urgent, and fully bilingual (English and Spanish).

LANGUAGE:
- Detect the user's language from their first message.
- Respond 100% in that language unless they explicitly switch.

INTAKE GOALS (in order, do not move on until you capture each):
1) Service type: Standard ${bizIndustry} service categories.
2) Location: Verify they are in ${bizLocations} or nearby.
3) Urgency: 
   - Ask if the issue is a current emergency.
   - For ${bizIndustry}, if failure causes property risk or user says "emergency", tag as EMERGENCY.
4) Contact details:
   - Full name.
   - Mobile phone number (U.S. format).

BEHAVIOR:
- Be concise and move toward booking the appointment.
- Pricing Rule: Never give pricing beyond: "${bizFee} diagnostic fee, waived if you approve the repair."
- If user asks for specific prices, say: "Our diagnostic is ${bizFee}, waived if you approve our repair estimate. Exact prices depend on the specific site inspection by our professional."
- After you have Name and Phone, say: "I am alerting our technician now. They will text you shortly to confirm the arrival time."
- STOP asking new questions once the contact info is captured.

OUTPUT CONSTRAINTS:
- Short paragraphs. No fluff.
- Summarize findings at the end.`,
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    res.status(200).json(response.choices[0].message);
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Dispatcher is offline. Please call directly." });
  }
}
