"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Send } from "lucide-react";

interface MessageDialogProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    clientName: string;
    onSend: (content: string) => void;
}

export function MessageDialog({ isOpen, onClose, clientId, clientName, onSend }: MessageDialogProps) {
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!content.trim()) return;
        setSending(true);
        try {
            await onSend(content);
            setContent("");
            onClose();
        } finally {
            setSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold leading-none tracking-tight text-white text-lg">Message {clientName}</h3>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full text-zinc-400 hover:text-white">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                    <div>
                        <Label className="text-zinc-400 mb-2 block">Quick Nudge</Label>
                        <textarea
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px] resize-none"
                            placeholder="e.g. You're doing great! Keep up the consistency."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {[
                            "Keep pushing! 🚀",
                            "Consistency is key! 💎",
                            "Check your rituals today.",
                            "Need help with logs?"
                        ].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setContent(suggestion)}
                                className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 py-1.5 px-2 rounded border border-zinc-800 transition-colors text-left"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center p-6 pt-0 justify-end space-x-2">
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Cancel</Button>
                    <Button onClick={handleSend} disabled={!content.trim() || sending} className="bg-primary hover:bg-primary/90">
                        {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Nudge</>}
                    </Button>
                </div>
            </div>
        </div>
    );
}
