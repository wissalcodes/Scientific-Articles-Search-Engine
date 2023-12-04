from . import bp
from app.forms.registration_form import RegistrationForm



@bp.route("/register", methods=['GET','POST'])
def register():
    return {"eegfsdf" : "fs"}

# Register the blueprint
