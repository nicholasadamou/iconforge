const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch Font Awesome icons metadata from their CDN
const FONT_AWESOME_VERSION = '6.5.2';
const ICONS_URL = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json`;

console.log('Fetching Font Awesome icons metadata...');

https.get(ICONS_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const iconsJson = JSON.parse(data);
      const result = [];

      Object.entries(iconsJson).forEach(([iconName, iconData]) => {
        // Skip the Font Awesome logo
        if (iconName === 'font-awesome-logo-full') return;

        // Get the first style (prefer solid, then regular, then brands)
        const styles = iconData.styles || [];
        const preferredStyle = styles.includes('solid') ? 'solid' 
          : styles.includes('regular') ? 'regular'
          : styles[0];

        if (!preferredStyle) return;

        // Convert unicode string to character
        const unicode = String.fromCharCode(parseInt(iconData.unicode, 16));
        
        // Map style to Font Awesome class prefix
        const styleMap = {
          'solid': 'fas',
          'regular': 'far',
          'brands': 'fab',
          'light': 'fal',
          'duotone': 'fad',
          'thin': 'fat'
        };

        const icon = {
          id: iconName,
          unicode: unicode,
          label: iconData.label || iconName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          styles: styles,
          search: iconData.search?.terms || []
        };

        result.push(icon);
      });

      // Sort by id for consistency
      result.sort((a, b) => a.id.localeCompare(b.id));

      // Generate TypeScript file
      const tsContent = `import { Icon } from '@/types/icon';

// Auto-generated from Font Awesome ${FONT_AWESOME_VERSION}
// Total icons: ${result.length}
export const icons: Icon[] = ${JSON.stringify(result, null, 2)};

export const defaultIcon = icons.find(i => i.id === 'heart') || icons[0];
`;

      const outputPath = path.join(__dirname, '../lib/icons.ts');
      fs.writeFileSync(outputPath, tsContent);
      
      console.log(`✅ Generated ${result.length} icons successfully!`);
      console.log(`📄 Output: ${outputPath}`);
    } catch (error) {
      console.error('Error parsing icons:', error);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching icons:', err);
});
