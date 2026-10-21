param([string]$Database = 'data/demo.sqlite')
$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    $runtime = Join-Path $PSScriptRoot 'tools/node-v24.22.1-win-x64/node.exe'
    & $runtime node_modules/typescript/bin/tsc --project tsconfig.build.json
    if ($LASTEXITCODE -ne 0) { throw 'Compilation échouée : lancement refusé.' }
    & $runtime dist/server.js $Database
    if ($LASTEXITCODE -ne 0) { throw 'Lancement ou exécution interrompu : consulter le diagnostic.' }
} finally { Pop-Location }
