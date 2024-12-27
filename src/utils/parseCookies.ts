export const parseCookies = (
    cookieHeader: string | undefined
): Record<string, string> => {
    if (!cookieHeader) return {};

    return cookieHeader
        .split(";")
        .reduce((cookies: Record<string, string>, cookie: string) => {
            const [name, value] = cookie.trim().split("=");
            cookies[name] = value;
            return cookies;
        }, {});
};
