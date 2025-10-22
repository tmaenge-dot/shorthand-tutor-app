# Sharing the Shorthand Tutor App with Your Learners

## Quick Share for Tomorrow's Class

### Option 1: Local Network Sharing (Recommended for Classroom)

1. **Stop the current server** (if running) with `Ctrl+C`

2. **Start the network-accessible server:**
   ```bash
   npm run dev:network
   ```

3. **Find your computer's IP address:**
   - **On Linux:** `ip addr show | grep inet`
   - **On Windows:** `ipconfig`
   - **On Mac:** `ifconfig | grep inet`
   
   Look for something like `192.168.1.XXX` or `10.0.0.XXX`

4. **Share with learners:**
   - Give them your IP address and port: `http://YOUR_IP_ADDRESS:3001`
   - Example: `http://192.168.1.100:3001`

5. **Learners connect:**
   - Same WiFi network required
   - Open browser and go to the provided address

### Option 2: Production Build for Stable Sharing

1. **Build and preview:**
   ```bash
   npm run share
   ```

2. **Share the address:**
   - Usually `http://YOUR_IP_ADDRESS:4173`
   - More stable for longer sessions

## Network Requirements

- **All devices must be on the same WiFi network**
- **Firewall:** May need to allow port 3001 and 4173
- **Router:** Should allow device-to-device communication

## Troubleshooting

### If learners can't connect:

1. **Check firewall settings:**
   ```bash
   # On Ubuntu/Linux:
   sudo ufw allow 3001
   sudo ufw allow 4173
   ```

2. **Verify IP address is correct**

3. **Try different port:**
   - Edit vite.config.js and change port number
   - Restart server

4. **Test connection:**
   - Try accessing from another device first
   - Check if both devices are on same network

## Alternative: Simple File Sharing

If network sharing doesn't work:

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Share the `dist` folder:**
   - Copy to USB drive
   - Share via cloud storage
   - Learners can open `dist/index.html` in browser

## Features Available to Learners

✅ **Practice Modules A-U** - All 20 modules with authentic NCS content
✅ **Speed Development** - Timed exercises with WPM tracking  
✅ **Dictation Practice** - Audio playback with word highlighting
✅ **Assessment Tools** - Theory checks and progress tracking
✅ **Progress Tracking** - Individual student progress
✅ **Mobile Friendly** - Works on phones and tablets

## Usage Instructions for Learners

1. **Navigate to Speed Development** from the sidebar
2. **Select their current module** (A-U)
3. **Choose practice mode:**
   - Speed Exercises for typing practice
   - Dictation Practice for audio exercises
4. **Start with basic level** and progress through difficulties
5. **Track progress** in the Progress section

## Data Storage

- **Local Storage** - Progress saved in browser
- **No internet required** once loaded
- **Private** - Each student's progress is individual

## Technical Specs

- **Responsive Design** - Works on all screen sizes
- **Progressive Web App** - Can be "installed" on devices
- **Offline Capable** - Works without internet after initial load
- **Cross-Browser** - Chrome, Firefox, Safari, Edge compatible

---

**Happy Teaching! 📚✏️**

*For technical issues, check the console (F12) or contact the developer.*