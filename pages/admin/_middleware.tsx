import { NextRequest, NextResponse } from "next/server";
import checkAuth from "../../src/utils/checkAuth";

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get("authorization") ?? undefined;
    if (checkAuth(basicAuth)) {
        return NextResponse.next();
    }

    return new Response("Auth required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}
