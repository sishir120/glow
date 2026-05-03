import os
import re

lib_dir = r'c:\Users\sishi\OneDrive\Documents\python\glowuphub\mobile\lib'
for root, dirs, files in os.walk(lib_dir):
    for file in files:
        if file.endswith('.dart'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            initial_content = content
            
            # 1. Normalize import casing and quotes
            content = re.sub(r"import\s+['\"]package:flutter_lucide/flutter_[lL]ucide\.dart['\"]\s*;?", 
                             "import 'package:flutter_lucide/flutter_lucide.dart';", content)
            
            # 2. Add missing import if Lucide is used
            if 'Lucide.' in content and 'package:flutter_lucide/flutter_lucide.dart' not in content:
                content = "import 'package:flutter_lucide/flutter_lucide.dart';\n" + content
            
            # 3. Standardize class name
            content = content.replace('LucideIcons.', 'Lucide.')
            
            # 4. Remove duplicate imports while preserving order
            lines = content.split('\n')
            new_lines = []
            seen_imports = set()
            for line in lines:
                if line.strip().startswith('import '):
                    normalized = line.strip()
                    if normalized not in seen_imports:
                        new_lines.append(line)
                        seen_imports.add(normalized)
                else:
                    new_lines.append(line)
            content = '\n'.join(new_lines)
            
            if content != initial_content:
                print(f'Updating {path}')
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
