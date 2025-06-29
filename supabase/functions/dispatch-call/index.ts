// supabase/functions/dispatch-call/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { agentId, userPhone, transcript } = await req.json();

    const OMNIDIM_API_KEY = Deno.env.get("OMNIDIM_API_KEY");

    if (!OMNIDIM_API_KEY || !agentId || !userPhone || !transcript) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required data" }),
        { status: 400 }
      );
    }

    const response = await fetch("https://backend.omnidim.io/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OMNIDIM_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        phone_number: userPhone,
        transcript: transcript,
      }),
    });

    const result = await response.json();

    console.log("Omnidim response:", result);

    if (!response.ok) {
      console.error("Omnidim call failed", result);
      return new Response(
        JSON.stringify({ error: result.message || "Failed to connect to triage agent" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Server error occurred in triage call." }),
      { status: 500 }
    );
  }
});
