# MC-Class Dark Theme (Gecko Extension)

![Version](https://img.shields.io/badge/version-0.1.13-2563eb)
![Platform](https://img.shields.io/badge/platform-Firefox-1f2937)

Firefox/Gecko extension version of the `mc-class.gr` dark theme.

![MC-Class Dark Theme preview](assets/screenshots/preview.jpg)

## Install

### Recommended
Mozilla Add-ons (AMO):
- https://addons.mozilla.org/en-US/firefox/addon/mc-class-dark-theme/

### Local development / temporary install
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select the `manifest.json` in this folder

### Build package (.xpi)
- Zip the folder contents and rename `.zip` to `.xpi`, or upload to AMO for signed distribution.

## Features
- Dark theme styles aligned with the Chrome and Tampermonkey versions
- Component-specific readability improvements
- Replaces `NoPhoto.jpg` placeholders with a dark preview image

## Files
- `manifest.json`
- `dark.css`
- `content.js`

## License
See [LICENSE](LICENSE).

## Changelog
See [CHANGELOG.md](CHANGELOG.md).

## Support
For issues, use [GitHub Issues](https://github.com/ek-mc/mc-class-dark-firefox-extension/issues).

## Automation
This repository uses GitHub Actions workflows:
- `ci.yml`
