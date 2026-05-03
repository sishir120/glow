import os
import re

lib_dir = r'c:\Users\sishi\OneDrive\Documents\Antigravity\GlowupHub\glowuphub\mobile\lib'
for root, dirs, files in os.walk(lib_dir):
    for file in files:
        if file.endswith('.dart'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            initial_content = content
            
            # Replace .withValues(alpha: X) with .withOpacity(X)
            content = re.sub(r'\.withValues\(alpha:\s*([0-9.]+)\)', r'.withOpacity(\1)', content)
            
            if content != initial_content:
                print(f'Updating {path}')
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)