from flask import Flask, request, jsonify, render_template
import replicate

app = Flask(__name__)

# Token API
api_token = "r8_CRqulJm52htpRV5zIpe4HV6hvyuz6Sm3w6HlG"
client = replicate.Client(api_token=api_token)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')

    try:
        output = client.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            input={"prompt": prompt}
        )
        print("Output dari API:", output)  # Debug print statement
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"image_url": output})



if __name__ == '__main__':
    app.run(debug=True)
