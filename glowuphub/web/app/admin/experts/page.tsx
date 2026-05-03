"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
    Users,
    MessageSquare,
    TrendingUp,
    Activity,
    Search,
    Filter,
    ArrowUpRight,
    Heart,
    AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

interface ClientData {
    id: string;
    name: string;
    email: string | null;
    phase: string;
    lastLog: string | null;
    status: "Concern" | "Stable";
}

export default function ExpertAdminPage() {
    const [clients, setClients] = useState<ClientData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('/api/admin/nutritionist');
                if (res.ok) {
                    const data = await res.json();
                    setClients(data.clients || []);
                }
            } catch (error) {
                console.error("Failed to fetch clients", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'Concern' | 'Stable'>('ALL');

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || client.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#09090B] text-foreground p-4 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Expert Hub</h1>
                    <p className="text-zinc-400">Guiding our premium clients to their radiant potential.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className={`rounded-full border-zinc-800 ${statusFilter !== 'ALL' ? 'bg-primary/20 text-primary border-primary/20' : 'bg-zinc-900/50 hover:bg-zinc-800'}`}
                        onClick={() => setStatusFilter(prev => prev === 'ALL' ? 'Concern' : prev === 'Concern' ? 'Stable' : 'ALL')}
                    >
                        <Filter className="w-4 h-4 mr-2" /> {statusFilter === 'ALL' ? 'Filter' : statusFilter}
                    </Button>
                    <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                        <MessageSquare className="w-4 h-4 mr-2" /> Message All
                    </Button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Active Clients", value: clients.length.toString(), icon: Users, color: "text-primary" },
                    { label: "At Risk", value: clients.filter(c => c.status === 'Concern').length.toString(), icon: AlertTriangle, color: "text-rose-400" },
                    { label: "Avg. Consistency", value: "88%", icon: Activity, color: "text-sage" },
                    { label: "Pending Chats", value: "5", icon: MessageSquare, color: "text-lavender" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Client List */}
                <div className="lg:col-span-2">
                    <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-white">Client Progress Matrix</CardTitle>
                            <div className="relative w-48">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <input
                                    placeholder="Search clients..."
                                    className="w-full bg-zinc-950 border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8 text-zinc-500">Loading client data...</div>
                            ) : clients.length === 0 ? (
                                <div className="text-center py-8 text-zinc-500">No clients assigned yet.</div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredClients.length === 0 ? (
                                        <div className="text-center py-4 text-zinc-500">No matching clients found.</div>
                                    ) : (
                                        filteredClients.map((client) => (
                                            <motion.div
                                                key={client.id}
                                                whileHover={{ y: -2 }}
                                                className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-primary/30 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                        {client.name ? client.name[0] : '?'}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold text-white">{client.name || 'Unknown'}</p>
                                                            <Badge variant="outline" className={`text-[10px] py-0 border-0 ${client.status === 'Concern' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                                                {client.status.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-xs text-zinc-500">Phase: {client.phase}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Last Log</p>
                                                        <p className="font-bold text-white text-xs">{client.lastLog ? new Date(client.lastLog).toLocaleDateString() : 'Never'}</p>
                                                    </div>
                                                    <Link href={`/admin/experts/${client.id}`}>
                                                        <Button size="sm" variant="ghost" className="rounded-full hover:bg-primary/20 text-primary">
                                                            View <ArrowUpRight className="w-4 h-4 ml-1" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Insight Panel */}
                < div >
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-sage" /> Priority Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {clients.filter(c => c.status === 'Concern').map(c => (
                                    <div key={c.id} className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800 border-l-4 border-l-red-500">
                                        <p className="text-sm font-medium text-white mb-2">Attention Needed</p>
                                        <p className="text-xs text-zinc-400 mb-3">{c.name} has reported low mood or missed logs.</p>
                                        <Button size="sm" className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700">Message Support</Button>
                                    </div>
                                ))}
                                {clients.length > 0 && clients.filter(c => c.status === 'Concern').length === 0 && (
                                    <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800">
                                        <p className="text-sm font-medium text-white mb-2">All Clear</p>
                                        <p className="text-xs text-zinc-400">All assigned clients are stable.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div >
            </div >
        </div >
    );
}
