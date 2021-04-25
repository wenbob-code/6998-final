import json
import boto3
import csv
import uuid
import random
import names
import geonamescache
import os, sys

'''
    Reference:
    1. https://pypi.org/project/names/
'''

MAJOR = [
    "Computer Science",
    "Computer Engineering",
    "Electrical Engineering"
]

SKILL = [
    "C",
    "C++",
    "Java",
    "Python",
    "Matlab",
    "Ruby",
    "Javascript",
    "machine learning",
    "NLP",
    "CV",
    "security",
    "system",
    "data analysis",
    "database",
    "signal processing",
    "power engineering",
    "electric vehicles",
    "electronics",
    "digital control",
    "computer hardware",
    "microelectronics",
    "control engineering",
    "telecommunications engineering"
]

CS_CONCENTRATIONS = [
    "Theory",
    "Artificial Intelligence",
    "Machine Learning",
    "Vision & Robotics",
    "Networking",
    "Computer Engineering",
    "Software Systems",
    "Computational Biology",
    "Security & Privacy",
    "NLP & Speech"
]

EE_CONCENTRATIONS = [
    "Data-Driven Analysis and Computation",
    "Networking",
    "Wireless and Mobile Communications",
    "Integrated Circuits and Systems",
    "Smart Electric Energy",
    "Systems Biology and Neuroengineering",
    "Lightwave (Photonics) Engineering",
    "Microelectronic Devices",
    "Electrical Engineering"
]

USER_PHOTO_BUCKET = "coms6998-user-photos"
MALE_PHOTO_NUM = 1100
FEMALE_PHOTO_NUM = 1050

s3_client = boto3.client('s3')

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("coms6998-final-students")

gc = geonamescache.GeonamesCache()
countries = gc.get_countries_by_names()
country_num = len(countries)

emails = {"wj2311@columbia.edu": True, "yx2622@columbia.edu": True, "mz2864@columbia.edu": True, "hz2691@columbia.edu": True}

def generate_name(g):
    full_name = names.get_full_name(gender=g)
    return full_name.split(' ', 1)

def generate_id():
    return uuid.uuid4()

def generate_city_country():

    # Country
    country_index = random.randint(0, country_num - 1)
    countries_list = []
    country_code = ""
    for k, v in countries.items():
        countries_list.append([k, v["iso"]])

    country, country_code = countries_list[country_index]

    # City
    cities_list = []
    cities = gc.get_cities()
    for k, v in cities.items():
        if v["countrycode"] == country_code:
            cities_list.append(v["name"])

    city_num = len(cities_list)
    if (city_num == 0):
        city = ""
    else:
        city_index = random.randint(0, city_num - 1)
        city = cities_list[city_index]

    return city, country

def generate_uni_email(first_name, last_name):
    abbr = last_name[0] + first_name[0]
    uni = abbr.lower() + str(random.randint(1500, 2700))
    email = uni + "@columbia.edu"
    if emails.get(email) is None:
        emails[email] = True
        return uni, email
    else:
        return generate_uni_email(last_name, first_name)

def upload_photo(gender, uni, file_name):
    file_name = gender + "_photos/" + file_name
    object_name = uni + ".jpg"
    response = s3_client.upload_file(file_name, USER_PHOTO_BUCKET, object_name)
    return object_name


def build_photo_index(gender):
    index = {}
    path = gender + "_photos"
    dirs = dirs = os.listdir(path)
    i = 0
    for file in dirs:
        index[i] = file
        i += 1
    return index


course_taking_list = []
course_taken_list = []
def parse_course():
    with open('course_taking.json', 'r') as f:
        data = json.load(f)["Items"]
        for d in data:
            course_taking_list.append(d["course_id"]["S"])
            c = d["course_no"]["S"] + " - " + d["course_name"]["S"] + " - " + d["professor"]["S"]
            course_taken_list.append(c)


def course_taking():
    result = []
    while len(result) < 4:
        i = random.randint(0, len(course_taking_list) - 1)
        if not course_taking_list[i] in result:
            result.append(course_taking_list[i])
            i += 1
    return result
    


def course_taken():
    result = []
    course_num = random.randint(4, 8)
    while len(result) < course_num:
        i = random.randint(0, len(course_taken_list) - 1)
        if not course_taken_list[i] in result:
            result.append(course_taken_list[i])
            i += 1
    return result

courses = []
def get_courses():
    with open('course_taking.json', 'r') as f:
        data = json.load(f)["Items"]
    for d in data:
        courses.append(d)

    taking = []
    taking_num = 4
    taken = []
    taken_num = random.randint(4, 8)
    while len(taking) < taking_num:
        temp = random.choice(courses)
        if not temp in taking:
            taking.append(temp)
    while len(taken) <= taken_num:
        temp = random.choice(courses)
        if not temp in taking and not temp in taken:
            taken.append(temp)

    temp = []
    for c in taking:
        temp.append(c["course_id"]["S"])
    taking = temp

    temp = []
    for c in taken:
        temp.append(c["course_no"]["S"] + " - " + c["course_name"]["S"] + " - " + c["professor"]["S"])
    taken = temp
    return taking, taken


def finding_buddy_mate(c_taking):
    find_buddy = {}
    find_mate = {}
    for c in c_taking:
        b = random.choice([True, False])
        find_buddy[c] = b
    for c in c_taking:
        b = random.choice([True, False])
        find_mate[c] = b
    return find_buddy, find_mate


def get_skills():
    num = random.randint(4, 8)
    skills = []
    while len(skills) <= num:
        temp = random.choice(SKILL)
        if not temp in skills:
            skills.append(temp)
    return skills


def get_concentration(major):
    if major == "Computer Science":
        return random.choice(CS_CONCENTRATIONS)
    else:
        return random.choice(EE_CONCENTRATIONS)


if __name__ == "__main__":
    parse_course()

    # build up photo index
    male_photo_dict = build_photo_index("male")
    female_photo_dict = build_photo_index("female")

    # Upload male user
    gender = "male"
    m = 0
    while m < 5:
        first_name, last_name = generate_name(gender)
        city, country = generate_city_country()
        uni, email = generate_uni_email(first_name, last_name)
        s3_key = upload_photo(gender, uni, male_photo_dict[m])
        c_taking, c_taken = get_courses()
        buddy, mate = finding_buddy_mate(c_taking)
        skills = get_skills()
        major = random.choice(MAJOR)
        concentration = get_concentration(major)
        m += 1

        item = {
            "Email": email,
            "CityOrState": city,
            "Country": country,
            "FirstName": first_name,
            "LastName": last_name,
            "S3Key": "https://coms6998-user-photos.s3.amazonaws.com/" + s3_key,
            "CourseTaken": c_taken,
            "CourseTaking": c_taking,
            "FindingBuddy": buddy,
            "FindingMate": mate,
            "Major": major,
            "Skill": skills,
            "Concentration": concentration
        }
        response = table.put_item(Item=item)

    # Upload female user
    gender = "female"
