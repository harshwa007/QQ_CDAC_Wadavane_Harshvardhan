import cv2
import pytesseract
from docx import Document
image = cv2.imread("File_For_OCR.jpg")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
text = pytesseract.image_to_string(gray_image)
doc = Document()
doc.add_paragraph(text)
doc.save('output.docx')

