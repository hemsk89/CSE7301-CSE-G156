import os
import boto3

# ==========================
# 🔹 Amazon Textract Client
# ==========================
textract_client = boto3.client('textract', region_name='us-east-1')

def extract_text_textract(image_path):
    """Extracts text using Amazon Textract."""
    try:
        with open(image_path, 'rb') as image_file:
            response = textract_client.detect_document_text(Document={'Bytes': image_file.read()})
        
        if "Blocks" in response:
            return " ".join([item["Text"] for item in response["Blocks"] if item["BlockType"] == "LINE"])
        else:
            return "No text detected in document."
    except Exception as e:
        return f"Error in Amazon Textract OCR: {str(e)}"
