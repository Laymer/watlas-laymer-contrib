from pathlib import Path
from zipfile import ZipFile

root = Path('dist')
for path in root.rglob('*'):
    if path.is_symlink():
        raise ValueError(f'Unexpected link in release: {path}')

sources = {str(path.relative_to('addon')): path for path in Path('addon/WarriorAtlas').iterdir()}
with ZipFile(root / 'assets/WarriorAtlas.zip') as archive:
    assert sorted(archive.namelist()) == sorted(sources), 'Unexpected addon archive entries'
    for name, path in sources.items():
        assert archive.read(name) == path.read_bytes(), f'Archive differs from {path}'
