// Here i'm gonna create a fetch function to bring make the ai request

export async function makeAIRequest(user, { userNotes, aiContext, cutTime, initialSettings }) {
    if (!user) {
        throw new Error("No user provided")
    }

    const token = await user.getIdToken();

    const res = await fetch("http://localhost:3000/api/ai/generate-melody", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userNotes, aiContext, cutTime, initialSettings })
    })

    if (!res.ok) {
        throw new Error("Error generating AI melody")
    }

    const result = await res.json();
    return result;
}