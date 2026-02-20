import axios from "axios";

export async function refreshAccessToken(token: any) {
  try {
    const params = new URLSearchParams();
    params.append("refresh_token", token.refreshToken);
    params.append("user_id", token.userId);

    const res = await axios.post(
      `${process.env.SERVICE_URL}/v1/refresh-access`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const refreshed = res.data;

    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpiresAt: new Date(refreshed.accessTokenExpiresAt).getTime(),
      refreshToken: refreshed.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
