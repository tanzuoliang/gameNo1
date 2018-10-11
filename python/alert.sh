

# message = "asfdadadadad"

name=$1
# echo "the ${name} are adad"

osascript<<EOF

tell application "Finder"
	activate
	display Dialog "${name}"
end tell

EOF