import * as radash from "radash";
import getOctokit from "./common";
import { ERulesItemHtmlType, TSchema } from "@/constants/defaultSchema";
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
    data: [
      {
        id: "-1",
        componentKey: "BasicInfo",
        blockName: "基本信息",
        props: {
          name: "熊宇驰 YuChi",
          phone: "15997627326",
          email: "yuchi.xiong@foxmail.com",
          city: "武汉",
          weChatId: "xyc505831526",
          domain: "https://xiongyuchi.com",
          jobTitle: "Web 前端",
          experience: "5 年工作经验",
        },
      },
      {
        id: "-2",
        componentKey: "ProfessionalSkill",
        blockName: "专业技能",
        props: {
          content:
            '<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>良好的 JavaScript/TypeScript 基础，理解语言特性如原型链，闭包，异步等；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>使用 React 进行系统的开发，了解其哲学与设计思想；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>具备一定的服务端基础，熟练基于 Ruby 语言的服务端开发；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>有技术热情，给 Element Plus 提过 Issue 和 PR;</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>坚持输入输出，不定期写博客分享；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>具备基本的英语阅读能力，无心理障碍；</li></ol>',
        },
      },
      {
        id: "-3",
        componentKey: "ProjectExperience",
        blockName: "项目经验",
        props: {
          experiences: [
            {
              projectName: "作业帮图书",
              belongsCompany: "作业帮",
              startDate: "2023-04",
              endDate: "至今",
              city: "武汉",
              description: `<p>维护作业帮直播课新业务智能教辅方向的 Hybrid App 与 B 端图书生产系统。</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>参与 C 端 Hybrid 应用的开发与维护，承接了跟读系列需求与 App 稳定性建设相关工作；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>参与项目基础能力建设，优化了项目多端定宽适配、日志上报规范、Hybrid 端内外适配等方案，提升了开发的效率与质量；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>参与图书生产系统从 0 到 1 的建设，大幅降低了作业帮传统教辅业务的生产成本；</li></ol>`,
            },
            {
              projectName: "薄荷营养师",
              belongsCompany: "薄荷健康",
              startDate: "2021年10月",
              endDate: "至今",
              city: "上海",
              description: `<p>薄荷医疗营养业务线的 C 端小程序，主要提供减脂/血糖相关的营养服务，并通过自有渠道进行电商拓展。前期以小程序为载体验证盈利模式，后期将功能扩展至原生应用：</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 Taro 进行微信小程序开发；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 React 进行 H5 页面的开发，封装统一的协议兼容了小程序/H5/App 多端操作；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>参与产品交互体验优化工作，包括使用 Next.js 服务端渲染优化首屏渲染速度，缓存保活页面后台无感知更新视图等；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>参与薄荷大前端基础建设工作，完成工具库的升级与替换，推进 TypeScript 迁移；</li></ol>`,
            },
            {
              projectName: "Datrix 智能数据管理平台",
              belongsCompany: "德拓信息",
              startDate: "2021-02",
              endDate: "2021-09",
              city: "上海",
              description: `<p>集数据存储、治理、检索、展示等为一体的非结构化数据管理平台：</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 Umi + Dva 构建；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>作为前端开发工程师完成了权限、平台配置、标签管理、个人空间、总览模块的研发与维护工作；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>作为模块负责人跟进完成了总览、分享和收藏模块从确定需求到提测验收各个环节的管理工作；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>多次主动汇总项目当前的问题与改进意见并在团队内部进行分享，优化了构建稳定性与速度的同时补充了团队 Code Review 的部分代码规范细节；</li></ol>`,
            },
            {
              projectName: "电子音乐板",
              belongsCompany: "Ruby 开发工程师",
              startDate: "2019-02",
              endDate: "2021-02",
              city: "武汉",
              description: `<p>聚焦电子音乐的 App ，提供优质的掌上 LaunchPad 模拟体验与教学课程：</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 React + Ant Design  为产品开发了官网，支持移动端与 PC  端兼容；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>在以 Ruby  为主要语言的服务端环境中实践了 React  服务端渲染，同时解决了 SEO  和 WebView  场景首屏加载慢的问题； </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>作为后端开发工程师基于 Rails  开发业务 API  接口服务，持续维护与迭代；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 Ruby  编写脚本工具，解析了专业编曲软件 Ableton Live  工程并将其转换为客户端资源，解决了公司音乐素材产出效率慢的问题；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>基于 React + Ant Design  实现的用户反馈系统，支持在线处理用户反馈；</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>主动对前后端代码进行多次小范围重构，优化了多个接口的响应时长，同时在业务稳定后合并整理了用户+支付模块供公司后续项目快速接入；</li></ol>`,
            },
          ],
        },
      },
      {
        id: "-4",
        componentKey: "ProjectExperience",
        blockName: "开源相关",
        props: {
          experiences: [
            {
              projectName: "OICQ",
              belongsCompany: "https://github.com/takayama-lily/oicq/pull/484",
              startDate: "",
              endDate: "",
              city: "武汉",
              description:
                `<p>一个基于 Node.js 的 QQ 机器人协议库，目前 GitHub 有 2.4k star，作为 Contributors 为其贡献了代码。</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>该 PR 主要解决了语音消息音质差和项目对 ffmpeg 依赖导致部署困难的问题，在翻阅了多个基于 Go/Kotlin 等语言实现的协议库源码后，通过 Node.js 端的 WAA 实现完成了去 ffmpeg 化的音频编码与音质提升。</li></ol>`
            },
          ],
        },
      },
      {
        id: "-5",
        componentKey: "ProjectExperience",
        blockName: "教育经历",
        props: {
          experiences: [
            {
              projectName: "湖北大学知行学院",
              belongsCompany: "软件工程 本科 计算机信息工程系",
              startDate: "2015-09",
              endDate: "2019-06",
              city: "武汉",
              description: "",
            },
          ],
        },
      },
    ],
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
