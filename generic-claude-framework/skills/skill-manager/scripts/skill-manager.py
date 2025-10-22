#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skill Manager - Native skill management for Claude Code
Handles skill discovery, enabling/disabling, and configuration management
"""

import os
import sys
import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Any
import argparse

# Fix Windows console encoding for emojis
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')


class SkillManager:
    def __init__(self, project_root: Optional[str] = None):
        """Initialize SkillManager with project root directory"""
        if project_root:
            self.project_root = Path(project_root)
        else:
            # Auto-detect project root (where .claude directory exists)
            current = Path.cwd()
            while current != current.parent:
                if (current / '.claude').exists():
                    self.project_root = current
                    break
                current = current.parent
            else:
                self.project_root = Path.cwd()

        self.skills_dir = self.project_root / '.claude' / 'skills'
        self.settings_file = self.project_root / '.claude' / 'settings.local.json'

    def discover_skills(self) -> List[Dict[str, Any]]:
        """Discover all skills in .claude/skills/ directory"""
        skills = []

        if not self.skills_dir.exists():
            return skills

        # Scan all subdirectories in .claude/skills/
        for skill_dir in self.skills_dir.iterdir():
            if not skill_dir.is_dir():
                continue

            skill_md = skill_dir / 'skill.md'
            if not skill_md.exists():
                continue

            # Parse skill metadata
            metadata = self._parse_skill_metadata(skill_md)
            metadata['skill_name'] = skill_dir.name
            metadata['skill_path'] = str(skill_dir)

            # Check enabled status
            metadata['enabled'] = self._check_skill_enabled(skill_dir.name)
            metadata['permissions'] = self._get_skill_permissions(skill_dir.name)

            skills.append(metadata)

        return skills

    def _parse_skill_metadata(self, skill_md_path: Path) -> Dict[str, Any]:
        """Parse YAML frontmatter from skill.md file"""
        metadata = {
            'name': '',
            'description': '',
            'version': '',
            'author': '',
            'tags': [],
            'auto_activate': False
        }

        try:
            with open(skill_md_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract YAML frontmatter (between --- markers)
            frontmatter_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL | re.MULTILINE)
            if not frontmatter_match:
                return metadata

            frontmatter = frontmatter_match.group(1)

            # Parse YAML fields (simple parser, no external deps)
            for line in frontmatter.split('\n'):
                line = line.strip()
                if ':' not in line:
                    continue

                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()

                if key == 'name':
                    metadata['name'] = value
                elif key == 'description':
                    metadata['description'] = value
                elif key == 'version':
                    metadata['version'] = value
                elif key == 'author':
                    metadata['author'] = value
                elif key == 'auto-activate':
                    metadata['auto_activate'] = value.lower() in ('true', 'yes')
                elif key == 'tags':
                    # Parse tags array [tag1, tag2, tag3]
                    tags_match = re.findall(r'\[(.*?)\]', value)
                    if tags_match:
                        tags_str = tags_match[0]
                        metadata['tags'] = [t.strip() for t in tags_str.split(',')]

        except Exception as e:
            print(f"Error parsing {skill_md_path}: {e}", file=sys.stderr)

        return metadata

    def _check_skill_enabled(self, skill_name: str) -> bool:
        """Check if skill is enabled in settings.local.json"""
        settings = self._load_settings()
        if not settings:
            return False

        allow_list = settings.get('permissions', {}).get('allow', [])
        skill_permission = f"Skill({skill_name})"

        return skill_permission in allow_list

    def _get_skill_permissions(self, skill_name: str) -> List[str]:
        """Get all permissions related to a skill"""
        settings = self._load_settings()
        if not settings:
            return []

        allow_list = settings.get('permissions', {}).get('allow', [])

        # Find all permissions mentioning the skill name
        skill_perms = []
        for perm in allow_list:
            if skill_name in perm.lower():
                skill_perms.append(perm)

        return skill_perms

    def _load_settings(self) -> Optional[Dict]:
        """Load settings.local.json"""
        if not self.settings_file.exists():
            return None

        try:
            with open(self.settings_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading settings: {e}", file=sys.stderr)
            return None

    def _save_settings(self, settings: Dict) -> bool:
        """Save settings.local.json"""
        try:
            with open(self.settings_file, 'w', encoding='utf-8') as f:
                json.dump(settings, f, indent=2)
            return True
        except Exception as e:
            print(f"Error saving settings: {e}", file=sys.stderr)
            return False

    def enable_skill(self, skill_name: str) -> bool:
        """Enable a skill by adding to permissions.allow"""
        settings = self._load_settings()
        if not settings:
            settings = {'permissions': {'allow': [], 'deny': [], 'ask': []}}

        allow_list = settings.get('permissions', {}).get('allow', [])
        skill_permission = f"Skill({skill_name})"

        if skill_permission in allow_list:
            print(f"Skill '{skill_name}' is already enabled")
            return False

        allow_list.append(skill_permission)
        settings['permissions']['allow'] = allow_list

        if self._save_settings(settings):
            print(f"✅ Enabled: {skill_name}")
            return True
        return False

    def disable_skill(self, skill_name: str) -> bool:
        """Disable a skill by removing from permissions.allow"""
        settings = self._load_settings()
        if not settings:
            print(f"No settings file found")
            return False

        allow_list = settings.get('permissions', {}).get('allow', [])
        skill_permission = f"Skill({skill_name})"

        if skill_permission not in allow_list:
            print(f"Skill '{skill_name}' is not enabled")
            return False

        # Remove skill permission and related permissions
        updated_allow = []
        removed_perms = []

        for perm in allow_list:
            if skill_name in perm.lower():
                removed_perms.append(perm)
            else:
                updated_allow.append(perm)

        settings['permissions']['allow'] = updated_allow

        if self._save_settings(settings):
            print(f"⬜ Disabled: {skill_name}")
            if removed_perms:
                print(f"Removed permissions:")
                for perm in removed_perms:
                    print(f"  - {perm}")
            return True
        return False

    def list_skills(self, filter_type: str = 'all') -> None:
        """List skills with optional filtering"""
        skills = self.discover_skills()

        if not skills:
            print("No skills found in .claude/skills/")
            return

        # Filter skills
        if filter_type == 'enabled':
            skills = [s for s in skills if s['enabled']]
        elif filter_type == 'disabled':
            skills = [s for s in skills if not s['enabled']]

        # Sort by name
        skills.sort(key=lambda s: s['skill_name'])

        # Display
        print(f"\n📋 Skills ({len(skills)} total)\n")

        for skill in skills:
            status = "✅" if skill['enabled'] else "⬜"
            name = skill['name'] or skill['skill_name']
            version = skill['version'] or 'unknown'
            description = skill['description'] or 'No description'
            perm_count = len(skill['permissions'])

            print(f"{status} {skill['skill_name']} (v{version})")
            print(f"   {description}")
            print(f"   Permissions: {perm_count} configured")
            print()

    def show_skill_details(self, skill_name: str) -> None:
        """Show detailed information about a specific skill"""
        skills = self.discover_skills()
        skill = next((s for s in skills if s['skill_name'] == skill_name), None)

        if not skill:
            print(f"❌ Skill '{skill_name}' not found")
            return

        status = "✅ Enabled" if skill['enabled'] else "⬜ Not Enabled"

        print(f"\n📊 Skill Details: {skill_name}")
        print("=" * 60)
        print(f"\nBasic Info:")
        print(f"  Name: {skill['name'] or skill_name}")
        print(f"  Version: {skill['version'] or 'unknown'}")
        print(f"  Description: {skill['description'] or 'No description'}")
        print(f"  Author: {skill['author'] or 'Unknown'}")

        print(f"\nStatus:")
        print(f"  {status}")
        print(f"  Auto-activate: {'Yes' if skill['auto_activate'] else 'No'}")

        if skill['permissions']:
            print(f"\nPermissions ({len(skill['permissions'])}):")
            for perm in skill['permissions']:
                print(f"  ✅ {perm}")
        else:
            print(f"\nPermissions: None configured")

        if skill['tags']:
            print(f"\nTags:")
            print(f"  {', '.join(skill['tags'])}")

        print()

    def export_config(self) -> None:
        """Export current skill configuration as JSON"""
        skills = self.discover_skills()

        config = {
            'version': '1.0.0',
            'project_root': str(self.project_root),
            'skills': {}
        }

        for skill in skills:
            config['skills'][skill['skill_name']] = {
                'enabled': skill['enabled'],
                'version': skill['version'],
                'permissions': skill['permissions']
            }

        print(json.dumps(config, indent=2))

    def output_json(self) -> None:
        """Output skill discovery results as JSON (for Claude to parse)"""
        skills = self.discover_skills()
        print(json.dumps(skills, indent=2))

    # ============================================
    # ENHANCED FEATURES - Comprehensive Management
    # ============================================

    def toggle_auto_activate(self, skill_name: str, enable: bool) -> bool:
        """Toggle auto-activate setting for a skill"""
        skill_dir = self.skills_dir / skill_name
        skill_md = skill_dir / 'skill.md'

        if not skill_md.exists():
            print(f"❌ Skill '{skill_name}' not found")
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()

            # Update auto-activate in frontmatter
            new_value = 'true' if enable else 'false'
            updated = re.sub(
                r'(auto-activate|auto_activate):\s*(true|false)',
                f'auto-activate: {new_value}',
                content
            )

            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)

            status = "enabled" if enable else "disabled"
            print(f"✅ Auto-activate {status} for {skill_name}")
            return True

        except Exception as e:
            print(f"❌ Error updating auto-activate: {e}", file=sys.stderr)
            return False

    def add_permission(self, skill_name: str, permission: str) -> bool:
        """Add a specific permission for a skill"""
        settings = self._load_settings()
        if not settings:
            settings = {'permissions': {'allow': [], 'deny': [], 'ask': []}}

        allow_list = settings.get('permissions', {}).get('allow', [])

        if permission in allow_list:
            print(f"Permission '{permission}' already exists")
            return False

        allow_list.append(permission)
        settings['permissions']['allow'] = allow_list

        if self._save_settings(settings):
            print(f"✅ Added permission: {permission}")
            return True
        return False

    def remove_permission(self, skill_name: str, permission: str) -> bool:
        """Remove a specific permission for a skill"""
        settings = self._load_settings()
        if not settings:
            print(f"No settings file found")
            return False

        allow_list = settings.get('permissions', {}).get('allow', [])

        if permission not in allow_list:
            print(f"Permission '{permission}' not found")
            return False

        allow_list.remove(permission)
        settings['permissions']['allow'] = allow_list

        if self._save_settings(settings):
            print(f"✅ Removed permission: {permission}")
            return True
        return False

    def list_permissions(self, skill_name: str) -> None:
        """List all permissions for a specific skill"""
        permissions = self._get_skill_permissions(skill_name)

        if not permissions:
            print(f"No permissions configured for '{skill_name}'")
            return

        print(f"\n🔐 Permissions for {skill_name}:\n")
        for i, perm in enumerate(permissions, 1):
            print(f"  {i}. {perm}")
        print()

    def add_tag(self, skill_name: str, tag: str) -> bool:
        """Add a tag to a skill"""
        skill_dir = self.skills_dir / skill_name
        skill_md = skill_dir / 'skill.md'

        if not skill_md.exists():
            print(f"❌ Skill '{skill_name}' not found")
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find tags line and add new tag
            def add_tag_to_line(match):
                tags_content = match.group(1).strip()
                if tags_content.endswith(']'):
                    # Remove closing bracket, add tag, add bracket
                    tags_content = tags_content[:-1].strip()
                    if tags_content:
                        return f'tags: [{tags_content}, {tag}]'
                    else:
                        return f'tags: [{tag}]'
                return match.group(0)

            updated = re.sub(r'tags:\s*\[(.*?)\]', add_tag_to_line, content)

            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)

            print(f"✅ Added tag '{tag}' to {skill_name}")
            return True

        except Exception as e:
            print(f"❌ Error adding tag: {e}", file=sys.stderr)
            return False

    def remove_tag(self, skill_name: str, tag: str) -> bool:
        """Remove a tag from a skill"""
        skill_dir = self.skills_dir / skill_name
        skill_md = skill_dir / 'skill.md'

        if not skill_md.exists():
            print(f"❌ Skill '{skill_name}' not found")
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()

            # Remove tag from tags array
            def remove_tag_from_line(match):
                tags_content = match.group(1)
                tags_list = [t.strip() for t in tags_content.split(',')]
                tags_list = [t for t in tags_list if t != tag]
                return f'tags: [{", ".join(tags_list)}]'

            updated = re.sub(r'tags:\s*\[(.*?)\]', remove_tag_from_line, content)

            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)

            print(f"✅ Removed tag '{tag}' from {skill_name}")
            return True

        except Exception as e:
            print(f"❌ Error removing tag: {e}", file=sys.stderr)
            return False

    def set_priority(self, skill_name: str, priority: int) -> bool:
        """Set execution priority for a skill (1-10, higher = more important)"""
        skill_dir = self.skills_dir / skill_name
        skill_md = skill_dir / 'skill.md'

        if not skill_md.exists():
            print(f"❌ Skill '{skill_name}' not found")
            return False

        if not 1 <= priority <= 10:
            print(f"❌ Priority must be between 1 and 10")
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if priority field exists
            if 'priority:' in content:
                # Update existing priority
                updated = re.sub(r'priority:\s*\d+', f'priority: {priority}', content)
            else:
                # Add priority field after tags
                updated = re.sub(
                    r'(tags:.*?\])\n',
                    f'\\1\npriority: {priority}\n',
                    content
                )

            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)

            print(f"✅ Set priority {priority} for {skill_name}")
            return True

        except Exception as e:
            print(f"❌ Error setting priority: {e}", file=sys.stderr)
            return False

    def configure_skill(self, skill_name: str, key: str, value: str) -> bool:
        """Set a configuration parameter for a skill"""
        skill_dir = self.skills_dir / skill_name
        skill_md = skill_dir / 'skill.md'

        if not skill_md.exists():
            print(f"❌ Skill '{skill_name}' not found")
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if config section exists
            if '## Configuration' not in content:
                # Add configuration section
                content += f"\n\n## Configuration\n\n{key}: {value}\n"
            else:
                # Update or add config parameter
                if f'{key}:' in content:
                    content = re.sub(
                        f'{key}:.*',
                        f'{key}: {value}',
                        content
                    )
                else:
                    content = content.replace(
                        '## Configuration',
                        f'## Configuration\n\n{key}: {value}'
                    )

            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Set {key}={value} for {skill_name}")
            return True

        except Exception as e:
            print(f"❌ Error configuring skill: {e}", file=sys.stderr)
            return False

    def show_advanced_config(self, skill_name: str) -> None:
        """Show advanced configuration options for a skill"""
        skills = self.discover_skills()
        skill = next((s for s in skills if s['skill_name'] == skill_name), None)

        if not skill:
            print(f"❌ Skill '{skill_name}' not found")
            return

        print(f"\n⚙️  Advanced Configuration: {skill_name}")
        print("=" * 60)
        print(f"\n📋 Current Settings:")
        print(f"  Auto-activate: {'Yes' if skill['auto_activate'] else 'No'}")
        print(f"  Tags: {', '.join(skill['tags']) if skill['tags'] else 'None'}")
        print(f"  Enabled: {'Yes' if skill['enabled'] else 'No'}")
        print(f"  Permissions: {len(skill['permissions'])} configured")

        print(f"\n🔧 Available Operations:")
        print(f"  1. Toggle auto-activate")
        print(f"  2. Add/remove tags")
        print(f"  3. Set priority (1-10)")
        print(f"  4. Manage permissions")
        print(f"  5. Configure parameters")
        print()


def main():
    parser = argparse.ArgumentParser(description='Skill Manager - Comprehensive skill management for Claude Code')
    parser.add_argument('action',
                       choices=['discover', 'list', 'enable', 'disable', 'status', 'export', 'json',
                               'auto-activate', 'add-permission', 'remove-permission', 'list-permissions',
                               'add-tag', 'remove-tag', 'set-priority', 'configure', 'advanced'],
                       help='Action to perform')
    parser.add_argument('skill_name', nargs='?', help='Skill name')
    parser.add_argument('value', nargs='?', help='Value for the action (permission, tag, priority, config key)')
    parser.add_argument('value2', nargs='?', help='Second value (for configure: config value)')
    parser.add_argument('--filter', choices=['all', 'enabled', 'disabled'], default='all',
                       help='Filter skills by status (for list command)')
    parser.add_argument('--on', action='store_true', help='Enable flag (for auto-activate)')
    parser.add_argument('--off', action='store_true', help='Disable flag (for auto-activate)')
    parser.add_argument('--project-root', help='Project root directory')

    args = parser.parse_args()

    manager = SkillManager(project_root=args.project_root)

    # Original actions
    if args.action == 'discover':
        manager.list_skills()
    elif args.action == 'list':
        manager.list_skills(filter_type=args.filter)
    elif args.action == 'enable':
        if not args.skill_name:
            print("❌ Error: skill_name required for enable action")
            sys.exit(1)
        manager.enable_skill(args.skill_name)
    elif args.action == 'disable':
        if not args.skill_name:
            print("❌ Error: skill_name required for disable action")
            sys.exit(1)
        manager.disable_skill(args.skill_name)
    elif args.action == 'status':
        if not args.skill_name:
            print("❌ Error: skill_name required for status action")
            sys.exit(1)
        manager.show_skill_details(args.skill_name)
    elif args.action == 'export':
        manager.export_config()
    elif args.action == 'json':
        manager.output_json()

    # New enhanced actions
    elif args.action == 'auto-activate':
        if not args.skill_name:
            print("❌ Error: skill_name required")
            sys.exit(1)
        if args.on:
            manager.toggle_auto_activate(args.skill_name, True)
        elif args.off:
            manager.toggle_auto_activate(args.skill_name, False)
        else:
            print("❌ Error: Use --on or --off flag")
            sys.exit(1)

    elif args.action == 'add-permission':
        if not args.skill_name or not args.value:
            print("❌ Error: skill_name and permission required")
            sys.exit(1)
        manager.add_permission(args.skill_name, args.value)

    elif args.action == 'remove-permission':
        if not args.skill_name or not args.value:
            print("❌ Error: skill_name and permission required")
            sys.exit(1)
        manager.remove_permission(args.skill_name, args.value)

    elif args.action == 'list-permissions':
        if not args.skill_name:
            print("❌ Error: skill_name required")
            sys.exit(1)
        manager.list_permissions(args.skill_name)

    elif args.action == 'add-tag':
        if not args.skill_name or not args.value:
            print("❌ Error: skill_name and tag required")
            sys.exit(1)
        manager.add_tag(args.skill_name, args.value)

    elif args.action == 'remove-tag':
        if not args.skill_name or not args.value:
            print("❌ Error: skill_name and tag required")
            sys.exit(1)
        manager.remove_tag(args.skill_name, args.value)

    elif args.action == 'set-priority':
        if not args.skill_name or not args.value:
            print("❌ Error: skill_name and priority (1-10) required")
            sys.exit(1)
        try:
            priority = int(args.value)
            manager.set_priority(args.skill_name, priority)
        except ValueError:
            print("❌ Error: Priority must be a number between 1 and 10")
            sys.exit(1)

    elif args.action == 'configure':
        if not args.skill_name or not args.value or not args.value2:
            print("❌ Error: skill_name, config_key, and config_value required")
            print("Usage: skill-manager.py configure <skill_name> <key> <value>")
            sys.exit(1)
        manager.configure_skill(args.skill_name, args.value, args.value2)

    elif args.action == 'advanced':
        if not args.skill_name:
            print("❌ Error: skill_name required")
            sys.exit(1)
        manager.show_advanced_config(args.skill_name)


if __name__ == '__main__':
    main()
