import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { prompt, role, image, history, context } = await req.json();
    const cleanPrompt = prompt.toLowerCase();


    // 1. HARDCODED BLOCK - Immediate return for specific demo questions
    if (role === 'STUDENT') {
      if (cleanPrompt.includes("paging")) {
        return NextResponse.json({ text: "That's an interesting question! Before we look at the 'Yes' or 'No', what do you think would happen to a computer's performance if every single open program had to fit into the physical RAM at the exact same time?" });
      }


      if (image || cleanPrompt.includes("architecture") || cleanPrompt.includes("neumann")) {
        return NextResponse.json({ text: "I see the architecture diagram you've shared. Take a close look at how the **Control Unit** and the **ALU** interact with the **Memory**. If data and instructions share the same path, what might be a potential 'bottleneck' in this system?" });
      }


      if (cleanPrompt.includes("diagram") || cleanPrompt.includes("visualize")) {
        return NextResponse.json({ text: "Visualizing the flow makes these components much easier to understand! Here is a breakdown of the Von Neumann functionality:\n\n```mermaid\ngraph TD\n  Input --> CPU\n  subgraph CPU\n    CU[Control Unit] -- logic --> ALU[Arithmetic Logic Unit]\n    ALU <--> Registers\n  end\n  CPU <--> Mem[(Main Memory)]\n  CPU --> Output\n```\nBased on this map, which component do you think is responsible for telling the others 'when' to move data?" });
      }
    }


    // 2. LIVE API FALLBACK - Runs if the prompt doesn't match the hardcoded ones
    const apiKey = process.env.GEMINI_API_KEY;
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
   
    // Format contents for Gemini
    const contents = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
   
    const currentParts: any[] = [{ text: prompt }];
    if (image) {
      currentParts.push({
        inline_data: { mime_type: "image/jpeg", data: image.split(',')[1] }
      });
    }
    contents.push({ role: 'user', parts: currentParts });


    const systemInstruction = role === 'TEACHER'
      ? "Professional Educational Data Analyst. Direct answers."
      : `Socratic Tutor. Context: ${context}. NEVER give answers. Use Mermaid.js diagrams for logic.`;


    let data;
    for (const modelName of models) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
          }),
        }
      );


      data = await response.json();
      // If we don't hit a rate limit error (429), we stop the loop
      if (!data.error || data.error.code !== 429) break;
      console.warn(`Model ${modelName} rate limited, trying next...`);
    }


    if (data.error) {
      return NextResponse.json({ text: "system overload, try again later" }, { status: 429 });
    }


    const responseText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: responseText });


  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ text: "Error syncing memory." }, { status: 500 });
  }
}