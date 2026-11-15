<!-- Corresponding issue template: Security Issue (security_issue.yml) -->

## [Security]: Vulnerability type

<!-- Type of issue being fixed, e.g. SQL injection, XSS, auth bypass. -->

<!-- e.g. JWT token leakage in logs -->

## Impact

<!-- Who/what was affected and how severe the impact was. Reference the impact assessment from the security issue. -->

## Fix details

<!-- What exactly was changed to mitigate the vulnerability: input validation, sanitization, access checks, config, dependency upgrade, etc. Keep this description free of sensitive data. -->

## Minimal steps to verify the fix

<!-- Minimal steps to demonstrate the vulnerability is fixed, without sharing secrets. Mirror the reproduction steps from the issue. -->

1.
2.
3.

**Before the fix:**

**After the fix:**

## Current mitigations applied

<!-- Any interim fixes or workarounds that were in place, and whether this PR replaces or complements them. -->

## Regression checks

<!-- Confirm the fix does not break functionality or introduce new risks. -->

- [ ] Core functionality still works
- [ ] No new attack surface introduced
- [ ] Authentication/authorization flows unaffected (if applicable)
- [ ] No sensitive data logged

## Tests

- [ ] Automated test added that would fail without this fix
- [ ] Existing security-related tests pass
- [ ] Dependency audit clean (if dependencies were changed)

## Related issue

<!-- Link the security issue this PR closes. If the issue is private, reference it without confidential details. -->

Closes #

---

## ⚠️ Security Notice

Do not post credentials, tokens, or sensitive data in this PR.  
For critical vulnerabilities, contact the maintainer directly via email (see README) instead of public discussions.
