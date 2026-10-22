from pathlib import Path
import os,json,hashlib,zipfile,datetime,re

root=Path(__file__).resolve().parents[3]
app=root/'work/belle-rive-lot1'
archive=root/'archives/BELLE_RIVE_RECETTE_CONSOLIDEE_V5.zip'
manifest=root/'outputs/BELLE_RIVE_RECETTE_MANIFESTE_V5.json'
staging=root/'outputs/BELLE_RIVE_RECETTE_GIT_PATHS_V5.txt'
for p in (archive,manifest,staging):
    if p.exists(): raise RuntimeError('Preserve existing destination: '+str(p))
excluded={'node_modules','tools','.runtime','.git','__pycache__','clean','clean-folder','original','stages','bundle'}
files=list((root/'docs').glob('BELLE_RIVE*.md'))
for current,dirs,names in os.walk(app):
    dirs[:]=[d for d in dirs if d not in excluded]
    for name in names:
        p=Path(current)/name
        if p.suffix=='.zip': continue # Already retained separately; avoid recursive duplicate payloads.
        if name.endswith(('-journal','-wal','-shm')): raise RuntimeError('SQLite sidecar needs inspection: '+str(p))
        if name.endswith('.running') and name!='busy.sqlite.running': raise RuntimeError('Unexpected launch marker: '+str(p))
        files.append(p)
findings=[]
def scan(value,path):
    if isinstance(value,dict):
        for key,v in value.items():
            prose_authorization=key.lower()=='authorization' and isinstance(v,str) and v.startswith('User explicitly requested a guided grouped local acceptance session')
            if key.lower() in {'secret','csrf','cookie','set-cookie','authorization','password','token'} and isinstance(v,str) and len(v)>15 and not prose_authorization:
                findings.append(str(path.relative_to(root))+': sensitive key '+key)
            scan(v,path)
    elif isinstance(value,list):
        for v in value: scan(v,path)
for p in files:
    if p.suffix=='.json':
        try: scan(json.loads(p.read_text(encoding='utf-8-sig')),p)
        except json.JSONDecodeError: pass
    if p.suffix=='.html' and re.search(r'name=["\']csrf["\']',p.read_text(encoding='utf-8')): findings.append(str(p.relative_to(root))+': private HTML')
if findings: raise RuntimeError('\n'.join(findings))
entries=[]
for p in sorted(set(files)):
    data=p.read_bytes();entries.append({'path':p.relative_to(root).as_posix(),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
manifest.write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'version':'0.2.1','startupQualifiedVersion':'0.2.0','budgetMs':5000,'scope':'Consolidated local source and fictional-data evidence; not global human acceptance','excludedDuplications':sorted(excluded),'nestedZipPolicy':'Existing ZIPs retained separately, not nested','sensitiveDataScan':'No sensitive JSON values or private CSRF HTML detected by selection scan; not a general security audit','entries':entries},ensure_ascii=False,indent=2),encoding='utf-8')
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for item in entries: z.write(root/item['path'],item['path'])
    z.write(manifest,manifest.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for item in entries: assert hashlib.sha256(z.read(item['path'])).hexdigest()==item['sha256']
digest=hashlib.sha256(archive.read_bytes()).hexdigest()
checksum=archive.with_suffix('.zip.sha256');checksum.write_text(digest+'  '+archive.name+'\n',encoding='ascii')
paths=[e['path'] for e in entries if '/dist/' not in e['path'] and not re.search(r'\.sqlite(?:$|[.\-])',e['path']) and not e['path'].endswith('.pid')]
# Existing ZIPs are separately retained and can be staged with their hashes.
paths.extend(p.relative_to(root).as_posix() for p in app.rglob('*.zip') if not any(part in excluded for part in p.relative_to(app).parts))
paths.extend(p.relative_to(root).as_posix() for p in (archive,manifest,checksum))
staging.write_text('\n'.join(sorted(set(paths)))+'\n',encoding='utf-8')
print(json.dumps({'archive':str(archive),'entries':len(entries),'bytes':archive.stat().st_size,'sha256':digest,'verification':'CRC and every entry SHA-256 checked'},indent=2))
