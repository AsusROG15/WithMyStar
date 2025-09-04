# WithMyStar

This repository contains the source code for WithMyStar, a gamified, agentic widget that provides a visual training companion.

## Workspace Structure

This workspace is organized as a multi-root workspace, with the following components:

- `react-app`: The React web application that serves as the UI for the planet widget.
- `android-app`: The Android application that hosts the React app in a WebView and provides the home screen widget.
- `rust-daemon`: A Rust-based gRPC service for state handling, automations, and backups.
- `docs`: Contains the detailed documentation for the project.
- `autogpt-reference`: A reference implementation of an AI agent platform.
- `ollama-client-reference`: A reference implementation of a client for the Ollama service.

## Getting Started

To get started with development, you can use the `Makefile` in the root directory:

- `make build`: Build all the components of the project.
- `make install`: Install the dependencies for all the components.
- `make clean`: Clean the build artifacts for all the components.

For more detailed information, please refer to the documentation in the `docs` directory.
