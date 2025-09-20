document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const versionSpan = document.getElementById('latestVersion');
    const version = '1.1.0';
    const downloadUrl = 'https://github.com/sh3hz/myfarm/releases/download/1.0.1/MyFarm-1.1.0-setup.exe';

    // Set the version on page load
    versionSpan.textContent = `v${version}`;
    downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download v${version}`;

    // Handle download button click
    downloadBtn.addEventListener('click', function() {
        // Open the download link in a new tab
        window.open(downloadUrl, '_blank');
    });
});
