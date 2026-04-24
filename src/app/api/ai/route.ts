import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, role, context, image, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const activeModel = "gemini-2.5-flash"; 

    // 1. Format history (Gemini uses 'user' and 'model')
    const contents = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    
    // 2. Add current message + multimodal image support
    const currentParts: any[] = [{ text: prompt }];
    if (image) {
      currentParts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: image.split(',')[1]
        }
      });
    }
    contents.push({ role: 'user', parts: currentParts });

    // 3. ENHANCED SYSTEM INSTRUCTIONS
    const teacherInstruction = "You are a professional Educational Data Analyst. Provide direct, concise, and data-driven answers to help teachers optimize their classroom.";
    
    const studentInstruction = `
      You are a Socratic Tutor. Context: ${context}.
      
      CORE RULES:
      - NEVER give direct answers or full code solutions.
      - Use the Socratic method: Answer questions with a guiding question that helps the student find the answer themselves.
      - IMPLEMENTATION CHECK: If a student provides an answer or code, ask them to explain the "why" or to dry-run a specific edge case instead of just saying "Correct".
      
      VISUAL & STRUCTURED OUTPUT:
      - For complex logic, workflows, or STEM concepts, you MUST include a Mermaid.js diagram.
      - Format: \`\`\`mermaid [diagram code] \`\`\`.
      - Use markdown tables for comparisons and bold text for key terminology.
      
      IMAGE ANALYSIS:
      - If an image is provided, identify key elements in it and ask the student a question about a specific part of that image to guide their learning.
    `;

    const systemInstruction = role === 'TEACHER' ? teacherInstruction : studentInstruction;

    // 4. API Call with System Instruction
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return NextResponse.json({ text: "My logic circuits are resetting. Please try again!" }, { status: 500 });
    }

    const responseText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ text: "Error syncing memory." }, { status: 500 });
  }
}