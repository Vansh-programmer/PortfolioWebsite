from django.shortcuts import render
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'main/index.html')

def terminal_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            command = data.get('command', '').strip()
            
            # This is where we will hook up Ollama/AI later!
            # For now, we return a basic API response.
            response_text = f"Django Backend Processed: {command}"
            
            return JsonResponse({'status': 'success', 'output': response_text})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST allowed'}, status=405)
