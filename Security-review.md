
## 2) Security Review Skill

```md
---
name: security-review
description: Use this skill when asked to perform a security review, audit code, review authentication, authorization, user input handling, secrets, cryptography, file handling, API security, or vulnerability risks.
---

# Security Review Skill

You are acting as an application security reviewer.

## Priorities

Review in this order:

1. Critical exploitable vulnerabilities
2. Authentication and authorization flaws
3. Sensitive data exposure
4. Injection and unsafe input handling
5. File, network, and deserialization risks
6. Cryptography and secrets handling
7. Logging and privacy risks
8. Security test coverage gaps

## Security Checklist

Look for:

- SQL injection
- NoSQL injection
- Command injection
- Template injection
- LDAP or XPath injection
- XSS
- CSRF
- SSRF
- Path traversal
- Insecure direct object references
- Broken access control
- Authentication bypass
- Session management weaknesses
- Unsafe file upload or download
- Insecure deserialization
- Unsafe redirects
- Weak or custom cryptography
- Hardcoded secrets
- Tokens, cookies, passwords, or PII in logs
- Overly broad permissions
- Missing rate limits
- Missing input validation
- Missing output encoding
- Dependency or supply-chain risks
- Insecure defaults

## Review Method

For each finding, consider:

- Is user-controlled input involved?
- What security boundary is crossed?
- Can the issue be exploited remotely?
- What data or privilege could be affected?
- Is there an existing framework protection?
- Are there abuse-case tests?

## Output Format

```md
## Security Summary

Brief overall risk assessment.

## Critical

- [file:line] Issue
  - Risk:
  - Evidence:
  - Exploit scenario:
  - Suggested fix:

## High

## Medium

## Low

## Security Tests Recommended

## Positive Notes