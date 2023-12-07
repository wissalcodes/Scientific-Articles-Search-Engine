from app.database import db
from datetime import datetime

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String,nullable=False)
    create_at = db.Column(db.DateTime(),default=datetime.utcnow)
    
    def __repr__(self) -> str:
        return f"<Token{self.jti}>"