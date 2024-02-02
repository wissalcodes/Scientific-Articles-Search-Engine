from datetime import datetime
# Format the date and hour as YYYY-MM-DDTHH:mm:ss
input ="12/4/2031"
parts =input.split("/")
digits = [int(part) for part in parts if part.isdigit()]
end_date = datetime(digits[2], digits[1], digits[0], 23, 59, 59).strftime('%Y-%m-%d %H:%M:%S')

print(end_date)