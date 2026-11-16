[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][ValidateNotNullOrEmpty()][string]$ProjectId,
  [Parameter(Mandatory = $true)][ValidateNotNullOrEmpty()][string]$HostingSiteId,
  [ValidateSet('Preview','Production')][string]$Mode = 'Preview',
  [string]$PreviewChannel = 'afromed-development-review'
)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here
if ($HostingSiteId -eq 'business-lift-3c19c' -or $HostingSiteId -eq 'afromed-life') {
  throw 'Refusing to deploy Afromed Development to a known unrelated Hosting site.'
}
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
  throw 'Firebase CLI not found. Install it using npm install -g firebase-tools and login via firebase login.'
}
Write-Host "Firebase Project: $ProjectId"
Write-Host "Dedicated Hosting Site: $HostingSiteId"
Write-Host "Mode: $Mode"
$answer = Read-Host "Confirm this is the separate Afromed Development Hosting site (type YES)"
if ($answer -cne 'YES') { throw 'Deployment cancelled by operator.' }
firebase target:apply hosting development $HostingSiteId --project $ProjectId
if ($LASTEXITCODE -ne 0) { throw 'Unable to map the Hosting target.' }
if ($Mode -eq 'Preview') {
  firebase hosting:channel:deploy $PreviewChannel --only hosting:development --project $ProjectId
} else {
  firebase deploy --only hosting:development --project $ProjectId
}
if ($LASTEXITCODE -ne 0) { throw 'Firebase deployment failed. No success claim should be made.' }
Write-Host 'Deployment command completed. Verify the Hosting URL and custom domain in the Firebase console.'
