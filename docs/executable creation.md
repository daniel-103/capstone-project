# Building the Executable File

This part in "package.json" is the brain behind the building the executable file. The output is where the file and other configurations are stored at. If you don't specify the path, it will make the directory in the current path you're in. It also has the option to be made in different operating systems.

```json
{
  "build": {
    "appId": "com.example.craftworld",
    "productName": "CraftWorld",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "package.json",
      "src/**/*"
    ],
    "win": {
      "target": "portable"
    },
    "mac": {
      "target": "dmg"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```


### Run the Build Script

1. Open a terminal (Command Prompt, PowerShell, or Terminal on macOS/Linux) and navigate to your project directory.

2. Run the build script:
   ```bash
   npm run dist
   ```

   This will package your application and place the output in the directory you specified.

   The application will be built as a **portable** executable for Windows, a **DMG** file for macOS, and an **AppImage** for Linux.

### Locate the Executable

After the build process completes, you should see the packaged application.

- For Windows, it will be a **.exe** file.
- For macOS, it will be a **.dmg** file.
- For Linux, it will be an **AppImage**.

To create Desktop shortcut of the application, copy and paste the file in your Desktop directory