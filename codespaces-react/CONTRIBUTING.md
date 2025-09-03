# Contributing to WithMyStar

Welcome to WithMyStar! We're excited that you're interested in contributing to our LLM gamification platform. This guide will help you get started.

## Quick Start

### Development Setup (30 seconds)
```bash
git clone <repository>
cd codespaces-react
npm install                    # 5-7 seconds
node validate.cjs              # <1 second - verify all files
./e2e-test.sh                 # 2-3 seconds - complete validation
python3 -m http.server 8000   # 2 seconds - start interface
```

### Validated Developer Workflows
All commands complete quickly with specific timeouts:

**No-Build Development (2 seconds startup)**
```bash
python3 -m http.server 8000
# Access: http://localhost:8000
```

**JavaScript Validation (<1 second)**
```bash
node validate.cjs
```

**Complete System Testing (2-3 seconds)**
```bash
./e2e-test.sh
```

**Development Server (Vite)**
```bash
npm run start
# Access: http://localhost:3000
```

## How to Contribute

### 1. Finding Issues to Work On
- Check the [Issues](../../issues) page for open issues
- Look for issues labeled `good first issue` or `help wanted`
- Read the issue description and comments carefully
- Ask questions if anything is unclear

### 2. Setting Up Your Development Environment
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/codespaces-react.git`
3. Follow the Quick Start setup above
4. Create a new branch: `git checkout -b feature/your-feature-name`

### 3. Making Changes
- Follow the existing code style and patterns
- Make minimal, focused changes
- Test your changes thoroughly using the validated workflows
- Add tests if you're adding new functionality

### 4. Testing Your Changes
Always test changes using our validated workflows:
```bash
node validate.cjs              # JavaScript validation
./e2e-test.sh                 # Complete system test
npm run build                 # Production build test
```

For UI changes, test across different environments:
- Static server: `python3 -m http.server 8000`
- Development server: `npm run start`
- Backend server: `node server/index.js`

### 5. Submitting Your Contribution
1. Commit your changes with a clear message
2. Push to your fork: `git push origin feature/your-feature-name`
3. Create a Pull Request using our PR template
4. Respond to feedback and iterate as needed

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Follow existing naming conventions
- Add appropriate error handling
- Include accessibility attributes
- Use the cyberpunk theme consistently

### File Organization
- Frontend: `src/` for React components
- Backend: `server/` for Node.js/Express code
- Static assets: `public/` directory
- Tests: Follow existing test patterns

### Git Commit Messages
Use clear, descriptive commit messages:
```
feat: add planet evolution animation
fix: resolve chat relay connection issue
docs: update API documentation
test: add unit tests for authentication
```

## Project Architecture

### Frontend (React 18+)
- Vite for dev server/build
- Custom UI components with cyberpunk theme
- Google OAuth integration
- Chat and error/resource monitoring

### Backend (Node.js/Express)
- Google Chat API relay
- Agentic AI logic
- Role/permission management
- Compliance logging

### Integration Points
- Google OAuth for authentication
- Google Chat API for messaging
- Android KWGT + Tasker system
- Local LLM training system

## Types of Contributions We Welcome

### Code Contributions
- Bug fixes
- New features
- Performance improvements
- Security enhancements
- Accessibility improvements

### Documentation
- API documentation
- Usage examples
- Tutorial content
- Code comments

### Testing
- Unit tests
- Integration tests
- E2E test improvements
- Manual testing scenarios

### Design
- UI/UX improvements
- Accessibility enhancements
- Mobile responsiveness
- Cyberpunk theme refinements

## Community Guidelines

### Be Respectful
- Use inclusive language
- Be patient with newcomers
- Provide constructive feedback
- Help others learn and grow

### Collaborate Effectively
- Ask questions when unclear
- Share knowledge and resources
- Give credit where due
- Be open to different approaches

### Focus on Quality
- Test thoroughly before submitting
- Follow security best practices
- Consider performance impact
- Think about accessibility

## Getting Help

### Documentation
- Check the [README](README.md) for basic setup
- Review the [Copilot Instructions](.github/copilot-instructions.md) for detailed architecture
- Look at existing code for patterns and examples

### Community Support
- Create an issue for bugs or feature requests
- Join discussions on existing issues
- Ask questions in pull request reviews

### Development Questions
- Use the issue tracker for technical questions
- Include relevant code snippets and error messages
- Specify your environment (OS, browser, Node.js version)

## Recognition

We value all contributions to WithMyStar. Contributors will be:
- Credited in release notes
- Listed in project documentation
- Invited to contribute to project roadmap discussions
- Recognized in the community

## License

By contributing to WithMyStar, you agree that your contributions will be licensed under the same license as the project.

## Thank You!

Your contributions help make WithMyStar better for everyone. Whether you're fixing a typo, adding a feature, or improving documentation, every contribution matters.

Ready to get started? Check out our [Issues](../../issues) page and find something that interests you!