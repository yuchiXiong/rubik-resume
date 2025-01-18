import { IBasicInfoProps } from "@/components/blocks/BasicInfo/BasicInfo";
import { IProfessionalSkillProps } from "@/components/blocks/ProfessionalSkill/ProfessionalSkill";
import { IProjectExperienceProps } from "@/components/blocks/ProjectExperience/ProjectExperience";

export enum ERulesItemHtmlType {
  Input = "input",
  Select = "select",
  Textarea = "textarea",
}

export interface IRulesOptionItem {
  label: string;
  value: string;
}

export interface ISchema<
  T extends IBasicInfoProps | IProfessionalSkillProps | IProjectExperienceProps
> {
  id: string;
  componentKey: string;
  blockName: string;
  props: T;
  // todo 这里要改回去的，不能是可选
  rules?: {
    key: keyof T;
    label: string;
    required: boolean;
    htmlType: ERulesItemHtmlType;
    options: IRulesOptionItem[];
  }[];
}

export type TSchema =
  | ISchema<IBasicInfoProps>
  | ISchema<IProfessionalSkillProps>
  | ISchema<IProjectExperienceProps>;

const DEFAULT_SCHEMA: [
  ISchema<IBasicInfoProps>,
  ISchema<IProfessionalSkillProps>,
  ISchema<IProjectExperienceProps>,
] = [
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
    rules: [
      {
        key: "name",
        label: "姓名",
        required: true,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "phone",
        label: "电话",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "email",
        label: "邮箱",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "city",
        label: "现居城市",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "weChatId",
        label: "微信",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "domain",
        label: "个人网站",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "jobTitle",
        label: "期望职位",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
      {
        key: "experience",
        label: "当前状态",
        required: false,
        htmlType: ERulesItemHtmlType.Input,
        options: [],
      },
    ],
  },
  {
    id: "-2",
    componentKey: "ProfessionalSkill",
    blockName: "专业技能",
    props: {
      list: [
        "良好的 JavaScript/TypeScript 基础，理解语言特性如原型链，闭包，异步等；",
        "使用 React 进行系统的开发，了解其哲学与设计思想；",
        "具备一定的服务端基础，熟练基于 Ruby 语言的服务端开发；",
        "有技术热情，给 Element Plus 提过 Issue 和 PR;",
        "坚持输入输出，不定期写博客分享；",
        "具备基本的英语阅读能力，无心理障碍；",
      ],
    },
  },
  {
    id: "-3",
    componentKey: "ProjectExperience",
    blockName: "项目经验",
    props: {
      blockName: "项目经验",
      experiences: [
        {
          projectName: "作业帮图书",
          belongsCompany: "作业帮",
          startDate: "2023-04",
          endDate: "至今",
          city: "武汉",
          description:
            "维护作业帮直播课新业务智能教辅方向的 Hybrid App 与 B 端图书生产系统。",
          content: [
            "参与 C 端 Hybrid 应用的开发与维护，承接了跟读系列需求与 App 稳定性建设相关工作；",
            "参与项目基础能力建设，优化了项目多端定宽适配、日志上报规范、Hybrid 端内外适配等方案，提升了开发的效率与质量；",
            "参与图书生产系统从 0 到 1 的建设，大幅降低了作业帮传统教辅业务的生产成本；",
          ],
        },
        {
          projectName: "薄荷营养师",
          belongsCompany: "薄荷健康",
          startDate: "2021年10月",
          endDate: "至今",
          city: "上海",
          description:
            "薄荷医疗营养业务线的 C 端小程序，主要提供减脂/血糖相关的营养服务，并通过自有渠道进行电商拓展。前期以小程序为载体验证盈利模式，后期将功能扩展至原生应用：",
          content: [
            "基于 Taro 进行微信小程序开发；",
            "基于 React 进行 H5 页面的开发，封装统一的协议兼容了小程序/H5/App 多端操作；",
            "参与产品交互体验优化工作，包括使用 Next.js 服务端渲染优化首屏渲染速度，缓存保活页面后台无感知更新视图等；",
            "参与薄荷大前端基础建设工作，完成工具库的升级与替换，推进 TypeScript 迁移；",
          ],
        },
        {
          projectName: "Datrix 智能数据管理平台",
          belongsCompany: "德拓信息",
          startDate: "2021-02",
          endDate: "2021-09",
          city: "上海",
          description:
            "集数据存储、治理、检索、展示等为一体的非结构化数据管理平台：",
          content: [
            "基于 Umi + Dva 构建；",
            "作为前端开发工程师完成了权限、平台配置、标签管理、个人空间、总览模块的研发与维护工作；",
            "作为模块负责人跟进完成了总览、分享和收藏模块从确定需求到提测验收各个环节的管理工作；",
            "多次主动汇总项目当前的问题与改进意见并在团队内部进行分享，优化了构建稳定性与速度的同时补充了团队 Code Review 的部分代码规范细节；",
          ],
        },
        {
          projectName: "电子音乐板",
          belongsCompany: "Ruby 开发工程师",
          startDate: "2019-02",
          endDate: "2021-02",
          city: "武汉",
          description:
            "聚焦电子音乐的 App ，提供优质的掌上 LaunchPad  模拟体验与教学课程：",
          content: [
            "基于 React + Ant Design  为产品开发了官网，支持移动端与 PC  端兼容；",
            "在以 Ruby  为主要语言的服务端环境中实践了 React  服务端渲染，同时解决了 SEO  和 WebView  场景首屏加载慢的问题； ",
            "作为后端开发工程师基于 Rails  开发业务 API  接口服务，持续维护与迭代；",
            "基于 Ruby  编写脚本工具，解析了专业编曲软件 Ableton Live  工程并将其转换为客户端资源，解决了公司音乐素材产出效率慢的问题；",
            "基于 React + Ant Design  实现的用户反馈系统，支持在线处理用户反馈；",
            "主动对前后端代码进行多次小范围重构，优化了多个接口的响应时长，同时在业务稳定后合并整理了用户+支付模块供公司后续项目快速接入；",
          ],
        },
      ],
    },
  },
];

export { DEFAULT_SCHEMA };
