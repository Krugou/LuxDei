while ($true) {
    git pull
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Git pull successful"
    }
    else {
        Write-Host "Git pull failed"
    }
    $randomSeconds = Get-Random -Minimum 20 -Maximum 200
    Write-Host "Next pull in $randomSeconds seconds"
    Start-Sleep -Seconds $randomSeconds
}