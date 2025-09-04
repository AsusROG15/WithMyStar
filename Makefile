
.PHONY: all build clean install

all: build

build: build-react build-rust build-android

build-react:
	@echo "Building React app..."
	cd react-app && npm install && npm run build

build-rust:
	@echo "Building Rust daemon..."
	cd rust-daemon && cargo build

build-android:
	@echo "Building Android app..."
	cd android-app && ./gradlew build

install:
	@echo "Installing dependencies..."
	cd react-app && npm install
	cd android-app && ./gradlew assembleDebug

clean:
	@echo "Cleaning up..."
	cd react-app && npm run clean
	cd rust-daemon && cargo clean
	cd android-app && ./gradlew clean

