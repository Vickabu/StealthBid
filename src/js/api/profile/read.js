// async function fetchProfileData() {
//   try {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No access token found!");
//       return;
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const { name } = userInfo;

//     console.log("Fetching profile data for:", name);
//     const url = `${API_AUCTION_PROFILES}/${name}`;
//     console.log("API URL:", url);

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const responseData = await response.json();
//     console.log("Full API Response:", responseData);
//     if (!response.ok) {
//       const { message } = responseData;
//       if (response.status === 401) {
//         console.error("Unauthorized error: Token might be invalid or expired.");
//       }
//       throw new Error(message || "Failed to fetch profile data.");
//     }
//     const { data } = responseData;
//     if (!data) {
//       console.error("No profile data found in response.");
//       return;
//     }
//     console.log("Profile Data:", data);
//     localStorage.setItem("profileData", JSON.stringify(data));
//     console.log("Profile Data Stored:", localStorage.getItem("profileData"));
//   } catch (error) {
//     console.error("Failed to fetch profile data:", error);
//   }
// }
