# Contributing to WithMyStar

Thank you for your interest in contributing to WithMyStar! This document provides guidelines for contributing to our gamified planet widget project.

## 🌟 Getting Started

### Prerequisites
- Basic understanding of web development (React, JavaScript/TypeScript)
- Familiarity with Rust for backend development
- Android Studio for Android application development
- Familiarity with the project vision (see README.md and PROMPT.md)

### Development Philosophy
WithMyStar follows a **safety-first approach** with a focus on **modern development practices**:
- Respect user control and consent
- Build forgiving systems that absorb mistakes
- Prioritize transparency and reversibility
- Keep the cyberpunk aesthetic fun and respectful
- Embrace robust, maintainable, and scalable code

## 📋 How to Contribute

### Types of Contributions
1. **Bug Reports**: Help us identify and fix issues in the React app, Android app, or Rust daemon.
2. **Feature Requests**: Suggest new functionality for any part of the system.
3. **Documentation**: Improve guides and technical docs for all components.
4. **Code Contributions**: Enhance the React frontend, Rust backend, or Android application.
5. **Testing**: Help validate changes across different platforms and components.
6. **Android Integration & Automation (KWGT/Tasker)**: Contribute to specific Android widget integrations or automation logic that interacts with the core application.

### Before You Start
1. Check existing issues to avoid duplicates.
2. Read PROMPT.md to understand core principles.
3. Review the project roadmap in README.md.
4. Ensure changes align with safety-first design.

## 🔧 Development Process

### For React App Contributions
1. Follow existing React code style and best practices.
2. Ensure compatibility with the Rust daemon's gRPC services.
3. Write unit and integration tests for new features or bug fixes.
4. Consider accessibility and responsiveness for various screen sizes.

### For Rust Daemon Contributions
1. Adhere to Rust idiomatic practices and code style.
2. Ensure gRPC service definitions in `ritual.proto` are updated if API changes are made.
3. Write comprehensive unit and integration tests.
4. Focus on performance, security, and reliability.

### For Android Application Contributions
1. Follow Android development best practices (Kotlin/Java).
2. Ensure seamless hosting of the React app within the WebView.
3. Optimize for performance and battery life on Android devices.
4. Test across different Android versions and device types.

### For Android Integration & Automation (KWGT/Tasker)
1. Test changes on your own device first.
2. Document any new variables or settings.
3. Ensure Safe Mode compatibility.
4. Provide screenshots of visual changes.

### For Documentation
1. Keep language clear and beginner-friendly.
2. Include practical examples.
3. Update related files consistently.
4. Consider accessibility in documentation.

## 📝 Pull Request Guidelines

### Before Submitting
- [ ] Test your changes thoroughly on relevant platforms.
- [ ] Update relevant documentation (code comments, READMEs, `/docs/`).
- [ ] Ensure Safe Mode functionality preserved (if applicable).
- [ ] Check for accessibility considerations.
- [ ] Add screenshots for visual changes (especially for UI/UX).

### PR Description
- Clear description of changes.
- Reference related issues.
- Explain testing performed.
- Note any breaking changes.
- Include safety impact assessment.

### Review Process
1. Automated checks (CI/CD pipelines, linting, tests).
2. Manual testing by maintainers.
3. Safety and accessibility review.
4. Documentation completeness check.

## 🛡️ Safety Guidelines

### User Respect
- No dark patterns or manipulation.
- Always preserve user control.
- Provide clear opt-out mechanisms.
- Respect privacy and data.

### Technical Safety
- Maintain backup and restore functionality.
- Preserve audit logging.
- Keep Safe Mode accessible.
- Test error scenarios.

### Accessibility
- Support high contrast mode.
- Respect reduce motion preferences.
- Provide text alternatives.
- Consider cognitive load.

## 🎨 Design Guidelines

### Visual Theme
- Cyberpunk aesthetic with neon colors.
- Calming, non-aggressive animations.
- Clear visual hierarchy.
- Consistent iconography.

### Interaction Design
- One-tap access to Safe Mode.
- Forgiving error recovery.
- Progressive disclosure of complexity.
- Gentle feedback for achievements.

## 📚 Resources

### Documentation
- [README.md](README.md) - Project overview and roadmap
- [PROMPT.md](PROMPT.md) - Core development principles
- `/docs/` - Technical specifications

### External Resources
- [React Documentation](https://react.dev/learn)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Tonic gRPC Framework](https://docs.rs/tonic/latest/tonic/)
- [Android Developers Documentation](https://developer.android.com/docs)
- [KWGT Documentation](https://help.kustom.rocks/) (for integration/automation)
- [Tasker User Guide](https://tasker.joaoapps.com/userguide/en/) (for integration/automation)
- [Android Accessibility Guidelines](https://developer.android.com/guide/topics/ui/accessibility)

## ❓ Getting Help

### Questions?
- Open a Discussion on GitHub.
- Check existing Issues and PRs.
- Review the documentation in `/docs/`.

### Stuck?
- Describe your setup (OS, relevant versions).
- Share relevant code snippets or logs.
- Explain what you expected vs. what happened.

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project discussions and community

Thank you for helping make WithMyStar a safe, fun, and accessible experience for everyone! 🚀
