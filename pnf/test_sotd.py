import importlib
import json


def test_legacy_cache_is_migrated_to_date_keyed_entry(tmp_path, monkeypatch):
    data_dir = tmp_path / "data"
    data_dir.mkdir()
    legacy = {
        "name": "Legacy Song",
        "image": "image",
        "altText": "alt",
        "artists": ["Artist"],
        "url": "url",
        "day": 16,
        "month": 5,
        "year": 2026,
    }
    (data_dir / "cache.json").write_text(json.dumps(legacy))
    (data_dir / "tracklist.json").write_text(json.dumps({"new": [], "used": []}))
    monkeypatch.setenv("PNFSOTD_DATA_DIR", str(data_dir))

    import app.sotd as sotd
    importlib.reload(sotd)

    result = sotd.getSongOfTheDay(0)

    assert result["name"] == "Legacy Song"
    migrated = json.loads((data_dir / "cache.json").read_text())
    assert any(entry["name"] == "Legacy Song" for entry in migrated.values())
    assert "day" not in migrated

    monkeypatch.delenv("PNFSOTD_DATA_DIR")
    importlib.reload(sotd)
