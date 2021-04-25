import json
import boto3
import csv
from boto3.dynamodb.conditions import Key
import requests
from datetime import datetime
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import uuid


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


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("coms6998-final-ee-concentrations")

for c in EE_CONCENTRATIONS:
  item = {
      "concentration": c
  }
  response = table.put_item(Item=item)


