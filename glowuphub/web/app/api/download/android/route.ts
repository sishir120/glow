export const runtime = "edge";

export async function GET() {
    try {
        const response = await fetch("https://api.github.com/repos/Sishir120/glowuphub/releases/latest", {
            headers: {
                "User-Agent": "GlowUpHub-Web",
                "Accept": "application/vnd.github.v3+json"
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            console.error("Failed to fetch github release");
            // Fallback to static if API fails
            return Response.redirect("https://glowuphub-six.vercel.app/downloads/glowuphub.apk", 302);
        }

        const data = await response.json();
        const asset = data.assets?.find((a: any) => a.name.endsWith(".apk"));

        if (asset && asset.browser_download_url) {
            return Response.redirect(asset.browser_download_url, 302);
        }

        // Fallback
        return Response.redirect("https://glowuphub-six.vercel.app/downloads/glowuphub.apk", 302);
    } catch (e) {
        console.error("Error in download route", e);
        return Response.redirect("https://glowuphub-six.vercel.app/downloads/glowuphub.apk", 302);
    }
}
