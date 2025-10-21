#!/usr/bin/env python3
"""
Generate ECOSYSTEM.md - Claude Code Ecosystem Reference

Fetches GitHub repository metadata and generates comprehensive ecosystem documentation.
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional
import urllib.request
import urllib.error

class EcosystemGenerator:
    def __init__(self):
        self.script_dir = Path(__file__).parent
        self.root_dir = self.script_dir.parent
        self.docs_dir = self.root_dir / "docs"
        self.repos_file = self.script_dir / "ecosystem_repos.json"
        self.output_file = self.docs_dir / "ECOSYSTEM.md"
        self.repos_data = []

    def load_repos(self):
        """Load repository list from JSON file"""
        print(f" Loading repository list from {self.repos_file}...")
        with open(self.repos_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            self.repos_data = data['repositories']
            print(f"DONE: Loaded {len(self.repos_data)} repositories")

    def fetch_github_metadata(self, repo: str) -> Optional[Dict]:
        """Fetch repository metadata from GitHub API"""
        api_url = f"https://api.github.com/repos/{repo}"

        try:
            req = urllib.request.Request(api_url)
            req.add_header('Accept', 'application/vnd.github.v3+json')
            req.add_header('User-Agent', 'Generic-Claude-Code-Framework-Ecosystem-Generator')

            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                return {
                    'name': data['name'],
                    'full_name': data['full_name'],
                    'description': data.get('description', 'No description available'),
                    'stars': data['stargazers_count'],
                    'forks': data['forks_count'],
                    'updated_at': data['updated_at'],
                    'html_url': data['html_url'],
                    'topics': data.get('topics', []),
                    'language': data.get('language', 'Unknown'),
                    'license': data.get('license', {}).get('spdx_id', 'Unknown')
                }
        except urllib.error.URLError as e:
            print(f"  WARNING: Failed to fetch {repo}: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"  WARNING: Failed to parse response for {repo}: {e}")
            return None
        except Exception as e:
            print(f"  WARNING: Unexpected error fetching {repo}: {e}")
            return None

    def format_date(self, iso_date: str) -> str:
        """Format ISO date to human-readable format"""
        try:
            dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
            return dt.strftime('%Y-%m-%d')
        except:
            return iso_date

    def generate_markdown(self) -> str:
        """Generate the ECOSYSTEM.md markdown content"""
        print("\n Generating ecosystem documentation...")

        # Fetch metadata for all repositories
        enriched_repos = []
        for repo_info in self.repos_data:
            print(f"  Fetching: {repo_info['repo']}...")
            metadata = self.fetch_github_metadata(repo_info['repo'])

            if metadata:
                enriched_repos.append({
                    **repo_info,
                    **metadata
                })
            else:
                # Use basic info if API fetch fails
                enriched_repos.append({
                    **repo_info,
                    'full_name': repo_info['repo'],
                    'description': repo_info.get('notes', 'Repository information unavailable'),
                    'stars': 0,
                    'html_url': f"https://github.com/{repo_info['repo']}",
                    'updated_at': 'Unknown',
                    'language': 'Unknown'
                })

        # Sort alphabetically by repository name
        enriched_repos.sort(key=lambda x: x['full_name'].lower())

        # Calculate statistics
        total_repos = len(enriched_repos)
        total_stars = sum(r.get('stars', 0) for r in enriched_repos)

        # Group by category for tag cloud
        category_count = {}
        for repo in enriched_repos:
            for cat in repo.get('category', []):
                category_count[cat] = category_count.get(cat, 0) + 1

        # Start building markdown
        content = f"""# Claude Code Ecosystem Reference

> Comprehensive directory of Claude Code repositories, tools, and resources

**Last Updated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Total Repositories**: {total_repos}
**Total Stars**: ⭐ {total_stars:,}

---

## 📊 Quick Stats

| Category | Repositories |
|----------|--------------|
"""

        for cat, count in sorted(category_count.items()):
            content += f"| {cat.title()} | {count} |\n"

        content += """
---

## 🏷️ Filter by Tags

Quick navigation to repositories by category:

"""

        # Create tag links
        unique_categories = sorted(set(cat for repo in enriched_repos for cat in repo.get('category', [])))
        for cat in unique_categories:
            matching_count = sum(1 for r in enriched_repos if cat in r.get('category', []))
            content += f"- **{cat.title()}** ({matching_count}): "
            matching_repos = [r for r in enriched_repos if cat in r.get('category', [])]
            content += ", ".join([f"[{r['full_name'].split('/')[1]}](#{r['full_name'].replace('/', '')})" for r in matching_repos[:5]])
            if len(matching_repos) > 5:
                content += ", ..."
            content += "\n"

        content += """
---

## 📚 All Repositories (Alphabetical)

"""

        # Generate repository entries
        for repo in enriched_repos:
            repo_name = repo['full_name']
            repo_short = repo_name.split('/')[1]
            anchor = repo_name.replace('/', '')

            content += f"""
### <a id="{anchor}"></a>[{repo_name}]({repo['html_url']})

{repo.get('description', 'No description available')}

**Details:**
- ⭐ **Stars**: {repo.get('stars', 0):,}
- 📅 **Last Update**: {self.format_date(repo.get('updated_at', 'Unknown'))}
- 💻 **Language**: {repo.get('language', 'Unknown')}
- 🏷️ **Tags**: {', '.join([f'`{cat}`' for cat in repo.get('category', [])])}
- 📝 **Note**: {repo.get('notes', 'Community contribution')}

"""

            # Add installation/usage hint for certain repos
            if 'anthropics/skills' in repo_name:
                content += """**Installation:**
```bash
/plugin marketplace add anthropics/skills
/plugin install <skill-name>
```

"""
            elif 'obra/superpowers' in repo_name:
                content += """**Installation:**
```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

"""
            elif repo.get('priority') == 'essential' and 'marketplace' not in repo.get('category', []):
                content += f"""**Quick Start:**
```bash
# Clone the repository
git clone {repo['html_url']}.git

# Explore the skills/agents
cd {repo_short}
```

"""

        content += """
---

## 🤝 Contributing

Know of a great Claude Code repository that should be listed here?

1. Fork this repository
2. Add the repository to `scripts/ecosystem_repos.json`
3. Run `npm run docs:ecosystem` to regenerate this file
4. Submit a pull request

**Inclusion Criteria:**
- Official Anthropic repositories
- High-quality community awesome lists
- Production-ready agent/skill collections
- Notable tools and frameworks
- Active maintenance (updated within 6 months)

---

## 📖 Related Documentation

- [Agent Catalog](AGENT_CATALOG.md) - Browse our 13 production-ready agents
- [Skill Catalog](SKILL_CATALOG.md) - Explore available skills
- [Quick Start Guide](QUICKSTART.md) - Get started with this framework

---

**Generated by**: [Generic Claude Code Framework](https://github.com/Interstellar-code/claud-skills)
**Ecosystem Generator**: `scripts/generate_ecosystem.py`
"""

        return content

    def save_markdown(self, content: str):
        """Save the generated markdown to file"""
        print(f"\n Saving to {self.output_file}...")
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        self.output_file.write_text(content, encoding='utf-8')
        print(f"DONE: Generated {self.output_file}")

    def run(self):
        """Main execution flow"""
        print("\n" + "=" * 60)
        print("Claude Code Ecosystem Reference Generator")
        print("=" * 60 + "\n")

        self.load_repos()
        content = self.generate_markdown()
        self.save_markdown(content)

        print("\n" + "=" * 60)
        print("DONE: Ecosystem reference generation complete!")
        print("=" * 60 + "\n")

        print(f" Output: {self.output_file}")
        print(f" Total repositories: {len(self.repos_data)}")

if __name__ == "__main__":
    generator = EcosystemGenerator()
    generator.run()
