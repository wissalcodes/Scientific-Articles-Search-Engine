from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

#Members API Route 
@app.route("/members")
def members():
    return{"members": ["Hennane Douaa El Ikhlas","Elabed Amina","Selidja Abderraouf","Messikh Wissal","Boughouas Mohamed"]}

if __name__ == "__main__":
    app.run(debug=True)