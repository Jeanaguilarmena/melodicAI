export async function fetchUserProfile(user) {
    if (!user) {
        throw new Error("No user provided")
    }

    const token = await user.getIdToken();

    const res = await fetch("http://localhost:3000/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error("Error fetching profile");
    }

    const userProfile = await res.json();
    return userProfile;
}