import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: {
        provider: "postgresql",
        url: process.env.DATABASE_URL!,
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: true,
        requireEmailVerification: false,
    },
    trustedOrigins: ["http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;