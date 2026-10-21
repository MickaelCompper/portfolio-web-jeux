param([string]$Database = 'data/demo.sqlite', [ValidatePattern('^S[0-9]$')][string]$Scenario = 'S0')
$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    $runtime = Join-Path $PSScriptRoot 'tools/node-v24.22.1-win-x64/node.exe'
    & $runtime node_modules/typescript/bin/tsc --project tsconfig.build.json
    if ($LASTEXITCODE -ne 0) { throw 'Compilation échouée : initialisation refusée.' }
    & $runtime dist/cli.js init $Database $Scenario
    if ($LASTEXITCODE -ne 0) { throw 'Initialisation refusée ; aucun écrasement autorisé.' }
} finally { Pop-Location }
