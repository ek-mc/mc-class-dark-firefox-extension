## [Unreleased]

## [0.1.9] - 2026-03-15
### Fixed
- Fixed manifest version placeholder issue; set explicit extension version to 0.1.9.

## [0.1.8] - 2026-03-15
### Fixed
- Improved notification detail readability by overriding hardcoded low-contrast gray (`#515050`) text in dark mode.
- Added targeted readability override for `ViewNotificationDescr` and nested notification content.

## [0.1.7] - 2026-03-07

### Fixed
- Improved login text readability on dark blue backgrounds by forcing light text color for login-text selectors.

## [0.1.7] - 2026-03-04

### Added
- Documented GitHub Actions workflows in README.

# Changelog

## [Unreleased]

## [0.1.6] - 2026-03-03
- Raised Firefox desktop minimum version to `140.0` for compatibility with `data_collection_permissions`.
- Added `browser_specific_settings.gecko_android.strict_min_version: 142.0` to align Android support with data consent requirements.
- Bumped extension version to `0.1.6`.

## [0.1.5] - 2026-03-03
- Renamed add-on display name to avoid restricted trademarks in AMO validation.
- `name`: `MC-Class Dark Theme (Firefox)` → `MC-Class Dark Theme (Gecko)`.
- Bumped extension version to `0.1.5`.

## [0.1.4] - 2026-03-03
- Added `browser_specific_settings.gecko.data_collection_permissions` to satisfy AMO requirement.
- Set data collection declaration to `required: ["none"]` and `optional: []`.
- Bumped extension version to `0.1.4`.

## [0.1.3] - 2026-03-03
- Added `LICENSE` file with MIT license.
- Bumped extension version to `0.1.3`.

## [0.1.2] - 2026-03-03
- Replaced external placeholder URL with inline SVG data URI (no third-party dependency).
- Added local `assets/placeholder.svg` reference asset.
- Bumped extension version to `0.1.2`.

## [0.1.1] - 2026-03-03
- Initial Firefox extension build synced with latest Tampermonkey/Chrome versions.
- Added full dark style coverage for mc-class.gr components.
- Added image placeholder patching for `NoPhoto.jpg` assets.
- Added Gecko metadata in manifest.
