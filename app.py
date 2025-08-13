from flask import Flask, render_template, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

# API Key for OpenWeatherMap
API_KEY = '43ad00e0cde9cb8af83b90f932926850'
CITY = 'kampala'  # Change to your desired city

@app.route('/')
def index():
    # Serve the main HTML page
    return render_template('index.html')



@app.route('/get_weather')
def get_weather():
    # Fetch weather data from OpenWeatherMap
    url = f'http://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    
    # Print the raw response from the API to the console
    print("Weather API Response:", response.text)  # Add this line to print the raw response

    # Attempt to parse the response as JSON
    try:
        data = response.json()
        
        # Check if the response contains the expected data
        if response.status_code == 200 and 'main' in data and 'weather' in data:
            # Extract necessary weather details
            temp = data['main']['temp']
            description = data['weather'][0]['description']
            
            weather_info = {
                'temperature': temp,
                'description': description
            }
            
            # Return weather info as JSON
            return jsonify(weather_info)
        else:
            # Handle potential errors from API response
            print("Error: Invalid data received from OpenWeatherMap.")
            return jsonify({'error': 'Could not fetch weather data.'}), 500
    except Exception as e:
        print(f"Error parsing the weather API response: {e}")
        return jsonify({'error': 'Failed to parse weather data.'}), 500




@app.route('/get_time')
def get_time():
    # Fetch the current time
    current_time = datetime.now().strftime('%H:%M:%S')
    return jsonify({'current_time': current_time})

if __name__ == '__main__':
    app.run(debug=True)
