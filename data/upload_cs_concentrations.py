import json
import boto3
import csv
from boto3.dynamodb.conditions import Key
import requests
from datetime import datetime
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import uuid


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


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("coms6998-final-cs-concentrations")

for c in CS_CONCENTRATIONS:
  item = {
      "concentration": c
  }
  response = table.put_item(Item=item)


