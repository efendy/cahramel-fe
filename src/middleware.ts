export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/app/:path*",
        "/manage/:path*",
        "/configure/:path*",
        "/user/:path*"
    ]
}