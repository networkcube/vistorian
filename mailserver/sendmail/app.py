from flask import Flask, request, make_response
from werkzeug.utils import secure_filename

import os.path
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.utils import getaddresses

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['png', 'svg'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.debug = True

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
      <p>From: <input type=text name=from>
         To: <input type=text name=to>
         Subject: <input type=text name=subject>
         Note: <input type=text name=note>
         Copy to Vistorian? <input type=checkbox name=CopyToVistorian value=Yes>
         Image: <input type=file name=image>
         SVG: <input type=file name=svg>
         <input type=submit>
    </form>
    '''

@app.route("/test", methods=['GET', 'POST'])
def test():
    return "test OK"


@app.route("/", methods=['GET', 'POST'])
def send():
    try:
        send_from = request.form['from'].strip()
        send_to = request.form['to'].strip()
        send_cc = request.form['cc'].strip()
        send_subject = request.form['subject'].strip()
        send_note = request.form['note'].strip()
    except Exception:
        return hello()
    if send_to not in valid_dest:
        return "Invalid destination: "+send_to #+" valids:"+",".join(list(valid_dest))
    # if 'CopyToVistorian' in request.form:
    #     send_cc = "vistorian@inria.fr"
    if 'image' in request.files:
        send_image = request.files['image']
        if allowed_file(send_image.filename):
            filename = secure_filename(send_image.filename)
            print('Received the image %s' % filename)
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
            print('Received the svg %s', filename)
            filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            send_svg.save(filename)
            send_svg = filename
        else:
            send_svg = None
    else:
        send_svg = None
    
    msg = MIMEMultipart()
    msg['Subject'] = send_subject
    msg['From'] = send_from
    msg['To'] = send_to
    if send_cc is not None:
        msg['CC'] = send_cc

    msg.preamble = send_note

    note = MIMEText(send_note)
    msg.attach(note)

    # Assume we know that the image files are all in PNG format
    # Open the files in binary mode.  Let the MIMEImage class automatically
    # guess the specific image type.
    if send_image is not None:
        with open(send_image, 'rb') as fp:
            img = MIMEImage(fp.read())
        msg.attach(img)

    if send_svg is not None:
        with open(send_svg, 'rb') as fp:
            img = MIMEImage(fp.read(), _subtype="svg+xml")
        msg.attach(img)

    tos = msg.get_all('to', [])
    ccs = msg.get_all('cc', [])
    resent_tos = msg.get_all('resent-to', [])
    resent_ccs = msg.get_all('resent-cc', [])
    all_recipients = getaddresses(tos + ccs + resent_tos + resent_ccs)
    # Send the email via our own SMTP server.
    s = smtplib.SMTP('smtp.inria.fr')
    s.sendmail(send_from, all_recipients, msg.as_string())
    s.quit()

    response = "Mail sent!"
    response = make_response(response)
    response.headers['Access-Control-Allow-Origin'] = "*"
    return response


