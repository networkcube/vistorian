from flask import Flask, request, make_response
from werkzeug.utils import secure_filename
#from werkzeug.debug import DebuggedApplication
import werkzeug.exceptions

import os.path
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['png', 'svg'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.debug = True

#@app.errorhandler(werkzeug.exceptions.BadRequest)
#def handle_bad_request(e):
#    return 'bad request dude!'

#app = DebuggedApplication(app, evalex=True)

valid_dest = set()

with open('valid_emails.txt', 'r') as f:
    for valid in f:
        valid_dest.add(valid.rstrip('\n'))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def hello():
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form enctype=multipart/form-data method=post>
      <p><input type=text name=from>
         <input type=text name=to>
         <input type=text name=note>
         <input type=checkbox name=CopyToVistorian value=Yes>
         <input type=file name=image>
         <input type=file name=svg>
         <input type=submit>
    </form>
    '''

@app.route("/test", methods=['GET', 'POST'])
def test():
    return "test OK"


@app.route("/", methods=['GET', 'POST'])
def send():
    #print('app.send()')
    try:
        send_from = request.form['from'].strip()
    except Exception:
        return hello()
    send_to = request.form['to'].strip()
    if send_to not in valid_dest:
        return "Invalid destination: "+send_to #+" valids:"+",".join(list(valid_dest))
    #send_cc = request.form['cc']
    send_note = request.form['note'].strip()
    if 'image' in request.files:
        send_image = request.files['image']
        if allowed_file(send_image.filename):
            filename = secure_filename(send_image.filename)
            filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            send_image.save(filename)
            send_image = filename
        else:
            send_image = None
    else:
        send_image = None
    if 'svg' in request.files:
        send_svg = request.files['svg']
        if allowed_file(send_svg.filename):
            filename = secure_filename(send_svg.filename)
            filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            send_svg.save(filename)
            send_svg = filename
        else:
            send_svg = None
    else:
        send_svg = None
    
    msg = MIMEMultipart()
    msg['Subject'] = 'Vistorian screenshot'
    # me == the sender's email address
    # family = the list of all recipients' email addresses
    msg['From'] = send_from
    msg['To'] = send_to
    msg.preamble = send_note

    note = MIMEText(send_note)
    msg.attach(note)

    # Assume we know that the image files are all in PNG format
    # Open the files in binary mode.  Let the MIMEImage class automatically
    # guess the specific image type.
    if send_image is not None:
        fp = open(send_image, 'rb')
        img = MIMEImage(fp.read())
        fp.close()
        msg.attach(img)

    if send_svg is not None:
        fp = open(send_image, 'rb')
        img = MIMEImage(fp.read(), _subtype="svg+xml")
        fp.close()
        msg.attach(img)

    # Send the email via our own SMTP server.
    s = smtplib.SMTP('smtp.inria.fr')
    s.sendmail(send_from, send_to, msg.as_string())
    s.quit()

    response = "Mail sent!"
    response = make_response(response)
    response.headers['Access-Control-Allow-Origin'] = "*"
    return response


