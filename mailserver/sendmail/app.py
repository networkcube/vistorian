from flask import Flask, request
from werkzeug.utils import secure_filename
import os.path
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['png', 'svg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello():
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data  action="send">
      <p><input type=text name=from>
         <input type=text name=to>
         <input type=text name=note>
         <input type=file name=image>
         <input type=file name=svg>
         <input type=submit value=Upload>
    </form>
    '''

@app.route("/send", methods=['POST'])
def send():
    send_from = request.form['from']
    send_to = request.form['to']
    send_cc = request.form['cc']
    send_note = request.form['note']
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
    s = smtplib.SMTP('localhost')
    s.sendmail(send_from, send_to, msg.as_string())
    s.quit()
    
