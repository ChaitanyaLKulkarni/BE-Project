import { NextRequest, NextResponse } from "next/server";

const USER = process.env.ADMIN_USER;
const PASSWORD = process.env.ADMIN_PASSWORD;

export function middleware(req: NextRequest) {
    if (!USER || !PASSWORD) {
        throw new Error(
            "ADMIN_USER and ADMIN_PASSWORD env variables must be set"
        );
    }
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
        const auth = basicAuth.split(" ")[1];
        const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

        if (user === USER && pwd === PASSWORD) {
            return NextResponse.next();
        }
    }

    return new Response("Auth required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}
