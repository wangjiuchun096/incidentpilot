import { IncidentAnalysis } from "./types";

export async function analyzeIncident(logs: string): Promise<IncidentAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const hasPoolExhaustion = logs.includes("connection pool") || logs.includes("pool exhausted") || logs.includes("too many connections");
  const hasRedisTimeout = logs.includes("Redis connection timeout") || logs.includes("redis") && logs.includes("timeout");
  const hasEnvMisconfig = logs.includes("missing required environment variable") || logs.includes("DATABASE_URL") && logs.includes("missing");

  if (hasPoolExhaustion) {
    return {
      summary: "数据库连接池资源耗尽，导致 API 请求失败并返回 500 错误",
      severity: "high",
      affectedServices: ["api-service", "postgres"],
      probableRootCause: "数据库连接池配置的最大连接数不足，在高并发场景下连接资源被耗尽",
      evidence: [
        "[2026-05-14T07:45:12.456Z] ERROR: Connection pool exhausted - no available connections",
        "[2026-05-14T07:45:13.789Z] ERROR: Failed to acquire connection from pool after 30s timeout",
      ],
      debugSteps: [
        "检查当前数据库连接池配置 (max_connections)",
        "查看活跃连接数: SELECT count(*) FROM pg_stat_activity",
        "识别长时间运行的事务: SELECT * FROM pg_stat_activity WHERE state != 'idle'",
        "检查是否有连接泄漏 (未关闭的数据库连接)",
        "考虑增加连接池最大连接数或启用连接复用",
      ],
      recommendedFix: "将数据库连接池的 max_connections 从 100 增加到 200，并在应用层实现连接池健康检查和自动回收机制",
      postmortemDraft: `# Postmortem: 数据库连接池耗尽事故

## 事故时间
2026-05-14 07:45:00 UTC

## 影响
- API 可用性: 下降至 0%
- 影响时长: 约 15 分钟
- 影响服务: api-service
- 影响用户: 所有 API 用户

## 根因
数据库连接池配置的最大连接数为 100，在高并发场景下连接资源被耗尽。

## 根本原因
1. 连接池最大连接数配置过小
2. 部分请求持有连接时间过长
3. 缺少连接池监控和告警

## 改进措施
- [ ] 增加连接池最大连接数
- [ ] 添加连接池使用率监控
- [ ] 优化慢查询，减少连接占用时间
- [ ] 实现连接池自动回收机制`,
      confidence: 0.92,
      timestamp: new Date().toISOString(),
    };
  }

  if (hasRedisTimeout) {
    return {
      summary: "Redis 连接超时导致会话验证失败，登录接口响应延迟",
      severity: "medium",
      affectedServices: ["auth-service", "redis"],
      probableRootCause: "Redis 主节点不可用，触发 Sentinel 故障转移，期间会话服务降级到数据库查询",
      evidence: [
        "[2026-05-14T08:15:02.789Z] WARN: Redis connection timeout - unable to connect to redis-master:6379",
        "[2026-05-14T08:15:05.456Z] CRITICAL: Redis master instance unreachable from replica",
      ],
      debugSteps: [
        "检查 Redis Sentinel 状态: redis-cli sentinel master mymaster",
        "查看 Redis 节点网络连通性: ping redis-master",
        "检查 Redis 节点的 CPU 和内存使用率",
        "分析 Sentinel 日志，定位故障转移原因",
        "确认新主节点已同步所有数据",
      ],
      recommendedFix: "优化 Redis Sentinel 故障转移时间，增加读写分离以分散 Redis 负载压力",
      postmortemDraft: `# Postmortem: Redis 超时导致登录延迟

## 事故时间
2026-05-14 08:15:00 UTC

## 影响
- 登录接口延迟: 从 50ms 上升到 2800ms
- 影响时长: 约 45 秒
- 影响服务: auth-service
- 影响用户: 约 200 名用户登录受影响

## 根因
Redis 主节点不可用，触发 Sentinel 故障转移。

## 改进措施
- [ ] 优化 Redis 故障转移时间
- [ ] 增加 Redis 读写分离
- [ ] 添加 Redis 连接池监控`,
      confidence: 0.88,
      timestamp: new Date().toISOString(),
    };
  }

  if (hasEnvMisconfig) {
    return {
      summary: "新版本部署时 ConfigMap 中缺少 DATABASE_URL，导致服务启动失败",
      severity: "high",
      affectedServices: ["api-service", "postgres"],
      probableRootCause: "部署脚本未正确更新新版本的 ConfigMap，导致容器启动时无法获取数据库连接配置",
      evidence: [
        "[2026-05-14T10:30:06.123Z] ERROR: Failed to load configuration - missing required environment variable: DATABASE_URL",
        "[2026-05-14T10:31:00.789Z] ERROR: Deployment rolled back - missing DATABASE_URL in new version's ConfigMap",
      ],
      debugSteps: [
        "检查新版本 ConfigMap 配置: kubectl get configmap api-config -o yaml",
        "对比新旧版本的 ConfigMap 差异",
        "验证环境变量注入配置",
        "检查部署脚本是否包含环境变量更新步骤",
      ],
      recommendedFix: "在部署流程中添加 ConfigMap 和环境变量的完整性检查，确保所有必需变量存在后再执行滚动更新",
      postmortemDraft: `# Postmortem: 环境变量配置错误导致部署失败

## 事故时间
2026-05-14 10:30:00 UTC

## 影响
- API 可用性: 下降至 0%
- 影响时长: 约 30 秒 (自动回滚)
- 影响服务: api-service
- 影响用户: 无 (自动回滚未影响用户)

## 根因
新版本的 ConfigMap 缺少 DATABASE_URL 环境变量配置。

## 改进措施
- [ ] 部署前检查 ConfigMap 完整性
- [ ] 添加部署前环境变量校验
- [ ] 实现配置版本管理`,
      confidence: 0.95,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    summary: "检测到系统异常活动，建议检查相关日志",
    severity: "medium",
    affectedServices: ["unknown"],
    probableRootCause: "日志中未识别到明确的错误模式",
    evidence: logs.split("\n").slice(0, 3).map((line) => `[Unknown] ${line}`),
    debugSteps: [
      "仔细审查日志内容",
      "确认日志格式和来源",
      "检查系统监控指标",
    ],
    recommendedFix: "提供更完整或格式正确的日志以便分析",
    postmortemDraft: "# Postmortem: 待分析\n\n请提供更完整的事故日志",
    confidence: 0.3,
    timestamp: new Date().toISOString(),
  };
}
