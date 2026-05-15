const { execSync } = require('child_process');

const files = [
  'WhatsApp_Image_2026-05-01_at_16.24.34_upscayl_4x_upscayl-stand_1778870855059.png',
  'WhatsApp_Image_2026-05-01_at_16.24.37_(2)_upscayl_4x_upscayl-s_1778870896417.png',
  'WhatsApp_Image_2026-05-01_at_16.24.46_upscayl_4x_upscayl-stand_1778870896417.png'
];

for (const file of files) {
  const inPath = `/Users/aaradh.kh/Documents/Projects/Panevo/attached_assets/${file}`;
  const outPath = inPath.replace('.png', '_opt.webp');
  console.log(`Converting ${file}...`);
  execSync(`npx -y sharp-cli@3 -i "${inPath}" -o "${outPath}" resize 800`);
  console.log(`Done converting ${file}`);
}
