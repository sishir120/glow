"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Button exists
import { Label } from "@/components/ui/label"; // Label exists
import { Input } from "@/components/ui/input"; // Input exists
import { Plus, Save, X, Check } from "lucide-react";

interface ProtocolWizardProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    clientName: string;
    onAssign: (habits: string[]) => void;
}

const PRESET_PROTOCOLS = [
    { title: "Metabolic Reset", habits: ["Drink 500ml Water immediately upon waking", "Eat 30g Protein for Breakfast", "No screens 1 hour before bed"] },
    { title: "Stress Balance", habits: ["Box Breathing (5 mins) at noon", "Magnesium Supplement PM", "Morning Sunlight (10 mins)"] },
    { title: "Glow Foundation", habits: ["Skincare Routine AM", "Skincare Routine PM", "Collagen Supplement"] }
];

export function ProtocolWizard({ isOpen, onClose, clientId, clientName, onAssign }: ProtocolWizardProps) {
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    const [customHabits, setCustomHabits] = useState<string[]>([]);
    const [newHabitInput, setNewHabitInput] = useState("");

    const handleAddHabit = () => {
        if (newHabitInput.trim()) {
            setCustomHabits([...customHabits, newHabitInput.trim()]);
            setNewHabitInput("");
            setSelectedPreset(null);
        }
    };

    const handleSave = () => {
        let habitsToAssign: string[] = [];
        if (selectedPreset !== null) {
            habitsToAssign = PRESET_PROTOCOLS[selectedPreset].habits;
        }
        habitsToAssign = [...habitsToAssign, ...customHabits];

        if (habitsToAssign.length > 0) {
            onAssign(habitsToAssign);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold leading-none tracking-tight text-white text-lg">Assign Protocol for {clientName}</h3>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full text-zinc-400 hover:text-white">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 pt-0 space-y-6">
                    {/* Presets */}
                    <div>
                        <Label className="text-zinc-400 mb-2 block">Choose a Preset</Label>
                        <div className="grid grid-cols-1 gap-2">
                            {PRESET_PROTOCOLS.map((preset, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedPreset(idx)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedPreset === idx ? 'border-primary bg-primary/10 text-primary' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-sm">{preset.title}</p>
                                        {selectedPreset === idx && <Check className="w-4 h-4" />}
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1">{preset.habits.length} habits • {preset.habits[0]}...</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-[1px] bg-zinc-800 flex-1"></div>
                        <span className="text-xs text-zinc-500 uppercase">Or Build Custom</span>
                        <div className="h-[1px] bg-zinc-800 flex-1"></div>
                    </div>

                    {/* Custom Input */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. 10k Steps Daily"
                            className="bg-zinc-900 border-zinc-700 focus:ring-primary"
                            value={newHabitInput}
                            onChange={(e) => setNewHabitInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
                        />
                        <Button size="icon" onClick={handleAddHabit} className="shrink-0 bg-zinc-800 hover:bg-zinc-700">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Review List */}
                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 min-h-[100px]">
                        <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Protocol Preview</p>
                        <ul className="space-y-2">
                            {selectedPreset !== null && PRESET_PROTOCOLS[selectedPreset].habits.map((h, i) => (
                                <li key={`preset-${i}`} className="text-sm text-zinc-300 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                    {h}
                                </li>
                            ))}
                            {customHabits.map((h, i) => (
                                <li key={`custom-${i}`} className="text-sm text-zinc-300 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                    {h}
                                </li>
                            ))}
                            {selectedPreset === null && customHabits.length === 0 && (
                                <li className="text-sm text-zinc-600 italic">No habits selected yet...</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="flex items-center p-6 pt-0 justify-end space-x-2">
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Cancel</Button>
                    <Button onClick={handleSave} disabled={selectedPreset === null && customHabits.length === 0}>
                        <Save className="w-4 h-4 mr-2" /> Assign Protocol
                    </Button>
                </div>
            </div>
        </div>
    );
}
