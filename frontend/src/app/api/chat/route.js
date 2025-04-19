// src/app/api/chat/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  try {
    // call Deepseek via the OpenAI‐compatible SDK
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user',   content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] Deepseek SDK error:', err);
    return NextResponse.json(
      { reply: 'Sorry, something went wrong on our end.' },
      { status: 500 }
    );
  }
}
