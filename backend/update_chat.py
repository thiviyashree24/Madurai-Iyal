
from pathlib import Path
import py_compile

path = Path("backend/app.py")
source = path.read_text(encoding="utf-8")

old_query = '''            SELECT p.place_name, c.category_name, p.description
            FROM places p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.place_id'''

new_query = '''            SELECT
                p.place_name, c.category_name, p.description,
                p.address, p.opening_hours, p.entry_fee,
                p.best_time_to_visit
            FROM places p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.place_id'''

old_context = '''        place_context = "\\n".join(
            f"- {row['place_name']} ({row['category_name'] or 'Other'}): "
            f"{row['description'] or 'No description available'}"
            for row in rows
        )'''

new_context = '''        place_context = "\\n".join(
            f"Place: {row['place_name']}; "
            f"Category: {row['category_name'] or 'Other'}; "
            f"Description: {row['description'] or 'Not available'}; "
            f"Address: {row['address'] or 'Not available'}; "
            f"Opening hours: {row['opening_hours'] or 'Not available'}; "
            f"Entry fee: {row['entry_fee'] if row['entry_fee'] is not None else 'Not available'}; "
            f"Best time to visit: {row['best_time_to_visit'] or 'Not available'}"
            for row in rows
        )'''

if old_query not in source:
    raise SystemExit("STOP: Query not found; app.py unchanged.")
if old_context not in source:
    raise SystemExit("STOP: Context block not found; app.py unchanged.")

source = source.replace(old_query, new_query, 1)
source = source.replace(old_context, new_context, 1)

check = Path("backend/_check_chat.py")
check.write_text(source, encoding="utf-8")
py_compile.compile(str(check), doraise=True)
check.unlink(missing_ok=True)
path.write_text(source, encoding="utf-8")
print("SUCCESS: Chat database fields updated.")
