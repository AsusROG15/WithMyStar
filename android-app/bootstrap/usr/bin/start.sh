#!/data/data/com.termux/files/usr/bin/bash
count_file="$PREFIX/var/lib/withmystar/blessings.count"
if [ -f "$count_file" ]; then
  count=$(cat "$count_file")
  count=$((count + 1))
  echo "$count" > "$count_file"
else
  mkdir -p "$(dirname "$count_file")"
  echo 1 > "$count_file"
  count=1
fi
echo "🌟 Welcome to WithMyStar Shell [Blessing #$count]"
