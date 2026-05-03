import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // 1. Check Authentication
    if (!session || !session.user) {
        redirect("/login");
    }

    // 2. Check Authorization (RBAC)
    // Assuming 'ADMIN' is the role string. Adjust if it uses 'EXPERT' or other enums.
    // Based on api/user mock data, roles are 'CLIENT'. 
    // We assume 'ADMIN' or 'EXPERT' for this panel.
    // Let's protect it strictly.
    const allowedRoles = ['ADMIN', 'EXPERT'];

    // Note: session.user.role might need type assertion if not typed globally yet
    const userRole = (session.user as any).role;

    if (!allowedRoles.includes(userRole)) {
        console.warn(`[Security] Unauthorized Access Attempt to /admin by ${session.user.email} (Role: ${userRole})`);
        redirect("/dashboard"); // Fail safe: Send them to their dashboard
    }

    return (
        <div className="admin-layout-wrapper">
            {children}
        </div>
    );
}
