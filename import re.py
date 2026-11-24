import re

def validate_email(email):
    pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if re.match(pattern, email):
        return True
    return False


# Test it
email = input("godswillobedeke@gmail.com: ")

if validate_email(email):
    print("✅ Valid email format")
else:
    print("❌ Invalid email format")