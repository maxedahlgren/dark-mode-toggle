let isDark;

function updateState() {
  isDark = browser.browserSettings.overrideContentColorScheme
    .get({})
    .then((res) => {
      isDark = res.value == 'dark';
      browser.browserAction.setIcon({
        path: isDark ? "icons/moon.svg" : "icons/sun.svg"
      });
    });
}

function toggleDarkMode() {
  browser.browserSettings.overrideContentColorScheme
    .set({ value: isDark ? 'light' : 'dark' })
    .then(() => { updateState(); });
}

browser.browserAction.onClicked.addListener(toggleDarkMode);

// update when the extension loads initially
updateState();
