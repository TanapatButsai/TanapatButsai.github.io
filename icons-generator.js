// This is a Node.js script to help you generate icons
// You can run this with Node.js if you have a source image
// Install sharp first: npm install sharp

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, "icons")
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir)
}

// Source image path - update this to your profile image path
const sourceImage = path.join(__dirname, "images", "Thanapat_picture.jpeg")

// Icon sizes to generate
const sizes = [192, 512]

// Generate icons
async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`))

      console.log(`Generated icon-${size}x${size}.png`)
    }
    console.log("All icons generated successfully!")
  } catch (error) {
    console.error("Error generating icons:", error)
  }
}

generateIcons()
