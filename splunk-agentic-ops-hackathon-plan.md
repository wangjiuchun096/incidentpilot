# Splunk Agentic Ops Hackathon 执行计划

计划日期：2026-05-13 至 2026-06-15  
参赛项目：Splunk Agentic Ops Hackathon  
项目代号：IncidentPilot  
目标：在保留主业节奏的前提下，完成一个可演示、可提交、可继续产品化的 AI 运维事故排查助手。

## 1. 项目定位

IncidentPilot 是一个面向 SRE、DevOps、后端工程师的 AI 事故排查助手。

核心场景：

- 用户粘贴或上传日志、告警、错误堆栈
- 系统自动识别事故摘要、严重程度、可能根因和证据
- 系统生成排查步骤、修复建议和 postmortem 草稿
- 系统展示 AI 分析过程、置信度、耗时和可追溯证据
- 可选接入 Splunk 数据源或模拟 Splunk 查询结果

一句话价值主张：

> IncidentPilot turns raw observability data into root-cause hypotheses, debug steps, and postmortem drafts in minutes.

## 2. MVP 范围

必须完成：

- 日志输入框或文件上传
- AI 结构化事故分析
- 事故分析结果页面
- 历史分析记录
- Postmortem 报告生成
- Demo 视频
- README 和提交材料

尽量完成：

- 模拟 Splunk 查询结果
- 服务健康时间线
- 模型调用耗时、状态和成本记录
- 简单 dashboard
- 一键导出 Markdown 报告

暂不做：

- 多租户权限系统
- 复杂告警规则引擎
- 企业级 RBAC
- 真实生产环境部署
- 完整 Splunk 企业集成

## 3. 技术栈建议

优先选择单体项目，降低黑客松交付风险。

- 前端：Next.js + Tailwind CSS
- UI：shadcn/ui 或轻量自定义组件
- 后端：Next.js API Routes
- 数据库：Supabase Postgres 或本地 SQLite
- AI：OpenAI / Claude / Gemini 任一可用模型
- 部署：Vercel
- 数据源：先用 mock Splunk data，时间允许再接 Splunk API 或 MCP

推荐目录：

```text
opsagent-lab/
  app/
    page.tsx
    incidents/
    reports/
    dashboard/
    api/
  components/
  lib/
    ai/
    incidents/
    splunk/
    reports/
  data/
    sample-logs/
```

## 4. 每周时间预算

工作日：

- 每天 1.5 到 2 小时
- 只做一个小目标
- 避免工作日做大范围重构

周末：

- 每天 4 到 6 小时
- 集中完成核心功能、UI 打磨、录制 demo

总原则：

- 先闭环，再美化
- 先 mock，再集成
- 先能演示，再考虑架构优雅

## 5. 日程安排

### 阶段 0：赛前准备，2026-05-13 至 2026-05-17

目标：在比赛开始前完成产品定义和项目骨架。

2026-05-13：

- [x] 确定项目名称：IncidentPilot
- [x] 确定核心 demo 流程
- [x] 创建本地 Git 仓库
- [ ] 创建 GitHub 远程仓库
- [x] 写下 README 初稿

备注：当前 GitHub CLI 尚未登录，远程仓库需要登录后创建。

2026-05-14：

- 初始化 Next.js 项目
- 配置 Tailwind
- 搭建基础页面结构
- 准备 3 份样例日志

2026-05-15：

- 设计事故分析 JSON schema
- 编写第一版 AI prompt
- 实现 mock 分析结果渲染

2026-05-16：

- 接入第一个 LLM API
- 完成“粘贴日志 -> AI 分析 -> 页面展示”闭环

2026-05-17：

- 修复基础问题
- 整理项目截图
- 明确第一周交付目标

阶段验收：

- 项目能本地启动
- 能输入日志
- 能看到结构化分析结果

### 阶段 1：核心 MVP，2026-05-18 至 2026-05-24

目标：完成可演示的最小产品。

2026-05-18：

- 检查比赛规则和提交要求
- 根据官方要求微调项目定位
- 更新 README 的 problem statement

2026-05-19：

- 完善 Incident Analyzer 页面
- 增加 severity、root cause、evidence、debug steps 展示

2026-05-20：

- 保存分析历史
- 实现历史记录列表

2026-05-21：

- 增加 postmortem 草稿生成
- 支持 Markdown 格式输出

2026-05-22：

- 增加样例日志一键加载
- 准备稳定 demo 数据

2026-05-23：

- 打磨核心页面 UI
- 修复主要交互问题
- 录制第一版 1 分钟内部 demo

2026-05-24：

- 阶段复盘
- 删除不必要功能
- 确认第二周增强方向

阶段验收：

- 完成完整事故分析流程
- 有历史记录
- 能生成 postmortem 草稿

### 阶段 2：Splunk 场景强化，2026-05-25 至 2026-05-31

目标：让项目更贴近 Splunk Agentic Ops 主题。

2026-05-25：

- 设计 mock Splunk 查询结果格式
- 增加 service、host、timestamp、source 字段

2026-05-26：

- 实现 mock Splunk data loader
- 在分析页面显示日志来源和时间线

2026-05-27：

- 增加服务健康概览
- 显示 error rate、latency、affected service

2026-05-28：

- 优化 prompt，让 AI 引用具体日志证据
- 避免泛泛而谈的分析结果

2026-05-29：

- 增加 confidence 和 evidence mapping
- 标注每个结论对应的日志片段

2026-05-30：

- 完成 dashboard 初版
- 展示事件数、平均分析时间、严重事故数

2026-05-31：

- 录制第二版 demo
- 检查 Splunk 主题表达是否清晰

阶段验收：

- 项目看起来像运维/可观测性产品
- 分析结果能引用日志证据
- Dashboard 能支撑演示叙事

### 阶段 3：产品化与可靠性，2026-06-01 至 2026-06-07

目标：提升完整度，让项目不像一次性 demo。

2026-06-01：

- 增加 AI 调用状态记录
- 记录 model、latency、success、error

2026-06-02：

- 增加 timeout 和 retry
- 显示分析失败时的友好错误信息

2026-06-03：

- 增加 fallback 逻辑
- 主模型失败时切换备用模型或 mock fallback

2026-06-04：

- 增加报告页面
- 支持查看完整 incident report

2026-06-05：

- 支持导出 Markdown 报告
- 优化报告格式

2026-06-06：

- 部署到 Vercel
- 检查线上环境变量和 API 调用

2026-06-07：

- 全流程线上测试
- 记录 bug 清单

阶段验收：

- 线上 demo 可访问
- AI 调用失败有降级体验
- 报告页面完整

### 阶段 4：提交材料，2026-06-08 至 2026-06-12

目标：把项目包装成高质量参赛作品。

2026-06-08：

- 写 README 完整版
- 包含 problem、solution、features、architecture、how to run

2026-06-09：

- 准备架构图
- 准备 demo 脚本

2026-06-10：

- 录制 2 到 3 分钟 demo 视频
- 确保视频里能看清核心流程

2026-06-11：

- 修改 landing / 首页文案
- 强化 Splunk Agentic Ops 价值表达

2026-06-12：

- 填写提交页草稿
- 准备截图、链接、视频、GitHub repo

阶段验收：

- README 完整
- Demo 视频完成
- 提交材料基本就绪

### 阶段 5：缓冲与最终提交，2026-06-13 至 2026-06-15

目标：只修关键问题，不再加大功能。

2026-06-13：

- 完整跑 3 次 demo 流程
- 修复阻塞性 bug
- 检查移动端和桌面端基本可用性

2026-06-14：

- 最终检查提交材料
- 提交项目
- 保存提交截图和确认邮件

2026-06-15：

- 预留应急时间
- 如已提交，整理赛后复盘

阶段验收：

- 项目成功提交
- GitHub、线上 demo、视频链接都可访问

## 6. Demo 脚本

推荐 2 到 3 分钟结构：

1. 问题：线上事故排查需要在告警、日志、runbook、postmortem 之间来回切换，耗时且依赖经验。
2. 方案：IncidentPilot 将原始 observability data 转换成 root-cause hypotheses、debug steps 和 postmortem drafts。
3. 演示：加载一段数据库连接池耗尽的样例日志。
4. 分析：展示事故摘要、严重程度、根因假设、证据和排查步骤。
5. 报告：生成 postmortem 草稿。
6. 价值：帮助团队减少 MTTR，让值班工程师更快完成判断和复盘。

## 7. 样例事故场景

优先准备 3 个稳定样例：

- 数据库连接池耗尽导致 API 500
- Redis 超时导致登录接口变慢
- 部署后环境变量错误导致服务启动失败

每个样例至少包含：

- 时间戳
- 服务名
- 错误日志
- 相关 warning
- 1 到 2 条误导性噪音日志

## 8. 评审表达重点

重点强调：

- Real-world incident response pain
- Agentic analysis over machine data
- Evidence-based root cause hypothesis
- Faster postmortem generation
- Potential integration with Splunk data sources
- Clear path to production use

避免强调：

- 只是一个 ChatGPT wrapper
- 只是日志总结器
- 只是漂亮 dashboard
- 过度承诺自动修复生产事故

## 9. 每日执行模板

每天开始前写下：

```text
今日目标：
预计耗时：
完成标准：
```

每天结束前记录：

```text
今天完成：
遇到问题：
明天第一件事：
```

## 10. 最终提交检查清单

- [ ] 线上 demo 可访问
- [ ] GitHub repo 可访问
- [ ] README 有清晰启动方式
- [ ] Demo 视频可播放
- [ ] 首页能在 10 秒内讲清楚产品价值
- [ ] 样例数据稳定
- [ ] AI API key 不在仓库中
- [ ] 环境变量文档完整
- [ ] 提交页链接全部正确
- [ ] 至少提前 24 小时完成提交

## 11. 赛后复盘

无论是否获奖，赛后都做这几件事：

- 写一篇技术复盘文章
- 把项目整理成作品集案例
- 提炼可复用的 AI gateway、report generator、log analyzer 模块
- 找 3 位 SRE / 后端工程师试用
- 判断是否继续产品化

赛后可产品化方向：

- 开发者个人事故复盘助手
- 小团队 SRE Copilot
- AI observability report generator
- 企业内部日志分析知识库
