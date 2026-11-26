import os
from pathlib import Path
import tempfile
import unittest

from granular import check, git


class Limits(unittest.TestCase):
    def scenario(self, changes):
        with tempfile.TemporaryDirectory() as tmp:
            prior = os.getcwd()
            os.chdir(tmp)
            try:
                git("init", "-q")
                for key, value in [("user.name", "CI"), ("user.email", "ci@example.org")]:
                    git("config", key, value)
                git("commit", "-q", "--allow-empty", "-m", "base")
                base = git("rev-parse", "HEAD").decode().strip()
                for i, count in enumerate(changes):
                    Path(str(i)).write_text("line\n" * count)
                    git("add", str(i))
                    git("commit", "-qm", "feature")
                return check(base, "HEAD")
            finally:
                os.chdir(prior)

    def test_limits(self):
        self.assertTrue(self.scenario([150]))
        self.assertFalse(self.scenario([151]))
        self.assertFalse(self.scenario([150, 150, 101]))


if __name__ == "__main__":
    unittest.main()
