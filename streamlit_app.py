import streamlit as st
import torch
import torchvision.transforms as transforms
from skimage.color import rgb2lab, rgb2gray, lab2rgb
from PIL import Image
import numpy as np
import warnings
from model import ColorNet

warnings.filterwarnings("ignore", category=UserWarning, module="skimage.color")

# --- Streamlit Page Configuration ---
st.set_page_config(
    page_title="Automatic Image Colorization",
    page_icon="🎨",
    layout="centered",
)

# --- Custom CSS for Clean White-Themed UI ---
st.markdown("""
    <style>
        body {
            background-color: #f5f7fa;
            color: #222;
            font-family: "Segoe UI", sans-serif;
        }
        .main-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 0.2em;
        }
        .subtitle {
            text-align: center;
            color: #555;
            font-size: 1.1rem;
            margin-bottom: 2em;
        }
        .logo-container {
            display: flex;
            justify-content: center;
            margin-top: 1em;
            margin-bottom: 1em;
        }
        .stButton > button {
            background-color: #2E3B55;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.6em 1.5em;
            font-size: 1.1rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .stButton > button:hover {
            background-color: #4B5C84;
            transform: scale(1.04);
        }
        .stFileUploader {
            text-align: center;
        }
        .image-container {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-top: 30px;
        }
        .image-caption {
            text-align: center;
            font-size: 0.95rem;
            color: #555;
            margin-top: 8px;
        }
        .footer-text {
            text-align: center;
            color: #888;
            font-size: 0.9rem;
            margin-top: 3em;
        }
    </style>
""", unsafe_allow_html=True)

# --- App Header Section ---
st.markdown("<div class='logo-container'><img src='https://cdn-icons-png.flaticon.com/512/1035/1035688.png' width='90'></div>", unsafe_allow_html=True)
st.markdown("<div class='main-title'>Automatic Image Colorization</div>", unsafe_allow_html=True)
st.markdown("<div class='subtitle'>Bring black and white photos to life using deep learning-powered color restoration!</div>", unsafe_allow_html=True)

# --- Load model ---
@st.cache_resource
def load_model():
    model = ColorNet()
    checkpoint = torch.load("pretrained/checkpoint-trained.pth.tar", map_location=torch.device("cpu"))
    model.load_state_dict(checkpoint["state_dict"], strict=False)
    model.eval()
    return model

model = load_model()

# --- File Uploader ---
uploaded_file = st.file_uploader("📤 Upload a grayscale image (JPG/PNG):", type=["jpg", "jpeg", "png"])

# --- If user uploads an image ---
if uploaded_file is not None:
    img = Image.open(uploaded_file).convert("RGB")

    st.image(img, caption="Uploaded Image", width=350)

    # --- Colorize Button ---
    if st.button("✨ Colorize Image"):
        with st.spinner("Colorizing... Please wait..."):
            # Preprocessing (unchanged logic)
            img_resized = transforms.Resize((224, 224))(img)
            img_np = np.asarray(img_resized)
            img_lab = rgb2lab(img_np)
            img_l = rgb2gray(img_np)
            img_l_tensor = torch.from_numpy(img_l).unsqueeze(0).unsqueeze(0).float()

            # Inference
            with torch.no_grad():
                output_ab = model(img_l_tensor)

            output_ab_np = output_ab[0].cpu().numpy().transpose((1, 2, 0))
            lab_output = np.zeros((224, 224, 3))
            lab_output[:, :, 0] = img_l * 100
            lab_output[:, :, 1:] = output_ab_np * 255 - 128
            rgb_result = lab2rgb(lab_output)

        # --- Display Before & After side-by-side ---
        col1, col2 = st.columns(2)
        with col1:
            st.image(img, caption="Grayscale Input", use_container_width=True)
        with col2:
            st.image(rgb_result, caption="Colorized Output", use_container_width=True)

        st.success("✅ Image colorized successfully!")

# --- Footer ---
st.markdown("<div class='footer-text'>Developed using PyTorch & Streamlit</div>", unsafe_allow_html=True)
