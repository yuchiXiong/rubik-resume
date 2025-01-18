import { Octokit } from "@octokit/rest";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth-config";
import * as radash from "radash";

const getOctokit = async () => {
  const [err, session] = await radash.try(getServerSession)(authOptions);

  if (err || !session?.accessToken) {
    throw new Error("Get access token fail");
  }

  return new Octokit({ auth: session.accessToken });
};


export default getOctokit;
