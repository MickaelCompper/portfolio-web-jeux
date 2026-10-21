from pathlib import Path
import hashlib, json, zipfile, datetime

root = Path(__file__).resolve().parents[3]
app = root / 'work' / 'belle-rive-lot1'
archive = root / 'archives' / 'BELLE_RIVE_LOT1_V1.zip'
manifest_path = root / 'outputs' / 'BELLE_RIVE_LOT1_MANIFESTE_V1.json'
if archive.exists() or manifest_path.exists():
    raise RuntimeError('Destination existante, choisir une nouvelle version ; aucun écrasement.')
excluded = {'node_modules', 'tools', '.runtime', 'clean', 'clean-folder', '__pycache__'}
files = [root / 'README.md']
for directory in [root / 'docs', root / 'outputs', root / 'work']:
    for path in directory.rglob('*'):
        if path.is_file() and not any(part in excluded for part in path.relative_to(root).parts):
            files.append(path)
records = []
for path in sorted(set(files)):
    data = path.read_bytes()
    records.append({'path': path.relative_to(root).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
manifest_path.write_text(json.dumps({'date': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'version': '0.1.0', 'files': records, 'excluded': sorted(excluded), 'limits': 'Source/evidence snapshot. No acceptance or quality inferred; dependency caches and duplicated clean installations remain locally, identified separately.'}, ensure_ascii=False, indent=2), encoding='utf-8')
with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for item in records:
        z.write(root / item['path'], item['path'])
    z.write(manifest_path, manifest_path.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for item in records:
        assert hashlib.sha256(z.read(item['path'])).hexdigest() == item['sha256']
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix('.zip.sha256').write_text(digest + '  ' + archive.name + '\n', encoding='ascii')
print(json.dumps({'archive': str(archive), 'files': len(records), 'bytes': archive.stat().st_size, 'sha256': digest, 'zip_integrity_and_all_file_hashes': 'verified'}, indent=2))
