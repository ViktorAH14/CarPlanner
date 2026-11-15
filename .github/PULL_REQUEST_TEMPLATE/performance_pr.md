<!-- Corresponding issue template: Performance Issue (performance_issue.yaml) -->

## [Perf]: Symptom

<!-- Describe the performance problem this PR addresses, in measurable terms. Copy the symptom from the performance issue. -->

<!-- e.g. The GET /api/protected/profile endpoint takes ~8 seconds to respond. Expected: <200ms. -->

## Root cause

<!-- What was identified as the cause of the performance problem? Include profiling results, query plans, flame graphs, etc. -->

## Solution

<!-- What exactly was changed to fix the performance issue: indexing, caching, query optimization, async patterns, algorithm changes, etc. -->

## Steps to verify

<!-- Exact steps and load conditions a reviewer should follow to confirm the improvement, mirroring the reproduction steps from the issue. -->

1.
2.
3.

## Metrics & results

<!-- Before/after measurements: response time, CPU/memory usage, throughput, DB query counts. Include tooling used (benchmark scripts, load tests, profilers). -->

| Metric        | Before | After |
| ------------- | ------ | ----- |
| Response time |        |       |
| CPU usage     |        |       |
| DB query time |        |       |

<!-- If no real measurements yet, explain how the improvement will be measured. -->

## Environment

<!-- Where the measurements were taken. -->

<!-- e.g. Local Docker (8GB RAM), PostgreSQL 15, staging, production. -->

## Suspected area addressed

<!-- Check the area(s) this PR changes, mirroring the suspected area from the issue. -->

- [ ] API endpoint logic
- [ ] Database query / indexing
- [ ] Serialization / JSON conversion
- [ ] Network latency
- [ ] Flutter rendering / heavy computation
- [ ] Other (specify in Symptom)

## Regression checks

<!-- Confirm that functionality and other performance characteristics are not negatively affected. -->

- [ ] Core functionality still works
- [ ] Other endpoints/screens not regressed
- [ ] No increased resource usage elsewhere (CPU/memory/network)
- [ ] Edge cases and error handling still work

## Tests

<!-- Indicate what tests were added or updated, including any performance-related tests. -->

- [ ] Unit tests
- [ ] Integration / API tests
- [ ] Benchmark / load test added or updated
- [ ] No tests needed for this change

## Related issue

<!-- Link the performance issue this PR closes, e.g. "Closes #123". -->

Closes #
