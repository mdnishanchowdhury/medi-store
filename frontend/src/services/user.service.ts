import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_API=env.AUTH_URL;

export const userService = {
    getSession: async function () {

        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${AUTH_API}/get-session`, {
                headers: {
                    cookie: cookiesStore.toString(),
                },
                cache: "no-store",
            })

            const session = await res.json();

            if (session === null) {
                return { data: null, error: { message: "No active session found." } }
            }

            return {
                data: session,
                error: null
            };

        } catch (error) {
            console.error("Error fetching session data:", error);
            return {
                data: null,
                error: {
                    message: "Something went wrong while fetching session data."
                }
            }
        }
    }
}