from app.database import db
from datetime import datetime
#the black listed tokens won't be able to access the protected routes
#to do so add the decorator : @token_in_blocklist_loader
#
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String,nullable=False)
    create_at = db.Column(db.DateTime(),default=datetime.utcnow)
    
    def __repr__(self) -> str:
        return f"<Token{self.jti}>"
    
    def save_Token_to_db(self):
        db.session.add(self)
        db.session.commit()