"use client";

import React, { useEffect, useState } from 'react';
import { ProtocolWizard } from "../_components/protocol-wizard";
import { MessageDialog } from "../_components/message-dialog";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { ArrowLeft, Plus, MessageSquare, Activity } from "lucide-react";
import Link from 'next/link';

interface DetailData {
    id: string;
    name: string;
    email: string;
    phase: string;
    joined: string;
    psychProfile: { drive: string, barriers: string[] };
    currentGoals: string[];
    recentLogs: { date: string, mood: number | null, notes: string | null }[];
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
    const [client, setClient] = useState<DetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const handleSendMessage = async (content: string) => {
        try {
            const res = await fetch(`/api/admin/nutritionist/${client?.id}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });

            if (res.ok) {
                alert("Message sent!");
                setIsMessageOpen(false);
            } else {
                alert("Failed to send message.");
            }
        } catch (e) {
            console.error(e);
            alert("Error sending message.");
        }
    };

    const handleAssignProtocol = async (habits: string[]) => {
        try {
            const res = await fetch(`/api/admin/nutritionist/${client?.id}/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ habits })
            });

            if (res.ok) {
                alert("Protocol assigned successfully!");
                setIsWizardOpen(false);
                window.location.reload();
            } else {
                alert("Failed to assign protocol.");
            }
        } catch (e) {
            console.error(e);
            alert("Error assigning protocol.");
        }
    };

    useEffect(() => {
        const fetchClient = async () => {
            try {
                // Unwrap params if necessary (Next.js 15+ changes, but this is safe for now)
                const id = params.id;
                const res = await fetch(`/api/admin/nutritionist/${id}`);
                if (!res.ok) throw new Error("Failed to load client");
                const data = await res.json();
                setClient(data.client);
            } catch (err) {
                console.error(err);
                setError("Could not load client details");
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [params.id]);

    if (loading) return <div className="p-8 text-zinc-500">Loading details...</div>;
    if (error || !client) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-[#09090B] text-foreground p-4 md:p-8">
            <Link href="/admin/experts" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{client.name}</h1>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="border-primary/20 text-primary">
                            Phase: {client.phase}
                        </Badge>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Joined {new Date(client.joined).toLocaleDateString()}
                        </Badge>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-zinc-800" onClick={() => setIsMessageOpen(true)}>
                        <MessageSquare className="w-4 h-4 mr-2" /> Message
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsWizardOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Assign Protocol
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Active Protocol</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {client.currentGoals.length === 0 ? (
                                    <p className="text-zinc-500 text-sm">No active habits assigned.</p>
                                ) : client.currentGoals.map((goal, i) => (
                                    <div key={i} className="flex items-center p-3 rounded-lg bg-zinc-950/50 border border-zinc-800">
                                        <Activity className="w-4 h-4 text-primary mr-3" />
                                        <span className="text-white text-sm">{goal}</span>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full text-zinc-500 hover:text-white mt-2 border border-dashed border-zinc-800 hover:border-zinc-600">
                                    <Plus className="w-4 h-4 mr-2" /> Add Habit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Adherence History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {client.recentLogs.length === 0 && <p className="text-zinc-500 text-sm">No recent logs.</p>}
                                {client.recentLogs.map((log, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm border-b border-zinc-800 pb-2 mb-2 last:border-0">
                                        <span className="text-zinc-400">{new Date(log.date).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-2">
                                            {log.mood && (
                                                <Badge variant="secondary" className={log.mood < 3 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                                                    Mood: {log.mood}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Psych Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Core Drive</p>
                                    <p className="text-white font-medium">{client.psychProfile.drive || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Barriers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {client.psychProfile.barriers && client.psychProfile.barriers.length > 0 ? client.psychProfile.barriers.map(b => (
                                            <Badge key={b} className="bg-red-500/10 text-red-400 border-0">
                                                {b}
                                            </Badge>
                                        )) : <span className="text-zinc-600 text-sm">None identified</span>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {client && (
                <ProtocolWizard
                    isOpen={isWizardOpen}
                    onClose={() => setIsWizardOpen(false)}
                    clientId={client.id}
                    clientName={client.name}
                    onAssign={handleAssignProtocol}
                />
            )}

            {client && (
                <MessageDialog
                    isOpen={isMessageOpen}
                    onClose={() => setIsMessageOpen(false)}
                    clientId={client.id}
                    clientName={client.name}
                    onSend={handleSendMessage}
                />
            )}
        </div>
    );
}
