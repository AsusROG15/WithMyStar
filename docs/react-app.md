# WithMyStar

Agentic Widget that gamifies Free LLMs into a planet visually evolving symbolically training locally for users making it in essence a visual training LLM game but is a Widget.

## 🚀 Quick Start

The project is fully validated and ready for development. All commands complete quickly:

```bash
# Clone and setup (30 seconds total)
git clone <repository>
cd codespaces-react
npm install --legacy-peer-deps    # 5-7 seconds
node validate.cjs                 # <1 second - verify all files
./e2e-test.sh                    # 2-3 seconds - complete validation
python3 -m http.server 8000      # 2 seconds - start interface
```

## 🛠️ Development

**Static Development Server (No Build Required)**
```bash
python3 -m http.server 8000
# Access: http://localhost:8000
```

**React Development Server**
```bash
npm run start
# Access: http://localhost:3000
```

**Backend Server**
```bash
node server/index.js
# API: http://localhost:5000
```

## ✅ Validation & Testing

```bash
node validate.cjs     # JavaScript validation (<1 second)
./e2e-test.sh        # Complete system test (2-3 seconds)
npm run build        # Production build test
```

## 🎯 Features

- **LLM Gamification**: Visual planet evolution based on training progress
- **Multi-Platform**: React web interface + Android KWGT widget + Tasker integration
- **Google Chat Integration**: Secure webhook relay with agentic AI responses
- **Cyberpunk UI**: Accessible, responsive design with neon aesthetics
- **Role Management**: Admin, dev, and auditor permissions with compliance logging
- **Security**: Guard rails, content filtering, and SLSA supply chain attestation

## 🔧 GitHub Integration

**Complete CI/CD Pipeline**
- Automated testing, building, and deployment
- Security scanning and vulnerability checks
- SLSA Level 3 supply chain security
- Preview deployments for PRs

**Issue & PR Management**
- Bug report templates
- Feature request templates
- LLM training issue templates
- Comprehensive PR review checklist

**Security & Compliance**
- Security policy with responsible disclosure
- Contributing guidelines
- Automated security scanning

## 📁 Project Structure

```
├── .github/           # GitHub workflows, templates, and policies
├── src/              # React frontend components
├── server/           # Node.js/Express backend
├── public/           # Static assets
├── index.html        # Main interface (no-build development)
├── main.js           # Frontend logic and chat UI
├── validate.cjs      # JavaScript validation tool
└── e2e-test.sh       # Complete system testing
```

## 🌟 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for security policies and reporting vulnerabilities.

---

*WithMyStar - Making LLM training a visual, gamified experience*
