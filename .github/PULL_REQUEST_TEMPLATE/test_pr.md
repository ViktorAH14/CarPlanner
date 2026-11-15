<!-- Corresponding issue template: Test Issue (test_issue.yml) -->

## [Test]: Test name / file

<!-- Provide the exact test or file this PR changes, matching the test issue. -->
<!-- e.g. frontend/test/home_screen_test.dart - test 'shows SnackBar on button press' -->

## Issue type

<!-- Check the option that matches the corresponding test issue. -->

- [ ] Test is failing
- [ ] Test is flaky (fails intermittently)
- [ ] Missing test for new feature
- [ ] Coverage is below target
- [ ] Test setup/teardown is fragile

## Failure details

<!-- Error message, stack trace, or conditions under which the test failed. -->
<!-- Copy the relevant details from the test issue. -->

## How the issue was reproduced

<!-- Commands and environment used to reproduce the failure, mirroring the reproduction steps from the issue. -->

```bash
# e.g.
cd frontend
flutter test test/home_screen_test.dart
# Or: Run CI job #1234.
```

## Changes made

<!-- List the concrete changes: which test files were added, fixed, refactored, or removed. -->

-
-

## Root cause

<!-- What caused the failure or flakiness, and how this change addresses it. -->
<!-- Skip this section if the PR only adds new coverage. -->

## How to verify

<!-- Commands and environment to confirm the tests now behave as expected. -->
<!-- For flaky tests, include repeated runs. -->

```bash
# e.g.
cd frontend
flutter test test/home_screen_test.dart
```

- [ ] Test passes locally
- [ ] Test passes in CI (link to the run, if applicable)
- [ ] Repeated runs (for flakiness): passes consistently

## Coverage impact

<!-- Did this change increase coverage? Which paths are now covered? -->
<!-- If the issue type was "Coverage is below target", show the numbers. -->

- Before:
- After:

## Impacted areas

<!-- Check all areas touched by this PR. Mirrors the impacted areas from the issue. -->

- [ ] Unit tests
- [ ] Widget tests
- [ ] Integration/API tests
- [ ] Test data / fixtures
- [ ] CI pipeline

## Related issue

<!-- Link the test issue this PR closes, e.g. "Closes #123". -->

Closes #
