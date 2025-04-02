const apiUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL;

export async function getChatResponse(
  chatId: string,
  message: string,
  file?: File | null
) {
  try {
    const formData = new FormData();
    console.log(chatId, "ljj");
    formData.append("chatId", chatId);
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }
    console.log("formData", JSON.stringify(formData));
    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to get response: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return null;
  }
}
