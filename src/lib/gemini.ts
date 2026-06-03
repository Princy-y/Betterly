// ============================================================
// Gemini AI Helpers — ISOLATED. Never auto-called.
// All functions here are OPTIONAL enhancements.
// The app works fully without this file.
// ============================================================

import { Scenario } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

let _workingModel: string | null = null;

async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) throw new Error('GEMINI_KEY_MISSING');

  const models = _workingModel ? [_workingModel] : MODELS;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
        const msg = err?.error?.message || `HTTP ${res.status}`;
        if (res.status === 401 || res.status === 403) throw new Error(`AUTH_ERROR: ${msg}`);
        continue;
      }

      const data = await res.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
      _workingModel = model;
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('AUTH_ERROR')) throw err;
    }
  }
  throw new Error('No working Gemini model found.');
}

export async function generateHint(scenario: Scenario, userResponse: string): Promise<string> {
  const prompt = `You are a supportive communication coach called Betterly.

Scenario: ${scenario.title}
Prompt: ${scenario.prompt}
User's response so far: ${userResponse || '(nothing written yet)'}

Give ONE specific, practical hint to help them improve their response. Be concise (2-3 sentences). Be encouraging and practical. Do NOT rewrite their answer.`;
  return callGemini(prompt);
}

export async function improveAnswer(scenario: Scenario, userResponse: string): Promise<string> {
  const prompt = `You are a supportive communication coach called Betterly.

Scenario: ${scenario.title}
Prompt: ${scenario.prompt}
User's response: ${userResponse}

Provide an improved version of their response. Format:
1. Brief feedback on what was good (1 sentence)
2. Improved response (clearly marked)
3. What changed and why (2-3 bullet points)

Be encouraging and practical.`;
  return callGemini(prompt);
}

export async function explainMistake(scenario: Scenario, userResponse: string): Promise<string> {
  const prompt = `You are a supportive communication coach called Betterly.

Scenario: ${scenario.title}
Prompt: ${scenario.prompt}
User's response: ${userResponse}

Gently explain the main areas that could be improved in their response. Be specific and kind. Give 2-3 concrete suggestions. Do NOT be harsh or discouraging.`;
  return callGemini(prompt);
}

export async function generateSimilarScenario(category: string): Promise<string> {
  const prompt = `Generate ONE new practice scenario for the category: "${category}".

Format your response as JSON with this exact structure:
{
  "title": "scenario title",
  "description": "brief context",
  "prompt": "what the user must respond to",
  "tips": ["tip 1", "tip 2", "tip 3"]
}

Make it realistic, beginner-friendly, and different from generic examples. Return ONLY the JSON, no other text.`;
  return callGemini(prompt);
}

export function isAIAvailable(): boolean {
  return Boolean(API_KEY);
}
