# Security Policy

## Supported Versions

We actively support the following versions of WithMyStar:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in WithMyStar, please follow these steps:

### 1. Do NOT create a public issue
Security vulnerabilities should be reported privately to avoid potential exploitation.

### 2. Contact us securely
- **Email**: Send details to the repository maintainers
- **GitHub Security**: Use GitHub's security advisory feature
- **Encrypted communication**: PGP key available upon request

### 3. Include in your report
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information

### 4. What to expect
- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Resolution timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next release cycle

## Security Considerations

### LLM and AI Safety
- All LLM interactions are logged for audit purposes
- Content filtering prevents harmful prompt injection
- User queries are validated before processing
- Rate limiting prevents abuse

### Data Protection
- No sensitive user data is stored permanently
- Google OAuth tokens are handled securely
- Chat relay logs are anonymized
- Local training data stays on user devices

### Infrastructure Security
- SLSA provenance for supply chain security
- Dependency scanning in CI/CD pipeline
- Security headers implemented
- Regular dependency updates

### Android Widget Security
- KWGT widget operates in sandboxed environment
- Tasker integration uses secure communication
- Local data encryption for sensitive information
- Network requests use HTTPS only

## Responsible Disclosure
We follow responsible disclosure practices:

1. **Coordination**: We will work with you to understand and validate the vulnerability
2. **Timeline**: We aim to resolve issues promptly while ensuring thorough testing
3. **Credit**: With your permission, we will credit you in our security advisories
4. **Communication**: We will keep you informed throughout the resolution process

## Security Best Practices for Contributors

### Code Security
- Use parameterized queries to prevent injection attacks
- Validate all user inputs
- Sanitize data before displaying in UI
- Follow principle of least privilege

### Dependency Management
- Regularly update dependencies
- Review security advisories
- Use `npm audit` to check for vulnerabilities
- Pin dependency versions in production

### Authentication & Authorization
- Implement proper session management
- Use strong authentication mechanisms
- Validate user permissions for all actions
- Log security-relevant events

### Environment Security
- Store secrets in environment variables
- Use HTTPS for all external communications
- Implement proper error handling (no stack traces in production)
- Configure CORS appropriately

## Incident Response
In case of a security incident:

1. **Immediate response**: Secure the affected systems
2. **Assessment**: Determine scope and impact
3. **Communication**: Notify affected users if necessary
4. **Resolution**: Implement and test fixes
5. **Post-incident**: Review and improve security measures

## Contact
For security-related questions or concerns:
- Security issues: Use GitHub Security Advisories
- General questions: Create an issue with the `security` label
- Urgent matters: Contact repository maintainers directly

Thank you for helping keep WithMyStar and our community safe!