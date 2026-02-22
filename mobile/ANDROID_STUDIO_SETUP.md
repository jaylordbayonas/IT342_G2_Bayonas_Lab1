# Android Studio Setup - Quick Start Guide

## Step-by-Step Guide for Opening the Project

### 1. Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android Studio Hedgehog (2023.1.1) or later
- During installation, ensure Android SDK is installed

### 2. Open the Project
1. Launch Android Studio
2. On the welcome screen, click **"Open"**
3. Navigate to: `IT342_G2_Bayonas_Lab1\mobile\`
4. Click **"OK"**

### 3. Wait for Gradle Sync
- Android Studio will automatically sync Gradle
- This downloads all dependencies (may take 5-10 minutes on first run)
- Progress is shown in the bottom status bar
- Wait until you see "Gradle sync finished" or "BUILD SUCCESSFUL"

### 4. Configure Backend Connection

**For Android Emulator (Recommended for testing):**
- No changes needed! The app is already configured to use `http://10.0.2.2:8080`
- This IP address allows the emulator to access `localhost` on your computer

**For Physical Android Device:**
1. Find your computer's IP address:
   - Windows: Open Command Prompt → type `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Edit the backend URL:
   - Open: `app/src/main/java/com/auth/miniapp/api/RetrofitClient.kt`
   - Change line 14:
     ```kotlin
     private const val BASE_URL = "http://YOUR_IP_ADDRESS:8080/"
     ```
   - Example: `private const val BASE_URL = "http://192.168.1.100:8080/"`

3. Ensure your phone and computer are on the same Wi-Fi network

### 5. Start the Backend Server
Before running the app, make sure your backend is running:

```bash
# Navigate to backend directory
cd backend

# Run the Spring Boot application
./mvnw spring-boot:run
# OR on Windows:
mvnw.cmd spring-boot:run
```

Verify backend is running by visiting: http://localhost:8080

### 6. Create/Select Virtual Device (Emulator)

**Option A: Create a New Emulator**
1. Click the **Device Manager** icon (phone icon) in the toolbar
2. Click **"Create Device"**
3. Select a device (recommend: Pixel 5)
4. Click **"Next"**
5. Select System Image: **API 34** (Android 14) - Download if needed
6. Click **"Next"** then **"Finish"**

**Option B: Use Physical Device**
1. Enable Developer Mode on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"
3. Connect phone via USB
4. Allow USB debugging when prompted on phone

### 7. Run the Application

1. Click the **Run** button (green play ▶ icon) at the top
   - OR press `Shift + F10`
2. Select your device/emulator from the dropdown
3. Wait for the build to complete
4. App will launch automatically

### 8. Test the Application

**Register a New User:**
1. Click "Register" on the login screen
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "REGISTER"
4. You'll be redirected to login

**Login:**
1. Enter username: `testuser`
2. Enter password: `password123`
3. Click "LOGIN"
4. You'll see the Dashboard with your user info

## Common Issues and Solutions

### Issue 1: "Gradle sync failed"
**Solution:**
1. Click **File → Invalidate Caches**
2. Select "Invalidate and Restart"
3. Wait for Android Studio to restart and re-sync

### Issue 2: "SDK location not found"
**Solution:**
1. Click **File → Project Structure**
2. Under "SDK Location", set Android SDK location
3. Default location:
   - Windows: `C:\Users\YourName\AppData\Local\Android\Sdk`
   - Mac: `~/Library/Android/sdk`

### Issue 3: "Failed to connect to localhost:8080"
**Solutions:**
- Verify backend is running on port 8080
- Check RetrofitClient.kt has correct BASE_URL
- For emulator, use `http://10.0.2.2:8080`
- For physical device, use your computer's IP address
- Ensure phone and computer are on same Wi-Fi network

### Issue 4: Emulator won't start
**Solutions:**
1. Enable Hardware Acceleration:
   - **Tools → SDK Manager → SDK Tools**
   - Install "Intel x86 Emulator Accelerator (HAXM)" for Intel CPUs
   - OR enable Hyper-V for AMD CPUs on Windows
2. Create a new emulator with lower API level (API 30)
3. Close other applications to free up RAM

### Issue 5: Build errors
**Solution:**
1. Clean project: **Build → Clean Project**
2. Rebuild: **Build → Rebuild Project**
3. Check you have internet connection (for downloading dependencies)

### Issue 6: "App crashes on startup"
**Checklist:**
- Backend must be running BEFORE launching the app
- Check Logcat in Android Studio for error messages
- Verify BASE_URL in RetrofitClient.kt is correct

## Viewing Logs

To see app logs and debug information:
1. Open **Logcat** tab at the bottom of Android Studio
2. Filter by package name: `com.auth.miniapp`
3. Look for errors (shown in red)

## Project Structure in Android Studio

```
mobile/
├── app/
│   ├── manifests/
│   │   └── AndroidManifest.xml
│   ├── java/com.auth.miniapp/
│   │   ├── activities/
│   │   ├── api/
│   │   ├── models/
│   │   └── utils/
│   └── res/
│       ├── layout/
│       ├── values/
│       └── xml/
└── Gradle Scripts/
    ├── build.gradle (Project)
    └── build.gradle (Module: app)
```

## Keyboard Shortcuts

- **Run App**: `Shift + F10`
- **Stop App**: `Ctrl + F2`
- **Build Project**: `Ctrl + F9`
- **Format Code**: `Ctrl + Alt + L`
- **Find File**: `Ctrl + Shift + N`

## Next Steps

After successfully running the app:
1. Explore the code structure
2. Make changes to UI in XML files (hot reloading supported)
3. Modify Kotlin code and rebuild
4. Test different scenarios (invalid login, registration errors, etc.)

## Need Help?

- Check Android Studio's Build output window for errors
- View Logcat for runtime issues
- Ensure backend server is running and accessible
- Verify network connectivity between device and backend

---

**Ready to build?** Click the Run button! 🚀
