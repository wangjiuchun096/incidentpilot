import { SampleLog } from "./types";

export const sampleLogs: SampleLog[] = [
  {
    id: "db-connection-pool",
    name: "数据库连接池耗尽",
    description: "API 返回 500 错误，数据库连接池资源耗尽",
    filename: "db-connection-pool-exhaustion.log",
  },
  {
    id: "redis-timeout",
    name: "Redis 超时",
    description: "登录接口响应延迟，Redis 连接超时",
    filename: "redis-timeout-login-latency.log",
  },
  {
    id: "env-misconfig",
    name: "环境变量错误",
    description: "部署后服务启动失败，缺少数据库连接配置",
    filename: "env-misconfig-deployment.log",
  },
];

export async function loadSampleLog(filename: string): Promise<string> {
  const response = await fetch(`/data/sample-logs/${filename}`);
  return response.text();
}
