# Changelog

## [0.1.30] - 2026-05-08

### Changed
- Updated accordion body hover text color for clearer interactive feedback:
  - `.AccordionCard-body:hover` now uses `rgb(68, 147, 248)`.

## [0.1.29] - 2026-05-08

### Changed
- Updated heading and notification readability in dark mode:
  - `h3` now uses `var(--mc-text)`.
  - `.ViewNotificationTitle h3` now uses `var(--mc-text)`.
  - `.ViewNotificationAvatar` background now uses `var(--mc-bg)`.

## [0.1.28] - 2026-05-08

### Fixed
- Hardened lesson view preference switching on MC-Class icon-based toggles (`LessonView`).
- View change now sets hidden field (`txtHiddenLessonView`) and triggers `__doPostBack(...)` directly.
- Added short retry loop to handle delayed page readiness before applying preference.

### Behavior
- First-time default remains list view.
- Manual choice (grid/list) is still remembered and respected.

## [0.1.27] - 2026-05-08

### Fixed
- Corrected persisted grid/list view behavior when session flags already exist.
- View switching now always applies when current view mismatches saved preference.
- Improved compatibility with `LessonView` icon-based toggles and hidden field state (`txtHiddenLessonView`).

### Behavior
- Default for first-time users remains list view.
- Manual choice (grid/list) is remembered and respected on next visits.

## [0.1.26] - 2026-05-08

### Added
- Persisted lesson view preference (grid/list) on homepage interactions.
- First-time default is list view; manual user selection is remembered for future visits.

### Changed
- Updated homepage view handling logic to respect stored user preference instead of forcing list every load.

## [0.1.25] - 2026-05-08

### Changed
- UI readability refinements in lesson cards:
  - `.card` background set to `var(--mc-bg)`.
  - `.LessonBoxTitle` color set to `var(--mc-text)`.
  - `.BoxRoomCode` and `.BoxDurationTime` colors set to `var(--mc-text)`.

## [0.1.24] - 2026-05-08

### Changed
- Theme balance adjustments:
  - Restored `--mc-surface` to `#161a22` (undo previous same-as-bg setting).
  - Set `.main` background to `var(--mc-bg)` for a deeper page canvas while keeping surface contrast.
  - Header continues to use `var(--mc-panel)` from prior update.

## [0.1.23] - 2026-05-08

### Changed
- Refined dark-theme palette and lesson metadata readability:
  - `--mc-panel` updated to `#0B1220`.
  - `.StartsInCert` background updated to `#4C51BF`.
  - `label.BoxTeacher`, `.BoxDates.SameDay`, `.BoxRoomTitle`, `.BoxDurationTitle` now use `var(--mc-text)`.

## [0.1.22] - 2026-05-07

### Changed
- Updated notification visuals and global dark-theme text tone:
  - `--mc-text` set to `#f0f6fc` for improved readability.
  - `.NotificationAvatar.avatar` background set to `var(--mc-bg)`.
  - `.NotificationTitle` color set to `#f0f6fc`.

## [0.1.21] - 2026-05-07

### Changed
- Updated status/survey color alignment for improved dark-mode consistency:
  - `.badge-danger` background set to `#55607A`.
  - `.SectorContainer` background set to `var(--mc-bg)`.
  - `.SurveyNb` background set to `var(--mc-bg)`.
  - `.StartsInCert` background set to `#2C7A7B`.

## [0.1.20] - 2026-05-07

### Changed
- Updated in-progress visual style for better dark-mode consistency:
  - `.InProgress` background set to `#55607A` (replacing bright red tone).
  - `.LessonBoxFooterIconInProgress i` color set to `#55607A`.

## [0.1.19] - 2026-05-07

### Changed
- Applied panel dark background to sidebar for UI consistency:
  - `.sidebar` now uses `var(--mc-panel)`.

## [0.1.18] - 2026-05-07

### Changed
- Updated Help Desk toggle background for better visual integration in dark mode:
  - `.help_desk_toggle` now uses `var(--mc-panel)` instead of `var(--mc-bg)`.

## [0.1.17] - 2026-05-07

### Fixed
- Darkened Help Desk toggle area for better dark-mode consistency:
  - `.help_desk_toggle` now uses `var(--mc-bg)`.

## [0.1.16] - 2026-05-07

### Fixed
- Updated survey header info area to use body-dark background for consistent contrast:
  - `.MainSurveyHeader.fixed .SurveyHeaderInfo` now uses `var(--mc-bg)`.
- Updated Likert question row backgrounds to dark body tone:
  - `.questionItemLikert:nth-child(2n+1)` and `.questionItemLikert:nth-child(2n)` now use `var(--mc-bg)`.

## [0.1.15] - 2026-04-02

### Fixed
- Extended survey dark-theme styling to `.SurveyNb`:
  - dark panel background
  - readable light text color

## [0.1.14] - 2026-04-02

### Fixed
- Improved survey readability in dark mode:
  - `.SectorContainer` now uses the dark panel background instead of white
  - `.SurveyEkfwnisiText` now uses readable light text
  - `.MainSurveyHeader.fixed .SurveyHeaderInfo` now stays readable in dark mode

## [0.1.13] - 2026-03-25

### Fixed
- `SliderClose` border now matches panel background (`var(--mc-panel)`) for cleaner dark UI.

## [0.1.12] - 2026-03-21

### Fixed
- Completed-state icon styling now applies consistently across:
  - `.LessonBoxFooterIconCompleted`
  - `.Completed .LessonBoxFooterIconCompleted`
  - `.BoxStatus.Completed`
  - `.AssetIconCompleted`
- Switched completed icon color to muted blue `#526d82` for better dark-theme contrast.

# Changelog

## [0.1.11] - 2026-03-21

### Changed
- Completed lesson icons are now outline-only (no filled background) for:
  - `.UnitAssets .AssetIconCompleted`
  - `.Completed .LessonBoxFooterIconCompleted`
- Updated completed icon color to `rgb(2, 133, 255)` for icon glyphs.

## [0.1.10] - 2026-03-15

### Fixed
- Improved readability for news/notification text areas (`NewsBoxDescr`, `ViewNewDescr`, `ViewNewTitle`, `NewsBoxTitle`).
- Added dark-theme-safe override for legacy bright green backgrounds (`#7cb742` -> blue-green accent).

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

## 2026-04-29

- Added basic GitHub Actions CI workflow (`.github/workflows/basic-ci.yml`).
- Maintenance: closed stale dependency PR queue for cleaner triage (where applicable).
