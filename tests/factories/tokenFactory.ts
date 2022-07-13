import clerk from "@clerk/clerk-sdk-node";
import axios from "axios";
import config from "../../src/config";

export async function getToken() {
  const users = await clerk.users.getUserList();

  const { data } = await axios.post(
    `https://api.clerk.dev/v1/tokens`,
    {
      user_id: users[0].id,
      name: "teste",
    },
    {
      headers: { Authorization: `Bearer ${config.clerApiKey}` },
    }
  );

  return data.jwt;
}
