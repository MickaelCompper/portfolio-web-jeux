from pathlib import Path
import os, json, hashlib, zipfile, datetime

root = Path(__file__).resolve().parents[3]
app = root / 'work' / 'belle-rive-lot1'
excluded = {'node_modules', 'tools', '.runtime', '.git', '__pycache__', 'clean', 'clean-folder', 'original', 'stages', 'bundle'}
archive = root / 'archives' / 'BELLE_RIVE_REPRISE_V2.zip'
manifest = root / 'outputs' / 'BELLE_RIVE_REPRISE_MANIFESTE_V2.json'
stage_list = root / 'outputs' / 'BELLE_RIVE_REPRISE_GIT_PATHS_V2.txt'
for path in (archive, manifest, stage_list):
    if path.exists():
        raise RuntimeError(f'Destination exists; preserve it and select another version: {path}')
files = [root / 'README.md', root / 'docs' / 'BELLE_RIVE_REPRISE_CORRECTION_V2.md', root / 'docs' / 'BELLE_RIVE_LOT1_BILAN_V1.md']
for current, dirs, names in os.walk(app):
    dirs[:] = [d for d in dirs if d not in excluded]
    files.extend(Path(current) / name for name in names if name != '.DS_Store')
entries = []
for path in sorted(set(files)):
    data = path.read_bytes()
    entries.append({'path': path.relative_to(root).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
manifest.write_text(json.dumps({'date': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'version': '0.1.1', 'budgetMs': 5000, 'entries': entries, 'excludedDuplications': sorted(excluded), 'scope': 'Local source/build/evidence archive; dependencies/runtime remain in the workspace, exact lock and SRI retained. Historical V1 archive not overwritten. No acceptance inferred.'}, ensure_ascii=False, indent=2), encoding='utf-8')
with zipfile.ZipFile(archive, 'x', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for item in entries:
        z.write(root / item['path'], item['path'])
    z.write(manifest, manifest.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for item in entries:
        assert hashlib.sha256(z.read(item['path'])).hexdigest() == item['sha256']
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix('.zip.sha256').write_text(digest + '  ' + archive.name + '\n', encoding='ascii')
# Explicit staging list: excludes ignored local DBs/builds and all duplicate installations.
paths = [item['path'] for item in entries if '/dist/' not in item['path'] and not item['path'].endswith(('.sqlite', '.running')) and '.sqlite.' not in item['path'] and '.sqlite-' not in item['path']]
paths.extend(p.relative_to(root).as_posix() for p in (manifest, archive, archive.with_suffix('.zip.sha256')))
stage_list.write_text('\n'.join(paths) + '\n', encoding='utf-8')
print(json.dumps({'archive': str(archive), 'entries': len(entries), 'bytes': archive.stat().st_size, 'sha256': digest, 'integrity': 'zip and every file verified'}, indent=2))
