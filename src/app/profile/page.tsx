import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out button";
import { UpdateUserForm } from "@/components/update-user-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/headers";

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        redirect("/auth/login");
    }
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <ReturnButton href='/' label="Home" />           
                <h1 className="text-3xl font-bold">Profile Page</h1>
            </div>
            <SignOutButton />
            {session.user.image ? <img src={session.user.image} className="w-32 h-32 rounded-full"/> : <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                <span className="uppercase text-lg font-bold">{session.user.name.slice(0,2)}</span>
            </div>}
            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2)}
            </pre>

            <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-blue-600">
                <h2 className="text-2xl font-bold">Update User</h2>

                <UpdateUserForm name={session.user.name} image={session.user.image ?? ""} />
            </div>
        </div>
    );
}