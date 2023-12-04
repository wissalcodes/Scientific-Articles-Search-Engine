from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2,max=20)]) #the Username is going to be used as a label in HTML
    email = StringField('email',validators=[DataRequired(),Email()])
    password = PasswordField('password',validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('confirm password',validators=[DataRequired(), Length(min=6), EqualTo('password')])
    submit = SubmitField('Sign Up')