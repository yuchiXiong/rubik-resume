import * as radash from "radash";
import getOctokit from "./common";
import { TSchema } from "@/constants/defaultSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth-config";
import { Octokit } from "@octokit/rest";
import { DEFAULT_SCHEMA } from "@/constants/defaultSchema";

// TODO UPDATE: 简历应该表明自己的信息
const REPO_NAME = "my-rubik-resume";

/** 获取 Repo 信息 */
export async function getRepoInfo() {
  const octokit = await getOctokit();
  const [error, data] = await radash.try(octokit.users.getAuthenticated)();

  if (error) {
    console.error("Error getting authenticated user:", error);
    throw new Error("Failed to get authenticated user");
  }

  const user = data.data;

  const [getRepoError, repoInfo] = await radash.try(octokit.request)(
    "GET /repos/{owner}/{repo}",
    {
      owner: user.login,
      repo: "rubik-resume",
    }
  );

  if (getRepoError) {
    console.error("Error getting repo:", getRepoError);
    throw new Error("Failed to get repo");
  }

  return {
    owner: user.login,
    repo: "rubik-resume",
    data: repoInfo?.data,
  };
}

/** 检查 repo 是否存在 */
export const checkRepoExist = async (): Promise<{
  data: TSchema[];
}> => {
  const octokit = await getOctokit();
  const [authenticatedResultError, authenticatedResult] = await radash.try(
    octokit.users.getAuthenticated
  )();

  if (authenticatedResultError) {
    throw "get session fail";
  }

  /** 获取仓库信息 */
  const [err, data] = await radash.try(octokit.repos.get)({
    owner: authenticatedResult?.data.login,
    repo: REPO_NAME,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (err) {
    // TODO 仓库不存在/未公开
    throw err;
  }

  console.log("仓库信息", data);

  /** 获取分支信息 */
  const [getBranchDataErr, branchData] = await radash.try(
    octokit.repos.getBranch
  )({
    owner: authenticatedResult.data.login,
    repo: REPO_NAME,
    branch: "test",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log("获取分支信息", getBranchDataErr, branchData);

  if (
    getBranchDataErr instanceof Error &&
    "status" in getBranchDataErr &&
    getBranchDataErr.status === 404
  ) {
    console.log("没有找到目标分支，创建目标分支并初始化文件结构");

    await createFileIfNotExists({
      octokit,
      owner: authenticatedResult.data.login,
      repo: REPO_NAME,
      branch: "test",
      path: "content/schema.json",
      message: "init by RubikResume",
      content: JSON.stringify(DEFAULT_SCHEMA),
    });
  }

  /** 获取 schema 数据 */
  const [getSchemaDataErr, schemaData] = await radash.try(
    octokit.repos.getContent
  )({
    owner: authenticatedResult.data.login,
    repo: REPO_NAME,
    path: "content/schema.json",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (
    getSchemaDataErr instanceof Error &&
    "status" in getSchemaDataErr &&
    getSchemaDataErr.status === 404
  ) {
    console.log("没有找到 schema 文件，创建 schema 文件");
    await createFileIfNotExists({
      octokit,
      owner: authenticatedResult.data.login,
      repo: REPO_NAME,
      branch: "test",
      path: "content/schema.json",
      message: "init by RubikResume",
      content: JSON.stringify(DEFAULT_SCHEMA),
    });
  }

  return {
    data: schemaData.data as TSchema[],
  };
};

/** 获取简历 schema 数据 */
export const getSchema = async (): Promise<{
  data: TSchema[];
}> => {
  const octokit = await getOctokit();
  const [authenticatedResultError, authenticatedResult] = await radash.try(
    octokit.users.getAuthenticated
  )();

  if (authenticatedResultError) {
    throw "get session fail";
  }

  const [err, data] = await radash.try(octokit.request)(
    "GET /repos/{owner}/{repo}/contents/{path}?{ref}",
    {
      owner: authenticatedResult.data.login,
      repo: REPO_NAME,
      path: "content/schema.json",
      ref: "test",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log(err, data);

  // const [error, data] = await radash.try(octokit.users.getAuthenticated)();

  // if (error) {
  //   console.error("Error getting authenticated user:", error);
  //   throw new Error("Failed to get authenticated user");
  // }

  // const user = data.data;

  // const [getRepoError, repoInfo] = await radash.try(octokit.request)(
  //   "GET /repos/{owner}/{repo}",
  //   {
  //     owner: user.login,
  //     repo: "rubik-resume",
  //   }
  // );

  // if (getRepoError) {
  //   console.error("Error getting repo:", getRepoError);
  //   throw new Error("Failed to get repo");
  // }

  return {
    data: JSON.parse(Buffer.from(data.data.content, "base64").toString("utf-8")),
  };
};

const createFileIfNotExists = async (params: {
  octokit: Octokit;
  owner: string;
  repo: string;
  path: string;
  branch: string;
  message: string;
  content: string;
}) => {
  const { octokit, owner, repo, path, branch, message, content } = params;

  const [error] = await radash.try(octokit.repos.getContent)({
    owner,
    repo,
    path,
  });

  if (!error) {
    console.log(`创建文件： ${path} 已存在.`);
    return;
  }

  if (error instanceof Error && "status" in error && error.status === 404) {
    console.log(`创建文件： ${path}...`);
    const [createError] = await radash.try(
      octokit.repos.createOrUpdateFileContents
    )({
      owner,
      repo,
      path,
      message,
      branch,
      content: Buffer.from(content).toString("base64"), // Encode content to Base64
    });

    if (!createError) {
      console.log(`创建文件成功 ${path}。`);
      return;
    }

    console.error(`创建文件异常 ${path}:`, createError);
    throw createError;
  }

  console.error(`获取文件信息异常 ${path}:`, error);
  throw error;
};
