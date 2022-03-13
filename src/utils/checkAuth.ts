const USER = process.env.ADMIN_USER;
const PASSWORD = process.env.ADMIN_PASSWORD;

export default function checkAuth(basicAuth?: string): boolean {
    if (!USER || !PASSWORD) {
        throw new Error(
            "ADMIN_USER and ADMIN_PASSWORD env variables must be set"
        );
    }

    if (basicAuth) {
        const auth = basicAuth.split(" ")[1];
        const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

        if (user === USER && pwd === PASSWORD) {
            return true;
        }
    }

    return false;
}
