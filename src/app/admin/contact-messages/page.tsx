"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { useAdminContactMessages } from "@/lib/hooks";
import { useMemo, useState } from "react";
import type { ContactMessage } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AdminContactMessagesPage() {
  const { data: messages = [], isLoading, error } = useAdminContactMessages();
  const [search, setSearch] = useState("");

  const list = Array.isArray(messages) ? (messages as ContactMessage[]) : [];

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return list;
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        (m.phone && m.phone.toLowerCase().includes(term)) ||
        m.message.toLowerCase().includes(term)
    );
  }, [list, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact messages</h1>
        <p className="text-zinc-400 mt-1">Submissions from the public contact form on the website.</p>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-200">
          {(error as { message?: string }).message ?? "Failed to load messages."}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>All messages</CardTitle>
              <CardDescription>Newest first. Use search to filter by name, email, or content.</CardDescription>
            </div>
            <div className="w-full md:max-w-sm space-y-1">
              <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
              <Input
                placeholder="Name, email, phone, message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full rounded-md bg-slate-100 border border-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              {list.length === 0 ? "No contact messages yet." : "No messages match your search."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="text-slate-600 whitespace-nowrap align-top">
                      {formatDate(m.createdAt)}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-slate-900">{m.name}</span>
                        <a href={`mailto:${m.email}`} className="text-xs text-[var(--primary)] hover:underline">
                          {m.email}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 align-top whitespace-nowrap">
                      {m.phone ?? "—"}
                    </TableCell>
                    <TableCell className="text-slate-700 align-top max-w-md">
                      <p className="whitespace-pre-wrap break-words">{m.message}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
