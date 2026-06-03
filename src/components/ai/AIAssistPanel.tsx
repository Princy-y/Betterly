'use client';

import { useState } from 'react';
import { Sparkles, Lightbulb, Wand2, AlertCircle, RefreshCw, X, ChevronDown } from 'lucide-react';
import { Scenario } from '@/types';
import { generateHint, improveAnswer, explainMistake, isAIAvailable } from '@/lib/gemini';
import Button from '@/components/ui/Button';

interface Props {
  scenario: Scenario;
  userResponse: string;
}

type AIAction = 'hint' | 'improve' | 'explain';

const actions: { id: AIAction; label: string; icon: typeof Lightbulb; color: string }[] = [
  { id: 'hint',    label: 'Need a Hint?',      icon: Lightbulb,   color: 'text-amber-400' },
  { id: 'improve', label: 'Improve My Answer', icon: Wand2,        color: 'text-purple-400' },
  { id: 'explain', label: 'Explain My Mistakes', icon: AlertCircle, color: 'text-cyan-400' },
];

export default function AIAssistPanel({ scenario, userResponse }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<AIAction | null>(null);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const aiAvailable = isAIAvailable();

  const handleAction = async (action: AIAction) => {
    if (!aiAvailable) return;
    if (!userResponse.trim() && action !== 'hint') {
      setError('Write something first, then I can help!');
      setResult('');
      return;
    }
    setLoading(action);
    setError('');
    setResult('');
    try {
      let text = '';
      if (action === 'hint')    text = await generateHint(scenario, userResponse);
      if (action === 'improve') text = await improveAnswer(scenario, userResponse);
      if (action === 'explain') text = await explainMistake(scenario, userResponse);
      setResult(text);
    } catch (err: any) {
      const errMsg = err?.message || '';
      if (errMsg.includes('AUTH_ERROR') || errMsg.includes('API_KEY') || errMsg.includes('API key')) {
        setError('Invalid API Key. Please double check the NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.');
      } else {
        setError('AI unavailable right now. Try again in a moment.');
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="glass rounded-[16px] border border-[#D0DFC8]">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-4.5 text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#3A6B35]" />
          <span className="font-serif font-bold text-sm text-[#141F12]">AI Assistant</span>
          <span className="text-xs text-slate-500 font-medium">(optional)</span>
          {!aiAvailable && (
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#EDF2E8] border border-[#D0DFC8] text-[#3D4F38] px-2 py-0.5 rounded-[4px]">No API Key</span>
          )}
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4.5 pb-5 space-y-3.5 border-t border-[#D0DFC8]/40 pt-4.5 font-sans">
          {!aiAvailable ? (
            <div className="text-center py-4">
              <p className="text-sm text-[#3D4F38] mb-2 font-medium">Add a Gemini API key to enable supportive coaching</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create <code className="bg-[#EDF2E8] border border-[#D0DFC8]/50 px-1.5 py-0.5 rounded font-mono text-[11px] text-[#3A6B35]">.env.local</code> in your vault and configure: <br />
                <code className="bg-[#EDF2E8] border border-[#D0DFC8]/50 px-1.5 py-0.5 rounded font-mono text-[11px] text-[#3A6B35] mt-1 inline-block">NEXT_PUBLIC_GEMINI_API_KEY=your_key</code>
              </p>
            </div>
          ) : (
            <>
              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {actions.map(({ id, label, icon: Icon, color }) => (
                  <Button
                    key={id}
                    variant="secondary"
                    size="sm"
                    className="rounded-[8px]"
                    onClick={() => handleAction(id)}
                    loading={loading === id}
                    disabled={loading !== null}
                  >
                    <Icon size={13} className="text-[#3A6B35]" />
                    {label}
                  </Button>
                ))}
              </div>

              {/* Result */}
              {(result || error) && (
                <div className={`rounded-[12px] p-4 text-xs relative leading-relaxed ${
                  error ? 'bg-red-500/5 border border-red-500/20 text-red-700'
                        : 'bg-[#EDF2E8]/40 border border-[#D0DFC8] text-[#3D4F38]'
                }`}>
                  <button
                    onClick={() => { setResult(''); setError(''); }}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                  >
                    <X size={13} />
                  </button>
                  <p className="whitespace-pre-wrap pr-5 leading-relaxed font-sans">{error || result}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
