async function getLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/sh3hz/myfarm/releases/latest');
        if (!response.ok) {
            throw new Error('Failed to fetch latest release');
        }
        const data = await response.json();
        return {
            version: data.tag_name.replace('v', ''), // Remove 'v' prefix if present
            downloadUrl: data.assets[0]?.browser_download_url || `https://github.com/sh3hz/myfarm/releases/latest`
        };
    } catch (error) {
        console.error('Error fetching latest release:', error);
        // Fallback to default values if API call fails
        return {
            version: '1.1.0',
            downloadUrl: 'https://github.com/sh3hz/myfarm/releases/latest'
        };
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking for updates...';
    downloadBtn.disabled = true;
    
    try {
        const release = await getLatestRelease();
        
        // Update the download button with the latest version
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download v${release.version}`;
        downloadBtn.disabled = false;
        
        // Handle download button click
        downloadBtn.addEventListener('click', function() {
            // Open the download link in a new tab
            window.open(release.downloadUrl, '_blank');
        });
    } catch (error) {
        console.error('Error:', error);
        downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to check updates';
        // Keep the button clickable to go to releases page as fallback
        downloadBtn.disabled = false;
        downloadBtn.addEventListener('click', function() {
            window.open('https://github.com/sh3hz/myfarm/releases/latest', '_blank');
        });
    }
});
