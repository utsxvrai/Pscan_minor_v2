import requests

def test_api():
    url = "https://minor-production-3269.up.railway.app/health"
    files = {'file': ('1.jpeg', open('1.jpeg', 'rb'), 'image/jpeg')}

    try:
        print(f"Attempting to connect to {url}")
        response = requests.get(url)

        if response.status_code == 200:
            print("Health check successful!")
            print(response.json())

        # Now test the predict endpoint
        predict_url = "https://minor-production-3269.up.railway.app/predict/"
        print(f"Attempting to connect to {predict_url}")
        response = requests.post(predict_url, files=files)

        if response.status_code == 200:
            print("Prediction successful!")
            print(response.json())
        else:
            print(f"Error: Status code {response.status_code}")
            print(response.text)
    except requests.RequestException as e:
        print(f"An error occurred while requesting {url}.")
        print(f"Error details: {str(e)}")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    test_api()