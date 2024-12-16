import { Octokit } from '@octokit/rest';
import * as radash from 'radash'

function getOctokit(accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  return new Octokit({ auth: accessToken });
}

/** 获取 Repo 信息 */
export async function getRepoInfo(accessToken?: string) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  
  const octokit = getOctokit(accessToken);
  const [error, data] = await radash.try(octokit.users.getAuthenticated)();

  if (error) {
    console.error('Error getting authenticated user:', error);
    throw new Error('Failed to get authenticated user');
  }

  const user = data.data;

  const [getRepoError, repoInfo] = await radash.try(octokit.request)('GET /repos/{owner}/{repo}', {
    owner: user.login,
    repo: 'rubik-resume',
  });

  if (getRepoError) {
    console.error('Error getting repo:', getRepoError);
    throw new Error('Failed to get repo');
  }

  return {
    owner: user.login,
    repo: 'rubik-resume',
    data: repoInfo?.data
  };
}