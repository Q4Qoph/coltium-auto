"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Input, Select, Label } from "@/components/ui";
import { useUsers } from "@/lib/hooks";
import type { User } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const { data, isLoading } = useUsers();
  const users = (data as { users?: User[] })?.users ?? [];
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | "user" | "technician" | "admin">("");

  const filtered = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-500 mt-1">All registered users and subscriptions.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle>User list</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Search and filter all registered users.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Search</Label>
                <Input
                  placeholder="Name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48 space-y-1">
                <Label className="text-xs uppercase tracking-wide text-slate-500">Role</Label>
                <Select
                  value={roleFilter}
                  onChange={(e) =>
                    setRoleFilter(e.target.value as "" | "user" | "technician" | "admin")
                  }
                >
                  <option value="">All roles</option>
                  <option value="user">User</option>
                  <option value="technician">Technician</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
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
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-500">
                      No users match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{u.role}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(u.createdAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
