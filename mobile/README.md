# MiniApp - Android Mobile Application

A native Android application built with Kotlin and XML that connects to the Spring Boot authentication backend.

## Features

- User Registration
- User Login with JWT Authentication
- Protected Dashboard with User Information
- Token-based Authentication
- Network API calls using Retrofit
- Material Design UI Components

## Tech Stack

- **Language**: Kotlin
- **UI**: XML Layouts with Material Design
- **Networking**: Retrofit 2.9.0 + OkHttp
- **Architecture**: MVVM-like with Coroutines
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)

## Project Structure

```
app/
├── src/main/
│   ├── java/com/auth/miniapp/
│   │   ├── activities/
│   │   │   ├── LoginActivity.kt
│   │   │   ├── RegisterActivity.kt
│   │   │   └── DashboardActivity.kt
│   │   ├── api/
│   │   │   ├── ApiService.kt
│   │   │   └── RetrofitClient.kt
│   │   ├── models/
│   │   │   ├── User.kt
│   │   │   ├── LoginRequest.kt
│   │   │   ├── LoginResponse.kt
│   │   │   ├── RegisterRequest.kt
│   │   │   ├── MessageResponse.kt
│   │   │   └── UserResponse.kt
│   │   └── utils/
│   │       ├── TokenManager.kt
│   │       └── Validator.kt
│   ├── res/
│   │   ├── layout/
│   │   │   ├── activity_login.xml
│   │   │   ├── activity_register.xml
│   │   │   └── activity_dashboard.xml
│   │   ├── values/
│   │   │   ├── strings.xml
│   │   │   ├── colors.xml
│   │   │   └── themes.xml
│   │   └── xml/
│   │       ├── backup_rules.xml
│   │       └── data_extraction_rules.xml
│   └── AndroidManifest.xml
└── build.gradle
```

## Setup Instructions

### Prerequisites

1. **Android Studio** (Hedgehog 2023.1.1 or later)
2. **JDK 8 or higher**
3. **Android SDK** with SDK 34 installed
4. **Backend server** running on `http://localhost:8080`

### Installation Steps

#### 1. Open the Project in Android Studio

1. Launch Android Studio
2. Click **File > Open**
3. Navigate to the `mobile` folder in your project
4. Select the `mobile` folder and click **OK**
5. Wait for Gradle sync to complete (this may take a few minutes)

#### 2. Configure Backend URL

The app is configured to connect to the backend at:
- **Emulator**: `http://10.0.2.2:8080` (default)
- **Physical Device**: Change to your computer's IP address

To change the backend URL:

1. Open `RetrofitClient.kt` located at:
   ```
   app/src/main/java/com/auth/miniapp/api/RetrofitClient.kt
   ```

2. Modify the `BASE_URL` constant:
   ```kotlin
   // For Android Emulator (accesses localhost on host machine)
   private const val BASE_URL = "http://10.0.2.2:8080/"
   
   // For Physical Device (replace with your computer's IP)
   // private const val BASE_URL = "http://192.168.1.100:8080/"
   ```

#### 3. Find Your Computer's IP Address (for Physical Devices)

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" address under your active network interface
```

#### 4. Ensure Backend is Running

Make sure your Spring Boot backend is running:
```bash
cd backend
./mvnw spring-boot:run
```

The backend should be accessible at `http://localhost:8080`

#### 5. Build and Run the App

##### Option A: Using Android Emulator

1. In Android Studio, click **Tools > Device Manager**
2. Create a new virtual device or select an existing one
3. Click the **Run** button (green play icon) or press `Shift + F10`
4. Select your emulator from the list
5. Wait for the app to build and launch

##### Option B: Using Physical Device

1. Enable **Developer Options** on your Android device:
   - Go to **Settings > About Phone**
   - Tap **Build Number** 7 times
   
2. Enable **USB Debugging**:
   - Go to **Settings > Developer Options**
   - Enable **USB Debugging**
   
3. Connect your device via USB
4. Click the **Run** button in Android Studio
5. Select your physical device from the list

### Troubleshooting

#### Connection Issues

**Problem**: App can't connect to backend

**Solutions**:
1. Verify backend is running on port 8080
2. Check `BASE_URL` in `RetrofitClient.kt`
3. For physical devices, ensure phone and computer are on the same Wi-Fi network
4. Check Android firewall/antivirus settings
5. Verify backend allows CORS (already configured with `@CrossOrigin`)

#### Build Errors

**Problem**: Gradle sync fails

**Solutions**:
1. Click **File > Invalidate Caches > Invalidate and Restart**
2. Update Android Gradle Plugin: **File > Project Structure > Project**
3. Ensure you have a stable internet connection for downloading dependencies
4. Check Android SDK is properly installed

#### Emulator Issues

**Problem**: Emulator is slow or doesn't start

**Solutions**:
1. Allocate more RAM to the emulator
2. Enable Hardware Acceleration (Intel HAXM for Intel processors, Hyper-V for Windows)
3. Use a lower API level device (API 30 or lower)

## API Endpoints Used

The app connects to these backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/me` - Get current user info (requires JWT token)

## Key Features Explained

### Authentication Flow

1. **Login**: User enters credentials → App sends request to backend → Receives JWT token → Token stored in SharedPreferences
2. **Auto-login**: App checks for stored token on launch → If exists, navigates to Dashboard
3. **Logout**: Clears all stored tokens and user data → Returns to Login screen

### Token Management

Tokens are managed using `TokenManager` class:
- Stores JWT token in SharedPreferences
- Provides token with "Bearer" prefix for API calls
- Handles user session data

### API Communication

Uses Retrofit with:
- Gson converter for JSON serialization
- OkHttp logging interceptor for debugging
- Kotlin Coroutines for asynchronous operations

## Testing the App

1. **Register a new user**:
   - Launch app
   - Click "Register" link
   - Fill in username, email, and password
   - Click Register button

2. **Login**:
   - Enter registered username and password
   - Click Login button

3. **View Dashboard**:
   - After login, you'll see user information
   - User ID, username, and email are displayed

4. **Logout**:
   - Click Logout button
   - Returns to Login screen

## Notes

- The app uses `android:usesCleartextTraffic="true"` to allow HTTP connections (for development)
- For production, use HTTPS and remove the cleartext traffic permission
- ViewBinding is enabled for type-safe view access
- Material Design 3 components are used for modern UI

## Dependencies

```gradle
// Core Android
androidx.core:core-ktx:1.12.0
androidx.appcompat:appcompat:1.6.1
com.google.android.material:material:1.11.0
androidx.constraintlayout:constraintlayout:2.1.4

// Lifecycle & Coroutines
androidx.lifecycle:lifecycle-runtime-ktx:2.7.0
kotlinx.coroutines:kotlinx-coroutines-android:1.7.3

// Networking
com.squareup.retrofit2:retrofit:2.9.0
com.squareup.retrofit2:converter-gson:2.9.0
com.squareup.okhttp3:logging-interceptor:4.12.0
com.google.code.gson:gson:2.10.1
```

## License

This project is for educational purposes.
