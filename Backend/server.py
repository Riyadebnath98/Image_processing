# server.py
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
import numpy as np
from PIL import Image
import io
from skimage.color import rgb2gray, lab2rgb
from model import ColorNet
from db import init_db
from auth import auth_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth_bp)
init_db()  # Create DB if not exists

# Load model once
model = ColorNet()
checkpoint = torch.load("pretrained/checkpoint-trained.pth.tar", map_location="cpu")
model.load_state_dict(checkpoint["state_dict"], strict=False)
model.eval()

@app.route("/colorize", methods=["POST"])
def colorize_image():
    file = request.files["image"]
    image = Image.open(file.stream).convert("RGB")
    image = image.resize((224, 224))
    img_np = np.asarray(image)

    L = rgb2gray(img_np)
    L_tensor = torch.from_numpy(L).unsqueeze(0).unsqueeze(0).float()

    with torch.no_grad():
        output_ab = model(L_tensor)

    output_ab = output_ab.squeeze(0).cpu().numpy().transpose((1, 2, 0))
    lab_output = np.zeros((224, 224, 3))
    lab_output[:, :, 0] = L * 100
    lab_output[:, :, 1:] = output_ab * 255 - 128
    rgb_result = (lab2rgb(lab_output) * 255).astype(np.uint8)

    result_image = Image.fromarray(rgb_result)
    img_bytes = io.BytesIO()
    result_image.save(img_bytes, format="PNG")
    img_bytes.seek(0)

    return send_file(img_bytes, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
