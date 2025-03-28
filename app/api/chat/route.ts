const apiUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL;

export async function POST(message: string) {
  try {
    console.log(apiUrl, "apiUrl");
    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from .NET API: ${response.statusText}`);
    }

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in Next.js API route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
