/*global chrome */
var errorText = document.createElement('div');
document.body.appendChild(errorText);
window.onerror = function (msg, file, line, column, error) {
  errorText.innerHTML = error.stack;
};

var defaultDomains = [
  '*://github.com/*',
  '*://*.atlassian.net/rest/*',
  '*://docs.google.com/*'
];
var defaultInstancUrl = 'https://origamilogic.atlassian.net/';

function save_options() {
  var instanceUrl = document.getElementById('instanceUrl').value;
  var domains = document.getElementById('domains').value;

  chrome.storage.sync.set({
    instanceUrl: instanceUrl,
    domains: domains.split(',').map(x => x.trim())
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    instanceUrl: defaultInstancUrl,
    domains: defaultDomains
  }, function (conf) {
    document.getElementById('instanceUrl').value = conf.instanceUrl;
    document.getElementById('domains').value = conf.domains.join(',\n');
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
